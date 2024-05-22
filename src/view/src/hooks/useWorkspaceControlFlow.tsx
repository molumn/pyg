import { WorkspaceKey } from '@common/type'
import { IpcSocket } from '@common/socket'

import { useAppDispatch } from '@view/hooks/index'
import { updateRootNode } from '@view/store/ProjectFileNode'

export const useWorkspaceOpenFlow = (): {
  openWorkspace: (key: WorkspaceKey) => Promise<boolean>
} => {
  const socket = IpcSocket.ipcRenderer
  const dispatcher = useAppDispatch()

  return {
    openWorkspace: async (key: WorkspaceKey): Promise<boolean> => {
      const result: boolean = await socket.request('workspace/open', key)
      dispatcher(updateRootNode())

      return result
    }
  }
}

export const useWorkspaceCreateFlow = (): {
  createWorkspace: (key: WorkspaceKey) => Promise<boolean>
} => {
  const socket = IpcSocket.ipcRenderer

  return {
    createWorkspace: async (key: WorkspaceKey): Promise<boolean> => {
      return await socket.request('workspace/create', key)
    }
  }
}

export const useWorkspaceCloseFlow = (): {
  closeWorkspace: () => void
} => {
  const socket = IpcSocket.ipcRenderer

  return {
    closeWorkspace: (): void => {
      socket.command('workspace/close')
    }
  }
}
