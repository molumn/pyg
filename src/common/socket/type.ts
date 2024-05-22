export type MainToWindowEvent =
  | 'onWindowContentLoaded'
  | 'onWindowClosing'
  | 'onWorkspaceOpen'
  | 'onWorkspaceClose'

export type IpcChannelURI =
  | 'authentication/login'
  | 'window/control/close'
  | 'window/control/minimize'
  | 'window/control/restore'
  | 'window/control/maximize'
  | 'window/status/maximized'
  | 'workspace/create'
  | 'workspace/open'
  | 'workspace/close'
  | 'workspace/file/read'
  | 'workspace/file/save'
  | 'workspace/file/create'
  | 'workspace/directory/create'
  | 'workspace/list/created'
  | 'workspace/root'
  | 'workspace/'
  | ''

export const getChannelString = (event: MainToWindowEvent): string => {
  return `main-to-window-event:${event}`
}
