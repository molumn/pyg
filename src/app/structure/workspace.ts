import path, { join } from 'path'
import fs, { mkdirSync } from 'fs'

import { app } from 'electron'

import store from '../../lib/store'

import { WorkspaceKey, WorkspaceType } from '@common/type'

export class Workspace {
  private static get _demo(): Workspace {
    const demo = new Workspace(
      'demo',
      join(app.getPath('userData'), 'defaults/demo-workspaces/demo'),
      'demo'
    )
    Workspace.createDemo(demo.name)
    return demo
  }

  private static _instance: Workspace | undefined
  static get instance(): Workspace {
    return this._instance ?? this._demo
  }

  static createDemo(name: string): void {
    const workspaceRoot: string = join(app.getPath('userData'), `defaults/demo-workspaces/${name}`)
    mkdirSync(workspaceRoot, { recursive: true })

    // create WELCOME.md
    fs.writeFileSync(path.join(workspaceRoot, 'WELCOME.md'), '# WELCOME TO DEMO WORKSPACE', {
      flag: 'w',
      encoding: 'utf-8'
    })
    //

    store.localStores.workspaceStore.edit((store) => {
      store.createdWorkspaces[name] = {
        name,
        rootPath: workspaceRoot,
        type: 'demo',
        isExisted: true
      }
    })
  }

  static createWorkspace(key?: WorkspaceKey): void {
    if (!key) return
    if (!key.isExisted) mkdirSync(key.rootPath, { recursive: true })
    store.localStores.workspaceStore.edit((store) => {
      store.createdWorkspaces[key.name] = key
    })
  }

  static findAndApplyWorkspace(workspaceNickname: string): void {
    const key = store.localStores.workspaceStore.get((store) => {
      return store.createdWorkspaces[workspaceNickname]
    })
    if (!key) {
      this._instance = this._demo
      return
    }
    this._instance = new Workspace(key.name, key.rootPath, key.type)
  }

  readonly name: string
  readonly rootPath: string
  readonly type: WorkspaceType

  constructor(name: string, rootPath: string, type: WorkspaceType) {
    this.name = name
    this.rootPath = rootPath
    this.type = type
    // this.idNodePair = {}

    // todo : fetch file tree to idNodePair
  }
}
