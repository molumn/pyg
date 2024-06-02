import { WorkspaceKey } from '@common/type'
import { IpcSocket } from '@common/socket'

import { useHookWorkspaceCharacterHierarchy } from '@view/hooks/useHookWorkspaceCharacterHierarchy'

export const useWorkspaceRegister = (): {
  onOpenWorkspace: (key: WorkspaceKey) => () => Promise<void>
  onCreateWorkspace: (workspaceName: string, workspacePath: string) => () => Promise<void>
} => {
  const socket = IpcSocket.ipcRenderer
  const { fetchCharacterHierarchy } = useHookWorkspaceCharacterHierarchy()

  const onRegistered = (): void => {
    fetchCharacterHierarchy()
  }

  const onOpenWorkspace = (key: WorkspaceKey): (() => Promise<void>) => {
    return async (): Promise<void> => {
      await socket.request('workspace/open', key)
      onRegistered()
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
      onRegistered()
    }
  }

  return {
    onOpenWorkspace,
    onCreateWorkspace
  }
}
