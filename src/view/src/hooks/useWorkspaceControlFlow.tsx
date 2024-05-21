import { WorkspaceKey } from '@common/type'
import { IpcSocket } from '@common/socket'

import { useAppDispatch } from '@view/hooks/index'
import { updateRootNode } from '@view/store/ProjectFileNode'

export const useWorkspaceControlFlow = () => {
  const socket = IpcSocket.requester
  const dispatcher = useAppDispatch()

  const createWorkspace = async (key: WorkspaceKey): Promise<boolean> => {
    return await socket.request('workspace', 'createWorkspace', key)
  }

  const openWorkspace = async (key: WorkspaceKey): Promise<boolean> => {
    const result: boolean = await socket.request('workspace', 'registerWorkspace', key)
    dispatcher(updateRootNode())

    return result
  }

  const closeWorkspace = (): void => {
    socket.command('workspace', 'unregisterWorkspace')
  }

  return {
    createWorkspace,
    openWorkspace,
    closeWorkspace
  }
}
