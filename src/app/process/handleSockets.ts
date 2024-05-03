import fs from 'fs'
import path from 'path'

import { BrowserWindow, ipcMain } from 'electron'

import { AuthenticationRequest, WorkspaceKey } from '../../common/type'
import { IpcSocket } from '../../common/socket'

import { ApplicationHandler } from '../../structure/application'

import localStores from '../../lib/store'
import { Workspace } from '../../structure/workspace'
import { FileEncodingType, FileContent, FileNode, FileType } from '../../common/workspace/files'

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
    let realWorkspaceKey: WorkspaceKey | null = null

    localStores.workspaceStore.initialize()
    localStores.workspaceStore.get((store) => {
      const find = store.createdWorkspaces[workspaceKey?.name ?? '']
      if (find) realWorkspaceKey = find
    })

    if (!realWorkspaceKey) return

    ApplicationHandler.changeToWorkspaceWindow(realWorkspaceKey)
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
  socket.handle(
    'workspace',
    'readFile',
    async (event, fileNode: FileNode): Promise<FileContent> => {
      const rootPath = Workspace.instance.rootPath
      const childPath = fileNode.path
      const absPath = path.join(rootPath, childPath)

      const fileContent: FileContent = {
        name: fileNode.name,
        path: fileNode.path,
        content: '',
        encoding: 'raw'
      }

      if (!fs.existsSync(absPath)) {
        fileContent.name += ' -- No Such File'
        return fileContent
      }

      try {
        const content = fs.readFileSync(absPath, { encoding: 'utf-8' })
        fileContent.content = content
        fileContent.encoding = fileNode.name.substring(
          fileNode.name.lastIndexOf('.') + 1
        ) as FileEncodingType
      } catch (err) {
        /* empty */
        console.log('FS readFileSync Error')
      }

      return fileContent
    }
  )
  socket.handle(
    'workspace',
    'saveFile',
    async (event, fileContent: FileContent): Promise<boolean> => {
      // todo : handle other process

      const rootPath = Workspace.instance.rootPath
      const absPath = path.join(rootPath, fileContent.path)

      try {
        fs.writeFileSync(absPath, fileContent.content, { encoding: 'utf-8', flag: 'w' })
        return true
      } catch (err) {
        console.log('fs saveFileSync Error')
        return false
      }
    }
  )
  socket.handle('workspace', 'getRootNode', async (): Promise<FileNode> => {
    const rootPath = Workspace.instance.rootPath
    const name = Workspace.instance.name

    const rootNode: FileNode = {
      name,
      path: '',
      type: 'DIRECTORY',
      children: []
    }

    if (!fs.existsSync(rootPath)) {
      rootNode.name += ' -- No Exist'
      return rootNode
    }

    const getChild = (parent: FileNode, childName: string): FileNode | undefined =>
      parent.children.find((child) => child.name === childName)

    const files = fs.readdirSync(rootPath, { encoding: 'utf-8' })

    for (const file of files) {
      const nodes = file.split('/')
      let history = '.'
      let parent: FileNode = rootNode

      for (const node of nodes) {
        history += '/'
        history += node

        if (!getChild(parent, node))
          parent.children.push({
            name: node,
            path: history,
            type: 'DIRECTORY',
            children: []
          })
        parent = getChild(parent, node)
        parent.type = 'DIRECTORY'
      }

      try {
        parent.type = parent.name.substring(parent.name.lastIndexOf('.') + 1) as FileEncodingType
      } catch (err) {
        if (fs.lstatSync(path.join(rootPath, parent.path)).isFile()) {
          parent.type = 'raw'
        }
      }
    }

    return rootNode
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
      const result: boolean = /^(\/?[a-z0-9A-Z\-]+)+$/.test(directory)
      return result
    }
  )
}
