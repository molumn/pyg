import { Socket } from '../../shared/socket'
import { BrowserWindow, ipcMain } from 'electron'
import { ApplicationHandler } from '../handle/application'
import { WindowManager } from '../handle/window'
import localStores from '../lib/store'
import { AuthenticationRequest, AuthenticationResponse, WorkspaceKey } from '../../shared/types'
import { GoogleOAuthHandler } from '../lib/oauth'

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

  /**
   * Inter-Process Communication: Workspace
   */
  socket.handle('workspace', 'getCreatedWorkspaces', () => {
    const createdWorkspace: WorkspaceKey[] = []
    localStores.workspaceStore.get((store) => {
      for (const key in store.createdWorkspaces) {
        createdWorkspace.push(store.createdWorkspaces[key])
      }
    })
    return createdWorkspace
  })

  /**
   * Inter-Process Communication: Workspace
   */
  socket.handle(
    'authentication',
    'onAuth',
    async (event, authInfo: AuthenticationRequest): Promise<AuthenticationResponse> => {
      const redirectURL = BrowserWindow.fromId(event.sender.id)?.webContents.getURL()
      if (authInfo.type === 'google') {
        await GoogleOAuthHandler.profile('', redirectURL).then((res) => {
          console.log(res)
        })
      }
      return {
        result: true,
        type: 'SignIn'
      }
    }
  )
}
