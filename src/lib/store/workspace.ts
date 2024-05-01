import { LocalStore } from './type'
import { WorkspaceKey } from '../../common/type'
import { existsSync } from 'fs'

type WorkspaceStoreSchema = {
  createdWorkspaces: {
    [workspaceNickname: string]: WorkspaceKey
  }
}

export class WorkspaceStore extends LocalStore<WorkspaceStoreSchema> {
  constructor() {
    super('workspace', {
      createdWorkspaces: {}
    })
  }
  initialize(): void {
    super.initialize()
    for (const workspaceNickname in this.store.createdWorkspaces) {
      const workspaceKey = this.store.createdWorkspaces[workspaceNickname]
      workspaceKey.isExisted = existsSync(workspaceKey.rootPath)
    }
  }
}
