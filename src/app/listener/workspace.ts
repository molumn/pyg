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
  socket.on('workspace', 'createWorkspace', (event, key: WorkspaceKey) => {
    // todo
  })
  socket.on('workspace', 'createDemo', () => {
    // todo
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
  socket.handle('workspace', 'getRootNode', async (): Promise<FileNode | null> => {
    const workspace = Workspace.instance
    if (!workspace) return null

    const rootPath = workspace.rootPath
    const name = workspace.name

    const rootNode: FileNode = {
      name: '',
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

        const childOrNull = getChild(parent, node)
        if (!childOrNull) {
          const newChild: FileNode = {
            name: node,
            path: history,
            type: 'DIRECTORY',
            children: []
          }
          parent.children.push(newChild)
          parent = newChild
        } else {
          parent = childOrNull
        }
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
}
