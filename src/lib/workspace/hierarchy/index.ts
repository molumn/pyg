import fs from 'fs'
import { CharactersWorkspaceSegment } from '@lib/workspace/hierarchy/characters'

export class WorkspaceFolderHierarchy {
  private readonly name: string
  private readonly path: string

  private readonly _plots: string
  private readonly _scenes: string
  private readonly _timeline: string
  private readonly _scripts: string

  readonly characters: CharactersWorkspaceSegment

  constructor(path: string, name: string = path.substring(path.lastIndexOf('/') + 1)) {
    this.name = name
    this.path = path
    this._plots = `${this.path}/Plots`
    this._scenes = `${this.path}/Scenes`
    this._timeline = `${this.path}/Timeline`
    this._scripts = `${this.path}/Scripts`

    this.characters = new CharactersWorkspaceSegment(this.path, this.name)
  }

  static create(hierarchy: WorkspaceFolderHierarchy): void {
    fs.mkdirSync(hierarchy.path, { recursive: true })

    fs.mkdirSync(hierarchy.characters.path)
    // fs.mkdirSync(hierarchy._plots)
    // fs.mkdirSync(hierarchy._scenes)
    // fs.mkdirSync(hierarchy._timeline)
    // fs.mkdirSync(hierarchy._scripts)
  }
}
