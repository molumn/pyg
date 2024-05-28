import path from 'path'
import { app } from 'electron'

import { WindowManager } from './window'
import { Workspace } from '@app/structure/workspace'

export class ApplicationHandler {
  static createWindow(): void {
    // fixme: remove
    Workspace.createWorkspace({
      name: 'demo',
      type: 'demo',
      rootPath: path.join(app.getPath('userData'), 'defaults/demo-workspaces/demo'),
      isExisted: true
    })
    Workspace.registerWorkspace('demo')

    // todo : search for loaded workspace and send to renderer
    WindowManager.registerMainInstance()
    WindowManager.display()
  }
}
