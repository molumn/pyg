import fs from 'fs'
import path from 'path'

import { CharacterContent, CharacterKey, CharacterKeyType, CharacterProfileContent } from '@common/workspace/types'

import { createWorkspaceDirectory, createWorkspaceFile, existWorkspaceFile, readWorkspaceFile, renameWorkspaceFil, saveWorkspaceFile } from '@lib/workspace'
import { splitPathToNodes } from '@lib/extension/fs'

/**
 * file hierarchy plan:
 *
 *  - Category 1 [dir]
 *    - Character 1 [dir]
 *      - Character 1 - base
 *    - Category 2 [dir]
 *      - Character 2 [dir: '']
 *        - Character 2 - base
 *        - Character 2 - profile 1
 *        - Character 2 - profile 2
 */
export type CharacterFileExtension = '.character.pyg' | '.character.pyg.dir' | '.profile.pyg'
const checkCharacterFileExtension = (filename: string, extension: CharacterFileExtension): boolean => {
  return filename.endsWith(extension)
}

const combineExtension = (name: string, type: CharacterKeyType, isCharacterDirectory = false): string => {
  if (type === 'profile') return `${name}.profile.pyg`
  else if (type === 'character' && isCharacterDirectory) return `${name}.character.pyg.dir`
  else if (type === 'character' && !isCharacterDirectory) return `${name}.character.pyg`
  else return name
}

const combinePath = (parentPath: string, childName: string, type: CharacterKeyType, isCharacterDirectory = false): string => {
  if (parentPath.length === 0 || parentPath === '.') return combineExtension(childName, type, isCharacterDirectory)
  return `${parentPath}/${combineExtension(childName, type, isCharacterDirectory)}`
}

const removeExtension = (node: string): string => {
  const extensions: CharacterFileExtension[] = ['.character.pyg.dir', '.character.pyg', '.profile.pyg']
  for (const ext of extensions) {
    if (node.endsWith(ext)) return node.replace(ext, '')
  }
  return node
}

export class CharactersWorkspaceSegment {
  readonly path: string
  readonly workspaceName: string
  private _rootKey: CharacterKey
  get rootKey(): CharacterKey {
    return this._rootKey
  }

  private getKeyOrUndefined(nodes: string[], type: CharacterKeyType): CharacterKey | undefined {
    let parent: CharacterKey | undefined = this._rootKey

    if (nodes.length <= 1 && nodes[0] === '') return parent

    for (const node of nodes) {
      if (!parent) return undefined
      parent = parent.children[node]
    }
    return parent?.type === type ? parent : undefined
  }

  private getOrCreateChild(parentKey: CharacterKey, name: string, type: CharacterKeyType = 'category'): CharacterKey {
    const key = combineExtension(name, type, true)
    const child = parentKey.children[key]
    if (!child) {
      const path = combinePath(parentKey.path, name, type, true)
      parentKey.children[key] = {
        path,
        realFilepath: path,
        name,
        children: {},
        type: type
      }
    }
    return parentKey.children[key]!
  }

  private insertCategory(nodes: string[]): void {
    let parent = this._rootKey
    for (const node of nodes) {
      parent = this.getOrCreateChild(parent, node)
    }
  }

  private insertCharacter(nodes: string[]): void {
    let parent = this._rootKey
    for (const node of nodes) {
      const keyName = removeExtension(node)
      if (node === nodes.at(-1)) parent = this.getOrCreateChild(parent, keyName, 'character')
      else parent = this.getOrCreateChild(parent, keyName)
    }
  }

  private insertProfile(nodes: string[]): void {
    if (nodes.length < 2) return

    const profileNode = nodes.at(-1)
    const characterDirNode = nodes.at(-2)

    let parent = this._rootKey
    for (const node of nodes) {
      const keyName = removeExtension(node)
      if (node === characterDirNode) parent = this.getOrCreateChild(parent, keyName, 'character')
      else if (node === profileNode) parent = this.getOrCreateChild(parent, keyName, 'profile')
      else parent = this.getOrCreateChild(parent, keyName)
    }
  }

  private matchCharacterRealFilepath(nodes: string[]): void {
    if (nodes.length < 2) return

    const realFileNode = nodes.at(-1)!
    const characterDirNode = nodes.at(-2)!

    let parent = this.rootKey
    for (const node of nodes) {
      const keyName = removeExtension(node)
      if (node === characterDirNode) {
        parent = this.getOrCreateChild(parent, keyName, 'character')
        break
      }
      parent = this.getOrCreateChild(parent, keyName)
    }

    parent.realFilepath += '/'
    parent.realFilepath += realFileNode
  }

  private fetchCharacterHierarchyFromPath(hierarchyRootPath: string): boolean {
    if (this._rootKey.type !== 'category') return false
    this.resetRootKey()

    const files = fs.readdirSync(hierarchyRootPath, { recursive: true, encoding: 'utf-8' })

    for (const file of files) {
      const isDirectory = fs.lstatSync(path.join(hierarchyRootPath, file)).isDirectory()
      const isCharacterFile = checkCharacterFileExtension(file, '.character.pyg')
      const isCharacterDir = checkCharacterFileExtension(file, '.character.pyg.dir')
      const isProfile = checkCharacterFileExtension(file, '.profile.pyg')

      const nodes = splitPathToNodes(file)

      if (isCharacterDir && isDirectory) {
        this.insertCharacter(nodes)
      } else if (isCharacterFile && !isDirectory) {
        this.matchCharacterRealFilepath(nodes)
      } else if (isProfile) {
        this.insertProfile(nodes)
      } else if (isDirectory) {
        this.insertCategory(nodes)
      } else {
        console.log('unknown file name format')
      }
    }

    return true
  }

  private resetRootKey(): void {
    this._rootKey = {
      path: '',
      realFilepath: '',
      name: `Character [${this.workspaceName}]`,
      type: 'category',
      children: {}
    }
  }

  constructor(workspacePath: string, name: string) {
    this.path = `${workspacePath}/Characters`
    this.workspaceName = name
    this._rootKey = {
      path: '',
      realFilepath: '',
      name: `Character [${name}]`,
      type: 'category',
      children: {}
    }
  }

  fileIsExisted(path: string): boolean {
    return existWorkspaceFile('Characters', path)
  }

  refreshNewName(parentKey: CharacterKey, type: CharacterKeyType): string {
    let newName = 'New'
    let index = 0
    while (this.fileIsExisted(combinePath(parentKey.path, newName, type, true))) {
      newName = `New (${index})`
      index++
    }
    return newName
  }

  fetchFromDisk(): void {
    if (!this.fetchCharacterHierarchyFromPath(this.path)) {
      console.error(`Character Hierarchy Fetching Error : path - [${this.path}]`)
    }
  }

  createCategory(categoryPath: string): CharacterKey | undefined {
    const nodes = splitPathToNodes(categoryPath)
    const parentCategoryKey = this.getKeyOrUndefined(nodes, 'category')

    // this function only work for create single category
    if (!parentCategoryKey) return undefined

    const newName = this.refreshNewName(parentCategoryKey, 'category')

    createWorkspaceDirectory('Characters', categoryPath, newName)

    return this.getOrCreateChild(parentCategoryKey, newName, 'category')
  }

  createCharacter(categoryPath: string): CharacterKey | undefined {
    const nodes = splitPathToNodes(categoryPath)
    const parentCategoryKey = this.getKeyOrUndefined(nodes, 'category')

    // this function only work for create single category
    if (!parentCategoryKey) return undefined

    const newName = this.refreshNewName(parentCategoryKey, 'character')

    const character = this.getOrCreateChild(parentCategoryKey, newName, 'character')
    character.realFilepath += '/'
    character.realFilepath += combineExtension(newName, 'character')

    createWorkspaceDirectory('Characters', character.path)
    createWorkspaceFile('Characters', character.realFilepath)

    return character
  }

  createProfile(characterPath: string): CharacterKey | undefined {
    const nodes = splitPathToNodes(characterPath)
    const parentCharacterKey = this.getKeyOrUndefined(nodes, 'character')

    // this function only work for create single category
    if (!parentCharacterKey) return undefined
    else if (parentCharacterKey.type !== 'character') return undefined

    const newName = this.refreshNewName(parentCharacterKey, 'profile')

    createWorkspaceFile('Characters', characterPath, combineExtension(newName, 'profile'))

    return this.getOrCreateChild(parentCharacterKey, newName, 'profile')
  }

  readCharacter(key: CharacterKey): CharacterContent {
    const content = readWorkspaceFile(key.path, key.name)
    return {
      path: `./Characters/${content.path}`,
      filename: content.name,
      content: content.content
    }
    // todo : parse character file
  }

  readProfile(key: CharacterKey): CharacterProfileContent {
    const content = readWorkspaceFile(key.path, key.name)
    return {
      path: `./Characters/${content.path}`,
      filename: content.name,
      content: content.content
    }
    // todo : parse profile file
  }

  saveCharacter(content: CharacterContent): boolean {
    return saveWorkspaceFile({
      name: content.filename,
      path: `./Characters/${content.path}`,
      content: content.content
    })
  }

  saveProfile(content: CharacterProfileContent): boolean {
    return saveWorkspaceFile({
      name: content.filename,
      path: `./Characters/${content.path}`,
      content: content.content
    })
  }

  renameCategory(key: CharacterKey, newName: string): boolean {
    let newHRelPath = key.path.substring(0, key.path.lastIndexOf('/') + 1)
    newHRelPath += newName

    return renameWorkspaceFil(`Characters/${key.path}`, `Characters/${newHRelPath}`)
  }

  renameCharacter(key: CharacterKey, newName: string): boolean {
    let newHRelPath = key.path.substring(0, key.path.lastIndexOf('/') + 1)
    newHRelPath += combineExtension(newName, 'character', true)
    const newHRelFilePath = newHRelPath + `/${newName}.character.pyg`

    const left = renameWorkspaceFil(`Characters/${key.path}`, `Characters/${newHRelPath}`)
    const right = renameWorkspaceFil(`Characters/${newHRelPath}/${combineExtension(key.name, 'character')}`, `Characters/${newHRelFilePath}`)
    return left && right
  }

  renameProfile(key: CharacterKey, newName: string): boolean {
    let newHRelPath = key.path.substring(0, key.path.lastIndexOf('/') + 1)
    newHRelPath += combineExtension(newName, 'profile')
    console.log('hello?', combineExtension(newName, 'profile'))

    return renameWorkspaceFil(`Characters/${key.path}`, `Characters/${newHRelPath}`)
  }
}

// todo : character remove
