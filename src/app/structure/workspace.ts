import fs from 'fs'
import path from 'path'

import store from '../../lib/store'

import { WorkspaceKey, WorkspaceType } from '@common/type'
import { FileNode, getFileType } from '@common/workspace/files'

export class Workspace {
  private static _instance: Workspace | undefined
  static get instance(): Workspace | undefined {
    return this._instance
  }

  static createWorkspace(key?: WorkspaceKey): boolean {
    if (!key) return false
    if (!key.isExisted) {
      // todo : security check
      try {
        fs.mkdirSync(key.rootPath, { recursive: true })
      } catch (e) {
        return false
      }
    } else return false

    const workspaceStore = store.localStores.workspaceStore
    workspaceStore.edit((store) => {
      const workspaces = store.createdWorkspaces
      if (workspaces[key.name]) {
        workspaces[key.name] = key
      }
    })

    return workspaceStore.get((store) => store.createdWorkspaces[key.name]) !== undefined
  }

  static registerWorkspace(nickName: string): boolean {
    const key = store.localStores.workspaceStore.get((store) => {
      return store.createdWorkspaces[nickName]
    })

    if (!key) return false

    this._instance = new Workspace(key.name, key.rootPath, key.type)

    return true
  }

  static unregisterWorkspace(): void {
    this._instance = undefined
  }

  readonly name: string
  readonly rootPath: string
  readonly type: WorkspaceType
  readonly rootNode: FileNode

  private constructor(name: string, rootPath: string, type: WorkspaceType) {
    this.name = name
    this.rootPath = rootPath
    this.type = type

    this.rootNode = {
      name: this.name,
      path: this.rootPath,
      type: 'DIRECTORY',
      children: {}
    }

    const childrenUnderRoot = fs.readdirSync(this.rootPath, { recursive: true, encoding: 'utf-8' })

    for (const child of childrenUnderRoot) {
      const nodes = child.split('/')
      let relpath = '.'
      let lastNode = this.rootNode

      for (const node of nodes) {
        relpath += '/'
        relpath += node
        lastNode.type = 'DIRECTORY'

        const current = lastNode.children[node]
        if (!current) {
          const newCurrent: FileNode = {
            name: node,
            path: relpath,
            type: getFileType(node),
            children: {}
          }

          const lstat = fs.lstatSync(path.join(this.rootPath, child))
          lstat.isDirectory() ? (newCurrent.type = 'DIRECTORY') : {}
          lstat.isFile() ? (newCurrent.type = 'raw') : {}

          lastNode.children[node] = newCurrent
          lastNode = newCurrent
        } else {
          lastNode = current
        }
      }
    }

    // todo : fetch file tree to idNodePair
  }
}
