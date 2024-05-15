import { WindowManager } from './window'

export class ApplicationHandler {
  static createWindow(): void {
    // todo : search for loaded workspace and send to renderer
    WindowManager.registerMainInstance()
    WindowManager.display()
  }
}
