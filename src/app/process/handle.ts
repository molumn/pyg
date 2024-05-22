import { ipcMain } from 'electron'

import { IpcSocket } from '@common/socket'

import {
  registerAuthenticationListener,
  registerNodeUtilitiesListener,
  registerWindowControlListener,
  registerWindowStatusListener,
  registerWorkspaceListener
} from '@app/listener'

export const handleSockets = (): void => {
  IpcSocket.createIpcMainUnit(ipcMain)
  const socket = IpcSocket.ipcMain

  registerWindowControlListener(socket)
  registerWindowStatusListener(socket)
  registerWorkspaceListener(socket)
  registerAuthenticationListener(socket)
  registerNodeUtilitiesListener(socket)
}
