import { mkdirSync } from 'fs'

import store from '../../lib/store'

import { WorkspaceKey, WorkspaceType } from '@common/type'

export class Workspace {
  private static _instance: Workspace | undefined
  static get instance(): Workspace | undefined {
    return this._instance
  }

  static createWorkspace(key?: WorkspaceKey): void {
    if (!key) return
    if (!key.isExisted) {
      // todo : security check
      mkdirSync(key.rootPath, { recursive: true })
    }
    store.localStores.workspaceStore.edit((store) => {
      store.createdWorkspaces[key.name] = key
    })
  }

  readonly name: string
  readonly rootPath: string
  readonly type: WorkspaceType

  constructor(name: string, rootPath: string, type: WorkspaceType) {
    this.name = name
    this.rootPath = rootPath
    this.type = type
    // this.idNodePair = {}

    // todo : fetch file tree to idNodePair
  }
}
