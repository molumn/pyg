import { BrowserWindow, IpcMainInvokeEvent } from 'electron'
import { IpcListenerType } from './index'
import { ApplicationHandler } from '../handle/application'

export type WindowControlIpcCallbacks = {
  onMinimize: () => void
  onMaximize: () => void
  onRestore: () => void
  onClose: () => void

  onChangeToLogin: () => void
  onChangeToStart: () => void
  onChangeToWorkspace: (workspaceNickname?: string) => void
}

export const WindowControlIpcListeners: IpcListenerType<WindowControlIpcCallbacks> = {
  onMinimize: (event: IpcMainInvokeEvent) => {
    const win = BrowserWindow.fromId(event.sender.id)
    if (win) win.minimize()
  },
  onMaximize: (event: IpcMainInvokeEvent) => {
    const win = BrowserWindow.fromId(event.sender.id)
    if (win) win.maximize()
  },
  onRestore: (event: IpcMainInvokeEvent) => {
    const win = BrowserWindow.fromId(event.sender.id)
    if (win) win.restore()
  },
  onClose: (event: IpcMainInvokeEvent) => {
    const win = BrowserWindow.fromId(event.sender.id)
    if (win) win.close()
  },

  onChangeToLogin: () => {
    ApplicationHandler.instance.changeToLoginWindow()
  },
  onChangeToStart: () => {
    ApplicationHandler.instance.changeToStartWindow()
  },
  onChangeToWorkspace: () => {
    // todo : find recent opened workspace or registered workspace
    ApplicationHandler.instance.changeToWorkspaceWindow()
  }
}
