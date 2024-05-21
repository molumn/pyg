import fs from 'fs'
import path from 'path'

import { ListenerSocket } from '@common/socket/listen'

import { WorkspaceKey } from '@common/type'

import store from '@lib/store'

import { Workspace } from '@app/structure/workspace'
import { FileContent, FileEncodingType, FileNode } from '@common/workspace/files'

export function registerWorkspaceListener(socket: ListenerSocket): void {
  socket.handle('workspace', 'getCreatedWorkspaces', () => {
    const createdWorkspace: WorkspaceKey[] = []
    store.localStores.workspaceStore.get((store) => {
      for (const key in store.createdWorkspaces) {
        createdWorkspace.push(store.createdWorkspaces[key])
      }
    })
    return createdWorkspace
  })
  socket.on('workspace', 'createWorkspace', (event, _key: WorkspaceKey): boolean => {
    // todo : create workspace
    const key = _key

    key.isExisted = fs.existsSync(key.rootPath)

    return Workspace.createWorkspace(key)
  })
  socket.handle('workspace', 'registerWorkspace', (event, _key: WorkspaceKey): boolean => {
    const key = store.localStores.workspaceStore.get((store) => {
      return store.createdWorkspaces[_key.name]
    })

    if (!key) {
      Workspace.createWorkspace(_key)
    }

    return Workspace.registerWorkspace(_key.name)
  })
  socket.handle('workspace', 'unregisterWorkspace', (): void => {
    Workspace.unregisterWorkspace()
  })
  socket.handle(
    'workspace',
    'readFile',
    async (event, fileNode: FileNode): Promise<FileContent> => {
      const fileContent: FileContent = {
        name: fileNode.name,
        path: fileNode.path,
        content: '',
        encoding: 'raw'
      }

      const workspace = Workspace.instance
      if (!workspace) return fileContent

      const rootPath = workspace.rootPath
      const childPath = fileNode.path
      const absPath = path.join(rootPath, childPath)

      if (!fs.existsSync(absPath)) {
        fileContent.name += ' -- No Such File'
        return fileContent
      }

      try {
        fileContent.content = fs.readFileSync(absPath, { encoding: 'utf-8' })
        fileContent.encoding = fileNode.name.substring(
          fileNode.name.lastIndexOf('.') + 1
        ) as FileEncodingType
      } catch (err) {
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
      const workspace = Workspace.instance
      if (!workspace) return false

      const rootPath = workspace.rootPath
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
  socket.handle('workspace', 'getRootNode', async (): Promise<FileNode | undefined> => {
    const workspace = Workspace.instance
    return workspace?.rootNode
  })
}
