import { BrowserWindow, ipcMain } from 'electron'

import { AuthenticationRequest, WorkspaceKey } from '../../common/type'
import { IpcSocket } from '../../common/socket'

import { ApplicationHandler } from '../../structure/application'

import localStores from '../../lib/store'
import { Workspace } from '../../structure/workspace'

export const handleSockets = (): void => {
  IpcSocket.createListener(ipcMain)
  const socket = IpcSocket.listener

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
    ApplicationHandler.changeToLoginWindow()
  })
  socket.on('windowControl', 'onChangeToStart', () => {
    ApplicationHandler.changeToStartWindow()
  })
  socket.on('windowControl', 'onChangeToWorkspace', (_, workspaceKey?: WorkspaceKey) => {
    ApplicationHandler.changeToWorkspaceWindow(workspaceKey)
  })

  /**
   * Inter-Process Communication: WindowStatus
   */
  socket.handle('windowStatus', 'getWindowIsMaximized', (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    return win?.isMaximized() === true
  })
  socket.handle('windowStatus', 'getWindowType', () => {
    return ApplicationHandler.applicationRunningType
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
  socket.on('workspace', 'createWorkspace', (event, key: WorkspaceKey) => {
    Workspace.createWorkspace(key)
    ApplicationHandler.changeToWorkspaceWindow(key)
  })
  socket.on('workspace', 'createDemo', () => {
    Workspace.createDemo('demo')
    ApplicationHandler.changeToWorkspaceWindow()
  })

  /**
   * Inter-Process Communication: Authentication
   */
  // socket.handle(
  //   'authentication',
  //   'onAuth',
  //   async (_, authInfo: AuthenticationRequest): Promise<AuthenticationResponse> => {
  //     // todo : authentication
  //     return {
  //       result: true,
  //       type: 'SignIn'
  //     }
  //   }
  // )

  /**
   * Inter-Process Communication: NodeUtilities
   */
  socket.handle(
    'nodeUtilities',
    'checkDirectoryIsFree',
    async (_, directory: string): Promise<boolean> => {
      let result: boolean =  /^(\/?[a-z0-9A-Z\-]+)+$/.test(directory)
      return result
    }
  )
}
