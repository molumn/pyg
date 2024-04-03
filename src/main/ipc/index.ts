import { BrowserWindow, ipcMain } from 'electron'
import { IpcAPI } from '../../shared/ipcChannel'
import { applicationHandler } from '../properties'
import { onClose, onMaximize, onMinimize, onRestore } from './window-control'

const ipcCallbacks: IpcAPI = {
  'request-window-type': () => {
    return applicationHandler.mainWindowType
  },
  'set-window-type': (_, type) => {
    applicationHandler.applyWindowType(type)
  },

  'request-window-is-maximized': (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    return win?.isMaximized() === true
  },

  'request-minimize-window': onMinimize,
  'request-maximize-window': onMaximize,
  'request-restore-window': onRestore,
  'request-close-window': onClose,
}

export function registerAllIpcCallbacks(): void {
  for (const channel in ipcCallbacks) {
    ipcMain.handle(channel, ipcCallbacks[channel])
  }
}
