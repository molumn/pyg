import store from '@lib/store'

import { WorkspaceKey, WorkspaceType } from '@common/type'
import { WorkspaceFolderHierarchy } from '@lib/workspace/hierarchy'

export class Workspace {
  private static _instance: Workspace | undefined
  static get instance(): Workspace | undefined {
    return this._instance
  }

  static createWorkspace(key?: WorkspaceKey): boolean {
    if (!key) return false

    const workspace = new Workspace(key.name, key.rootPath, key.type)

    const workspaceStore = store.localStores.workspaceStore
    workspaceStore.edit((store) => {
      const workspaces = store.createdWorkspaces
      if (workspaces[workspace.key.name]) {
        workspaces[workspace.key.name] = workspace.key
      }
    })

    return workspaceStore.get((store) => store.createdWorkspaces[workspace.key.name]) !== undefined
  }

  static registerWorkspace(nickName: string): boolean {
    const key = store.localStores.workspaceStore.get((store) => {
      return store.createdWorkspaces[nickName]
    })

    if (!key) return false

    this._instance = new Workspace(key.name, key.rootPath, key.type)

    return true
  }

  static unregisterWorkspace(): void {
    this._instance = undefined
  }

  readonly name: string
  readonly rootPath: string
  readonly type: WorkspaceType

  readonly hierarchy: WorkspaceFolderHierarchy

  private constructor(name: string, rootPath: string, type: WorkspaceType) {
    this.name = name
    this.rootPath = rootPath
    this.type = type

    this.hierarchy = new WorkspaceFolderHierarchy(this.rootPath, this.name)
    WorkspaceFolderHierarchy.create(this.hierarchy)
  }

  get key(): WorkspaceKey {
    return {
      name: this.name,
      rootPath: this.rootPath,
      type: 'planning-game',
      isExisted: true
    }
  }
}
