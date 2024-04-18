import { LocalStore } from './type'
import { WorkspaceKey } from '../../handle/workspace'

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
