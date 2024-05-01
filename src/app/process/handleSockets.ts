import fs from 'fs'
import path from 'path'

import { BrowserWindow, ipcMain } from 'electron'

import { AuthenticationRequest, WorkspaceKey } from '../../common/type'
import { IpcSocket } from '../../common/socket'

import { ApplicationHandler } from '../../structure/application'

import localStores from '../../lib/store'
import { Workspace } from '../../structure/workspace'
import { FileContent, FileNode, FileType } from '../../common/workspace/files'

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
  socket.handle('workspace', 'readFile', async (event, fileNode: FileNode): Promise<FileContent> => {
    if (!fileNode || fileNode.type === 'DIRECTORY') return {
      name: '',
      path: '',
      content: '',
      encoding: 'txt'
    }

    console.log(fileNode)


    const rootPath = Workspace.instance.rootPath
    if (!fs.existsSync(rootPath)) return {
      ...fileNode,
      content: '',
      encoding: 'txt'
    }

    const content = fs.readFileSync(path.join(rootPath, fileNode.path), { encoding: 'utf-8' })

    return {
      ...fileNode,
      content,
      encoding: fileNode.type
    }
  })
  socket.handle('workspace', 'saveFile', async (event, fileContent: FileContent): Promise<boolean> => {
    console.log('saveFile!')

    const rootPath = Workspace.instance.rootPath
    try {
      fs.writeFileSync(path.join(rootPath, fileContent.path), fileContent.content)
      return true
    } catch (err) {
      return false
    }
  })
  socket.handle('workspace', 'getRootNode', async (): Promise<FileNode> => {
    const name = Workspace.instance.name
    const rootPath = Workspace.instance.rootPath

    if (!fs.existsSync(rootPath)) return {
      name: '!!!No Workspace Exist!!!',
      path: '.',
      type: 'DIRECTORY',
      children: []
    }

    const root: FileNode = {
      name: `Project [${name}]`,
        path: '.',
      type: 'DIRECTORY',
      children: []
    }

    let files: string[]

    try {
      files = fs.readdirSync(rootPath, { encoding: 'utf-8' })
    } catch (err) {
      return {
        name: '!!!Read Directory Error!!!',
        path: '.',
        type: 'DIRECTORY',
        children: []
      }
    }

    for (const file of files) {
      const road = file.replace(rootPath, '').split('/')

      let history: string = '.'
      let parent: FileNode = root
      for (const node of road) {
        const existedOrNull = parent.children.find((child) => child.name === node)
        if (existedOrNull) {
          parent = existedOrNull
        } else {
          const child: FileNode = {
            name: node,
            path: history,
            type: 'DIRECTORY',
            children: []
          }
          parent.children.push(child)
          parent = child
        }
        history += `/${node}`
      }

      try {
        parent.type = parent.name.substring(parent.name.lastIndexOf('.') + 1) as FileType
      } catch (err) {
        fs.lstatSync(path.join(rootPath, parent.path)).isDirectory()
          ? parent.type = 'DIRECTORY'
          : parent.type = 'txt'
      }

      parent = root
    }

    return root
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
