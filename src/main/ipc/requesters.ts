import { IpcAsyncRequesterType, IpcRequesterType } from './index'
import { AuthenticationRequest } from '../../shared/types'
import { ipcRenderer } from 'electron'
import { WindowStatusIpcCallbacks } from './window-status'
import { AuthorizationIpcCallbacks } from './auth'
import { WindowControlIpcCallbacks } from './window-control'

export const WindowStatusIpcRequesters: IpcRequesterType<WindowStatusIpcCallbacks> = {
  getWindowType: () => ipcRenderer.invoke('getWindowType'),
  getWindowIsMaximized: () => ipcRenderer.invoke('getWindowIsMaximized')
}

export const AuthorizationIpcRequesters: IpcAsyncRequesterType<AuthorizationIpcCallbacks> = {
  onAuth: (request: AuthenticationRequest) => ipcRenderer.invoke('onAuth', request)
}

export const WindowControlIpcRequesters: WindowControlIpcCallbacks = {
  onMinimize: () => ipcRenderer.send('onMinimize'),
  onMaximize: () => ipcRenderer.send('onMaximize'),
  onRestore: () => ipcRenderer.send('onRestore'),
  onClose: () => ipcRenderer.send('onClose'),

  onChangeToLogin: () => ipcRenderer.send('onChangeToLogin'),
  onChangeToStart: () => ipcRenderer.send('onChangeToStart'),
  onChangeToWorkspace: (workspaceNickname?: string) =>
    ipcRenderer.invoke('onChangeToWorkspace', workspaceNickname)
}
