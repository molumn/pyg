import { WindowType } from '../../shared/types'
import { WindowManager } from './window'

export class ApplicationHandler {
  static readonly instance: ApplicationHandler = new ApplicationHandler()

  get windowType(): WindowType {
    return WindowManager.instance.mainType
  }

  createWindow(): void {
    // todo : decide what type of window will be displayed
    WindowManager.instance.switch('login')
    WindowManager.instance.display()
  }

  changeWindow(type: WindowType): void {
    WindowManager.instance.switch(type)
    WindowManager.instance.display()
  }

  popupWindow(url: string): void {
    WindowManager.instance.child(url)
  }
}
