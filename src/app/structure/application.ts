import { WindowManager } from './window'
import { Workspace } from '@app/structure/workspace'

export class ApplicationHandler {
  static createWindow(): void {
    // fixme: remove
    Workspace.createWorkspace({
      name: 'demo',
      type: 'demo',
      rootPath: 'C:\\Users\\stude\\AppData\\Roaming\\pyg\\defaults\\demo-workspaces\\demo',
      isExisted: true
    })

    // todo : search for loaded workspace and send to renderer
    WindowManager.registerMainInstance()
    WindowManager.display()
  }
}
