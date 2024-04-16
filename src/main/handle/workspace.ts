import { join } from 'path'
import { app } from 'electron'
import { mkdirSync } from 'fs'

export type WorkspaceType = 'planning-game' | 'demo'

export type WorkspaceKey = {
  name: string
  workspaceRoot: string
  type: WorkspaceType
}

export class Workspace {
  private static _instance: Workspace | undefined
  static get instance(): Workspace {
    return (
      this._instance ??
      new Workspace('demo', join(app.getPath('userData'), 'demo-workspace/demo'), 'demo')
    )
  }

  static createAndApplyDemo(name: string): void {
    const workspaceRoot: string = join(app.getPath('userData'), `defaults/demo-workspaces/${name}`)
    mkdirSync(workspaceRoot, { recursive: true })
    this._instance = new Workspace(name, workspaceRoot, 'demo')
  }

  static createAndApplyWorkspace(key: WorkspaceKey): void {
    mkdirSync(key.workspaceRoot, { recursive: true })
    this._instance = new Workspace(key.name, key.workspaceRoot, key.type)
  }

  readonly name: string
  readonly rootPath: string
  readonly type: WorkspaceType

  constructor(name: string, rootPath: string, type: WorkspaceType) {
    this.name = name
    this.rootPath = rootPath
    this.type = type
  }
}
