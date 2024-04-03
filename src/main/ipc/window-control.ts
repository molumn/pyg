import { BrowserWindow, IpcMainEvent } from 'electron'

import { IpcAPI } from '../../shared/ipcChannel'

export const onMinimize: IpcAPI['request-minimize-window'] = (event: IpcMainEvent) => {
  const win = BrowserWindow.fromId(event.sender.id)
  if (win) win.minimize()
}

export const onMaximize: IpcAPI['request-maximize-window'] = (event: IpcMainEvent) => {
  const win = BrowserWindow.fromId(event.sender.id)
  if (win) win.maximize()
}
export const onRestore: IpcAPI['request-restore-window'] = (event: IpcMainEvent) => {
  const win = BrowserWindow.fromId(event.sender.id)
  if (win) win.restore()
}

export const onClose: IpcAPI['request-close-window'] = (event: IpcMainEvent) => {
  const win = BrowserWindow.fromId(event.sender.id)
  if (win) win.close()
}
