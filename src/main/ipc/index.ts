import { BrowserWindow, ipcMain } from 'electron'
import { IpcAPI } from '../../shared/ipcChannel'
import { onChangeWindow, onClose, onMaximize, onMinimize, onRestore } from './window-control'
import { ApplicationHandler } from '../handle/application'
import { onAuth } from './auth'

const ipcCallbacks: IpcAPI = {
  'request-window-type': () => {
    return ApplicationHandler.instance.windowType
  },
  'request-window-is-maximized': (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    return win?.isMaximized() === true
  },

  'request-minimize-window': onMinimize,
  'request-maximize-window': onMaximize,
  'request-restore-window': onRestore,
  'request-close-window': onClose,

  'request-change-window': onChangeWindow,

  'request-user-authentication': onAuth
}

export function registerAllIpcCallbacks(): void {
  for (const channel in ipcCallbacks) {
    ipcMain.handle(channel, ipcCallbacks[channel])
  }
}
