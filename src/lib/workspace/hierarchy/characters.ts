import fs from 'fs'

import { CharacterContent, CharacterKey, CharacterKeyType, ProfileContent } from '@common/workspace/types'

import { createWorkspaceDirectory, readWorkspaceFile, saveWorkspaceFile } from '@lib/workspace'

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

const combinePath = (parent: string, child: string): string => {
  if (parent.length === 0 || parent === '.') return child
  return `${parent}/${child}`
}

const combineExtension = (name: string, type: CharacterKeyType, isDirectory = false): string => {
  if (type === 'profile') return `${name}.profile.pyg`
  else if (type === 'character' && isDirectory) return `${name}.character.pyg.dir`
  else if (type === 'character' && !isDirectory) return `${name}.character.pyg`
  else return name
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

  private getOrCreateChild(parent: CharacterKey, nextNode: string): CharacterKey {
    const childOrUndefined = parent.children[nextNode]
    let type: CharacterKeyType = 'category'

    if (checkCharacterFileExtension(nextNode, '.character.pyg')) type = 'character'
    else if (checkCharacterFileExtension(nextNode, '.character.pyg.dir')) type = 'character'
    else if (checkCharacterFileExtension(nextNode, '.profile.pyg')) type = 'profile'

    if (!childOrUndefined) {
      parent.children[nextNode] = {
        path: combinePath(parent.path, nextNode),
        name: nextNode,
        type,
        children: {}
      }
      return parent.children[nextNode]!
    }
    return childOrUndefined
  }

  private insertCategory(nodes: string[]): void {
    let parent = this._rootKey
    for (const node of nodes) {
      const current = this.getOrCreateChild(parent, node)
      if (current.type !== 'category') break
      parent = current
    }
  }

  private insertCharacterDirectory(nodes: string[]): void {
    let parent = this._rootKey
    for (const node of nodes) {
      const current = this.getOrCreateChild(parent, node)
      if (current.type !== 'category') break
      parent = current
    }
  }

  private checkCombinedCharacter(nodes: string[]): void {
    let parent = this._rootKey
    for (const node of nodes) {
      if (parent.type === 'character') break
      const current = this.getOrCreateChild(parent, node)
      if (current.type === 'profile') break
      parent = current
    }
    if (parent.type !== 'character') {
      console.error('character file must be existed inside of character folder!')
    }
  }

  private insertProfileFile(nodes: string[]): void {
    let parent = this._rootKey
    for (const node of nodes) {
      const current = this.getOrCreateChild(parent, node)
      if (current.type === 'profile') break
      parent = current
    }
  }

  private fetchCharacterHierarchyFromPath(path: string): boolean {
    if (this._rootKey.type !== 'category') return false

    const files = fs.readdirSync(path, { recursive: true, encoding: 'utf-8' })

    for (const file of files) {
      const isDirectory = fs.lstatSync(file).isDirectory()
      const isCharacterFile = checkCharacterFileExtension(file, '.character.pyg')
      const isCharacterDir = checkCharacterFileExtension(file, '.character.pyg.dir')
      const isProfile = checkCharacterFileExtension(file, '.profile.pyg')

      const nodes = file.split('/')

      if (isCharacterDir) {
        if (isDirectory) this.insertCharacterDirectory(nodes)
        else {
          console.error(`File named .character.pyg.dir is ignored : [${file}]`)
        }
      } else if (isCharacterFile) {
        this.checkCombinedCharacter(nodes)
      } else if (isProfile) {
        this.insertProfileFile(nodes)
      } else {
        this.insertCategory(nodes)
      }
    }

    return true
  }

  constructor(workspacePath: string, name: string) {
    this.path = `${workspacePath}/Characters`
    this._rootKey = {
      path: '',
      name: `Character [${name}]`,
      type: 'category',
      children: {}
    }

    if (!this.fetchCharacterHierarchyFromPath(this.path)) {
      console.error(`Character Hierarchy Fetching Error : path - [${this.path}]`)
    } else {
      console.log('Character Hierarchy : ')
      console.group()
      console.log(this._rootKey)
      console.groupEnd()
    }
  }

  createCategory(categoryPath: string, nextNode: string): CharacterKey | undefined {
    const nodes = categoryPath.split('/')
    const category = this.getKeyOrUndefined(nodes, 'category')
    if (!category) return undefined

    let newCategory = category.children[nextNode]
    if (!newCategory) {
      category.children[nextNode] = {
        path: combinePath(category.path, nextNode),
        name: nextNode,
        type: 'category',
        children: {}
      }
      newCategory = category.children[nextNode]
    }

    createWorkspaceDirectory('Characters', newCategory?.path ?? '')
  }

  createCharacter(categoryPath: string, nextNode: string): CharacterKey | undefined {
    const nodes = categoryPath.split('/')
    const category = this.getKeyOrUndefined(nodes, 'category')
    if (!category) return undefined

    let newCharacter = category.children[nextNode]
    if (!newCharacter) {
      category.children[nextNode] = {
        path: combinePath(category.path, combineExtension(nextNode, 'character', false)),
        name: nextNode,
        type: 'character',
        children: {}
      }
      newCharacter = category.children[nextNode]
    }

    if (!newCharacter) return undefined
    createWorkspaceDirectory('Characters', newCharacter.path + '.dir')
    saveWorkspaceFile({
      name: newCharacter.name,
      path: `./Characters/${newCharacter.path}`,
      content: ''
    })

    return newCharacter
  }

  createProfile(characterPath: string, nextNode: string): CharacterKey | undefined {
    const nodes = characterPath.split('/')
    const character = this.getKeyOrUndefined(nodes, 'character')
    if (!character) return undefined

    let newProfile = character.children[nextNode]
    if (!newProfile) {
      character.children[nextNode] = {
        path: combinePath(character.path, combineExtension(nextNode, 'profile', false)),
        name: nextNode,
        type: 'profile',
        children: {}
      }
      newProfile = character.children[nextNode]
    }

    if (!newProfile) return undefined
    saveWorkspaceFile({
      name: newProfile.name,
      path: `./Characters/${newProfile.path}`,
      content: ''
    })

    return newProfile
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
