import { WindowType } from '../../shared/types'
import { WindowManager } from './window'
import { Workspace, WorkspaceKey } from './workspace'

export class ApplicationHandler {
  static readonly instance: ApplicationHandler = new ApplicationHandler()

  get windowType(): WindowType {
    return WindowManager.instance.mainType
  }

  createWindow(): void {
    // todo : decide what type of window will be displayed
    WindowManager.instance.switch('start')
    WindowManager.instance.display()
  }

  changeToLoginWindow(): void {
    WindowManager.instance.switch('login')
    WindowManager.instance.display()
  }

  changeToStartWindow(): void {
    WindowManager.instance.switch('start')
    WindowManager.instance.display()
  }

  changeToWorkspaceWindow(workspaceKey?: WorkspaceKey): void {
    if (!workspaceKey) Workspace.createAndApplyDemo('demo')
    else Workspace.createAndApplyWorkspace(workspaceKey)

    WindowManager.instance.switch('workspace')
    WindowManager.instance.display()
  }

  popupWindow(url: string): void {
    WindowManager.instance.child(url)
  }
}
