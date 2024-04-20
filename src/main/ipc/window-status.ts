import { WindowType } from '../../shared/types'
import { BrowserWindow } from 'electron'
import { IpcHandleListenerType } from './index'
import { ApplicationHandler } from '../handle/application'

export type WindowStatusIpcCallbacks = {
  getWindowType: () => WindowType
  getWindowIsMaximized: () => boolean
}

export const WindowStatusIpcListeners: IpcHandleListenerType<WindowStatusIpcCallbacks> = {
  getWindowType: () => {
    return ApplicationHandler.instance.windowType
  },
  getWindowIsMaximized: (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    return win?.isMaximized() === true
  }
}
