export type ChannelCategory =
  | 'windowControl'
  | 'windowStatus'
  | 'workspace'
  | 'authentication'
  | 'nodeUtilities'
  | 'event'

export interface CategorizedChannels {
  windowControl: 'onMinimized' | 'onMaximized' | 'onRestore' | 'onClose'
  windowStatus: 'getWindowIsMaximized'
  workspace:
    | 'readFile'
    | 'saveFile'
    | 'createFile'
    | 'createDirectory'
    | 'getCreatedWorkspaces'
    | 'createWorkspace'
    | 'registerWorkspace'
    | 'unregisterWorkspace'
    | 'getRootNode'
  authentication: 'onAuth'
  nodeUtilities: 'null' | 'checkDirectoryIsFree'
  event: 'onWindowContentLoaded' | 'onWindowClosing' | 'onWorkspaceOpen' | 'onWorkspaceClose'
}

export const getChannelString = <Category extends ChannelCategory>(
  category: Category,
  channel: CategorizedChannels[Category]
): string => {
  return `${category}:${channel}`
}
