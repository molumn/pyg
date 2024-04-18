import { IpcRawRequesterType, IpcPromiseRequesterType } from './index'
import { ipcRenderer } from 'electron'
import { WindowStatusIpcCallbacks } from './window-status'
import { AuthorizationIpcCallbacks } from './auth'
import { WindowControlIpcCallbacks } from './window-control'
import { WorkspaceIpcCallbacks } from './workspace'

const WindowStatusIpcRequesters: IpcPromiseRequesterType<WindowStatusIpcCallbacks> = {
  getWindowType: () => ipcRenderer.invoke('getWindowType'),
  getWindowIsMaximized: () => ipcRenderer.invoke('getWindowIsMaximized')
}

const AuthorizationIpcRequesters: IpcRawRequesterType<AuthorizationIpcCallbacks> = {
  onAuth: (request) => ipcRenderer.invoke('onAuth', request)
}

const WindowControlIpcRequesters: IpcRawRequesterType<WindowControlIpcCallbacks> = {
  onMinimize: () => ipcRenderer.send('onMinimize'),
  onMaximize: () => ipcRenderer.send('onMaximize'),
  onRestore: () => ipcRenderer.send('onRestore'),
  onClose: () => ipcRenderer.send('onClose'),

  onChangeToLogin: () => ipcRenderer.send('onChangeToLogin'),
  onChangeToStart: () => ipcRenderer.send('onChangeToStart'),
  onChangeToWorkspace: (workspaceNickname?) =>
    ipcRenderer.send('onChangeToWorkspace', workspaceNickname)
}

const WorkspaceIpcRequesters: IpcPromiseRequesterType<WorkspaceIpcCallbacks> = {
  onOpenFile: (pointer) => ipcRenderer.invoke('onOpenFile', pointer),
  onSaveFile: (pointer) => ipcRenderer.invoke('onSaveFile', pointer),
  onCreateFile: (parent, relpath) => ipcRenderer.invoke('onCreateFile', parent, relpath),
  onCreateDirectory: (parent, relpath) => ipcRenderer.invoke('onCreateDirectory', parent, relpath)
}

export const ipcRequesters = {
  windowControl: WindowControlIpcRequesters,
  windowStatus: WindowStatusIpcRequesters,
  authorization: AuthorizationIpcRequesters,
  workspace: WorkspaceIpcRequesters
}
