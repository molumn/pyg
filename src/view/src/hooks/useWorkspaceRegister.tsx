import { WorkspaceKey } from '@common/type'
import { IpcSocket } from '@common/socket'

import { useHookWorkspaceCharacterHierarchy } from '@view/hooks/useHookWorkspaceCharacterHierarchy'

export const useWorkspaceRegister = (): {
  onOpenWorkspace: (key: WorkspaceKey) => () => Promise<void>
  onCreateWorkspace: (key: WorkspaceKey) => () => Promise<void>
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

  const onCreateWorkspace = (key: WorkspaceKey): (() => Promise<void>) => {
    return async (): Promise<void> => {
      await socket.request('workspace/create', key)
      await socket.request('workspace/open', key)
      onRegistered()
    }
  }

  return {
    onOpenWorkspace,
    onCreateWorkspace
  }
}
