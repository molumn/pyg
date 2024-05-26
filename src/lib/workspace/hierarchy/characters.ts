import fs from 'fs'
import path from 'path'

import { CharacterContent, CharacterKey, CharacterKeyType, ProfileContent } from '@common/workspace/types'

import { readWorkspaceFile, saveWorkspaceFile } from '@lib/workspace'
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

const combineExtension = (name: string, type: CharacterKeyType, isDirectory = false): string => {
  if (type === 'profile') return `${name}.profile.pyg`
  else if (type === 'character' && isDirectory) return `${name}.character.pyg.dir`
  else if (type === 'character' && !isDirectory) return `${name}.character.pyg`
  else return name
}

const combinePath = (parentPath: string, childName: string, type: CharacterKeyType): string => {
  if (parentPath.length === 0 || parentPath === '.') return childName
  return `${parentPath}/${combineExtension(childName, type)}`
}

export class CharactersWorkspaceSegment {
  readonly path: string
  private readonly _rootKey: CharacterKey
  get rootKey(): CharacterKey {
    return this._rootKey
  }

  private getKeyOrUndefined(nodes: string[], type: CharacterKeyType): CharacterKey | undefined {
    let parent: CharacterKey | undefined = this._rootKey
    for (const node of nodes) {
      parent = parent?.children[node]
    }
    return parent?.type === type ? parent : undefined
  }

  private getOrCreateChild(parentKey: CharacterKey, nextNode: string, type: CharacterKeyType = 'category'): CharacterKey {
    let name: string = nextNode
    if (type === 'character') name = nextNode.replace('.character.pyg.dir', '')
    else if (type === 'profile') name = nextNode.replace('.profile.pyg', '')

    const child = parentKey.children[name]
    if (!child) {
      parentKey.children[name] = {
        path: combinePath(parentKey.path, nextNode, type),
        realFilepath: combinePath(parentKey.path, nextNode, type),
        name,
        children: {},
        type: type
      }
    }
    return parentKey.children[name]!
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
      if (node === nodes[nodes.length - 1]) parent = this.getOrCreateChild(parent, node, 'character')
      else parent = this.getOrCreateChild(parent, node)
    }
  }

  private insertProfile(nodes: string[]): void {
    if (nodes.length < 2) return

    const profileNode = nodes[nodes.length - 1]
    const characterDirNode = nodes[nodes.length - 2]

    let parent = this._rootKey
    for (const node of nodes) {
      if (node === characterDirNode) parent = this.getOrCreateChild(parent, node, 'character')
      else if (node === profileNode) parent = this.getOrCreateChild(parent, node, 'profile')
      else parent = this.getOrCreateChild(parent, node)
    }
  }

  private matchCharacterRealFilepath(nodes: string[]): void {
    if (nodes.length < 2) return

    const realFileNode = nodes[nodes.length - 1]
    const characterDirNode = nodes[nodes.length - 2]

    let parent = this.rootKey
    for (const node of nodes) {
      if (node === characterDirNode) {
        parent = this.getOrCreateChild(parent, node, 'character')
        break
      }
      parent = this.getOrCreateChild(parent, node)
    }

    parent.realFilepath += '/'
    parent.realFilepath += realFileNode
  }

  private fetchCharacterHierarchyFromPath(hierarchyRootPath: string): boolean {
    if (this._rootKey.type !== 'category') return false

    const files = fs.readdirSync(hierarchyRootPath, { recursive: true, encoding: 'utf-8' })

    for (const file of files) {
      const isDirectory = fs.lstatSync(path.join(hierarchyRootPath, file)).isDirectory()
      const isCharacterFile = checkCharacterFileExtension(file, '.character.pyg')
      const isCharacterDir = checkCharacterFileExtension(file, '.character.pyg.dir')
      const isProfile = checkCharacterFileExtension(file, '.profile.pyg')

      const nodes = splitPathToNodes(file)

      if (isDirectory && isCharacterDir) {
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

  constructor(workspacePath: string, name: string) {
    this.path = `${workspacePath}/Characters`
    this._rootKey = {
      path: '',
      realFilepath: '',
      name: `Character [${name}]`,
      type: 'category',
      children: {}
    }
  }

  fetchFromDisk(): void {
    if (!this.fetchCharacterHierarchyFromPath(this.path)) {
      console.error(`Character Hierarchy Fetching Error : path - [${this.path}]`)
    }
  }

  createCategory(categoryPath: string, childCategory: string): CharacterKey | undefined {
    const nodes = splitPathToNodes(categoryPath)
    const parentCategoryKey = this.getKeyOrUndefined(nodes, 'category')

    // this function only work for create single category
    if (!parentCategoryKey) return undefined

    return this.getOrCreateChild(parentCategoryKey, combineExtension(childCategory, 'category'))
  }

  createCharacter(categoryPath: string, characterName: string): CharacterKey | undefined {
    const nodes = splitPathToNodes(categoryPath)
    const parentCategoryKey = this.getKeyOrUndefined(nodes, 'category')

    // this function only work for create single category
    if (!parentCategoryKey) return undefined

    const character = this.getOrCreateChild(parentCategoryKey, combineExtension(characterName, 'character', true))
    character.realFilepath += '/'
    character.realFilepath += combineExtension(characterName, 'character')

    return character
  }

  createProfile(characterPath: string, profileName: string): CharacterKey | undefined {
    const nodes = splitPathToNodes(characterPath)
    const parentCategoryKey = this.getKeyOrUndefined(nodes, 'category')

    // this function only work for create single category
    if (!parentCategoryKey) return undefined
    else if (parentCategoryKey.type !== 'character') return undefined

    return this.getOrCreateChild(parentCategoryKey, combineExtension(profileName, 'category'))
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

  readProfile(key: CharacterKey): ProfileContent {
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

  saveProfile(content: ProfileContent): boolean {
    return saveWorkspaceFile({
      name: content.filename,
      path: `./Characters/${content.path}`,
      content: content.content
    })
  }
}
