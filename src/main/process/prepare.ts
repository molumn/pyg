import { Socket } from '../../shared/socket'
import { BrowserWindow, ipcMain } from 'electron'
import { ApplicationHandler } from '../handle/application'
import { WorkspaceKey } from '../handle/workspace'
import { WindowManager } from '../handle/window'

export const prepareSockets = (): void => {
  const socket = Socket.listener(ipcMain)

  /**
   * Inter-Process Communication: WindowControl
   */

  socket.on('windowControl', 'onMinimized', (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    if (!win) return
    win.minimize()
  })
  socket.on('windowControl', 'onMaximized', (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    if (!win) return
    win.maximize()
  })
  socket.on('windowControl', 'onRestore', (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    if (!win) return
    win.restore()
  })
  socket.on('windowControl', 'onClose', (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    if (!win) return
    win.close()
  })
  socket.on('windowControl', 'onChangeToLogin', () => {
    ApplicationHandler.instance.changeToLoginWindow()
  })
  socket.on('windowControl', 'onChangeToStart', () => {
    ApplicationHandler.instance.changeToStartWindow()
  })
  socket.on('windowControl', 'onChangeToWorkspace', (_, workspaceKey?: WorkspaceKey) => {
    ApplicationHandler.instance.changeToWorkspaceWindow(workspaceKey)
  })

  /**
   * Inter-Process Communication: WindowStatus
   */
  socket.handle('windowStatus', 'getWindowIsMaximized', (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    return win?.isMaximized() === true
  })
  socket.handle('windowStatus', 'getWindowType', () => {
    return WindowManager.instance.mainType
  })
}
