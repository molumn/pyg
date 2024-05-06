import { existsSync } from 'fs'

import { WorkspaceKey } from '@common/type'

import { LocalStore } from './type'

type WorkspaceStoreSchema = {
  createdWorkspaces: {
    [workspaceNickname: string]: WorkspaceKey
  }
}

export class WorkspaceStore extends LocalStore<WorkspaceStoreSchema> {
  constructor() {
    super('configs', 'workspace', {
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

  save(): void {
    // const renewedCreatedWorkspaces: {
    //   [workspaceNickname: string]: WorkspaceKey
    // } = {}
    //
    // for (const workspaceNickname in this.store.createdWorkspaces)
    //   if (this.store.createdWorkspaces[workspaceNickname].isExisted === true) {
    //     renewedCreatedWorkspaces[workspaceNickname] =
    //       this.store.createdWorkspaces[workspaceNickname]
    //   }
    //
    // this.store.createdWorkspaces = renewedCreatedWorkspaces
    super.save()
  }
}
