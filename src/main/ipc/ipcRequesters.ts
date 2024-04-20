import { IpcDelayedRequesterType, IpcRequesterType } from './index'
import { ipcRenderer } from 'electron'
import { WindowStatusIpcCallbacks } from './window-status'
import { AuthorizationIpcCallbacks } from './auth'
import { WindowControlIpcCallbacks } from './window-control'
import { WorkspaceIpcCallbacks } from './workspace'

const WindowStatusIpcRequesters: IpcDelayedRequesterType<WindowStatusIpcCallbacks> = {
  getWindowType: () => ipcRenderer.invoke('getWindowType'),
  getWindowIsMaximized: () => ipcRenderer.invoke('getWindowIsMaximized')
}

const AuthorizationIpcRequesters: IpcRequesterType<AuthorizationIpcCallbacks> = {
  onAuth: (request) => ipcRenderer.sendSync('onAuth', request)
}

const WindowControlIpcRequesters: IpcRequesterType<WindowControlIpcCallbacks> = {
  onMinimize: () => ipcRenderer.send('onMinimize'),
  onMaximize: () => ipcRenderer.send('onMaximize'),
  onRestore: () => ipcRenderer.send('onRestore'),
  onClose: () => ipcRenderer.send('onClose'),

  onChangeToLogin: () => ipcRenderer.send('onChangeToLogin'),
  onChangeToStart: () => ipcRenderer.send('onChangeToStart'),
  onChangeToWorkspace: (workspaceNickname?) =>
    ipcRenderer.send('onChangeToWorkspace', workspaceNickname)
}

const WorkspaceIpcRequesters: IpcRequesterType<WorkspaceIpcCallbacks> = {
  onOpenFile: (pointer) => ipcRenderer.sendSync('onOpenFile', pointer),
  onSaveFile: (pointer) => ipcRenderer.sendSync('onSaveFile', pointer),
  onCreateFile: (parent, relpath) => ipcRenderer.sendSync('onCreateFile', parent, relpath),
  onCreateDirectory: (parent, relpath) => ipcRenderer.sendSync('onCreateDirectory', parent, relpath)
}

export const ipcRequesters = {
  windowControl: WindowControlIpcRequesters,
  windowStatus: WindowStatusIpcRequesters,
  authorization: AuthorizationIpcRequesters,
  workspace: WorkspaceIpcRequesters
}
