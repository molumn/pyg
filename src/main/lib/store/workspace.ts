import { LocalStore } from './type'
import { WorkspaceKey } from '../../../shared/types'

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
}
