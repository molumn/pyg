import { BrowserWindow, IpcMainEvent } from 'electron'

import { IpcAPI } from '../../shared/ipcChannel'
import { WindowType } from '../../shared/types'
import { ApplicationHandler } from '../handle/application'

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

export const onChangeWindow: IpcAPI['request-change-window'] = (_: IpcMainEvent, type: WindowType) => {
  ApplicationHandler.instance.changeWindow(type)
}
