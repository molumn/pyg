import { WindowType, WorkspaceKey } from '../common/type'

import { WindowManager } from './window'
import { Workspace } from './workspace'

export class ApplicationHandler {
  static get applicationRunningType(): WindowType {
    return WindowManager.instance.mainType ?? 'login'
  }

  static createWindow(): void {
    // todo : decide what type of window will be displayed
    WindowManager.instance.switch('login')
    WindowManager.instance.display()
  }

  static changeToLoginWindow(): void {
    WindowManager.instance.switch('login')
    WindowManager.instance.display()
  }

  static changeToStartWindow(): void {
    WindowManager.instance.switch('start')
    WindowManager.instance.display()
  }

  static changeToWorkspaceWindow(workspaceKey?: WorkspaceKey): void {
    if (!workspaceKey) Workspace.createDemo('demo')
    else Workspace.createWorkspace(workspaceKey)
    Workspace.findAndApplyWorkspace(workspaceKey?.name ?? 'demo')

    WindowManager.instance.switch('workspace')
    WindowManager.instance.display()
  }
}
