import { WorkspaceKey } from '@common/type'
import { IpcSocket } from '@common/socket'

import { useHookWorkspaceCharacterHierarchy } from '@view/hooks/useHookWorkspaceCharacterHierarchy'

export const useWorkspaceRegister = (): {
  onOpenWorkspace: (key: WorkspaceKey) => () => Promise<void>
  onCreateWorkspace: (workspaceName: string, workspacePath: string) => () => Promise<void>
  onRemoveWorkspace: (key: WorkspaceKey) => () => Promise<void>
} => {
  const socket = IpcSocket.ipcRenderer
  const { fetchCharacterHierarchy } = useHookWorkspaceCharacterHierarchy()

  const onSocketCalled = (): void => {
    fetchCharacterHierarchy()
  }

  const onOpenWorkspace = (key: WorkspaceKey): (() => Promise<void>) => {
    return async (): Promise<void> => {
      await socket.request('workspace/open', key)
      onSocketCalled()
    }
  }

  const onCreateWorkspace = (workspaceName: string, workspacePath: string): (() => Promise<void>) => {
    return async (): Promise<void> => {
      const key: WorkspaceKey = {
        name: workspaceName,
        rootPath: `${workspacePath}/${workspaceName}`,
        type: 'planning-game',
        isExisted: false
      }
      // todo : debug this
      await socket.command('workspace/create', key)
      await socket.request('workspace/open', key)
      onSocketCalled()
    }
  }

  const onRemoveWorkspace = (key: WorkspaceKey): (() => Promise<void>) => {
    return async (): Promise<void> => {
      await socket.command('workspace/list/remove', key)
      onSocketCalled()
    }
  }

  return {
    onOpenWorkspace,
    onCreateWorkspace,
    onRemoveWorkspace
  }
}
