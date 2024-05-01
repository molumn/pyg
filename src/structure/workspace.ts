import { join } from 'path'
import { mkdirSync } from 'fs'

import { app } from 'electron'

import localStores from '../lib/store'

import { WorkspaceKey, WorkspaceType } from '../common/type'

export class Workspace {
  private static _demo: Workspace = new Workspace(
    'demo',
    join(app.getPath('userData'), 'demo-workspace/demo'),
    'demo'
  )

  private static _instance: Workspace | undefined
  static get instance(): Workspace {
    return this._instance ?? this._demo
  }

  static createDemo(name: string): void {
    const workspaceRoot: string = join(app.getPath('userData'), `defaults/demo-workspaces/${name}`)
    mkdirSync(workspaceRoot, { recursive: true })
    localStores.workspaceStore.edit((store) => {
      store.createdWorkspaces[name] = {
        name,
        rootPath: workspaceRoot,
        type: 'demo',
        isExisted: true
      }
    })
  }

  static createWorkspace(key?: WorkspaceKey): void {
    if (!key) return
    if (!key.isExisted) mkdirSync(key.rootPath, { recursive: true })
    localStores.workspaceStore.edit((store) => {
      store.createdWorkspaces[key.name] = key
    })
  }

  static findAndApplyWorkspace(workspaceNickname: string): void {
    const key = localStores.workspaceStore.get((store) => {
      return store.createdWorkspaces[workspaceNickname]
    })
    if (!key) {
      this._instance = this._demo
      return
    }
    this._instance = new Workspace(key.name, key.rootPath, key.type)
  }

  readonly name: string
  readonly rootPath: string
  readonly type: WorkspaceType
  // private idNodePair: {
  //   [id in HashCode]: FileNode
  // }

  // get root(): RootNode {
  // }

  constructor(name: string, rootPath: string, type: WorkspaceType) {
    this.name = name
    this.rootPath = rootPath
    this.type = type
    // this.idNodePair = {}

    // todo : fetch file tree to idNodePair
  }
}
