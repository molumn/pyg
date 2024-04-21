export type ChannelCategory = 'windowControl' | 'windowStatus' | 'workspace' | 'authentication'

export interface CategorizedChannels {
  windowControl:
    | 'onMinimized'
    | 'onMaximized'
    | 'onRestore'
    | 'onClose'
    | 'onChangeToLogin'
    | 'onChangeToStart'
    | 'onChangeToWorkspace'
  windowStatus: 'getWindowIsMaximized' | 'getWindowType'
  workspace: 'openFile' | 'saveFile' | 'createFile' | 'createDirectory' | 'getCreatedWorkspaces'
  authentication: 'onAuth'
}

export const getChannelString = <Category extends ChannelCategory>(
  category: Category,
  channel: CategorizedChannels[Category]
): string => {
  return `${category}:${channel}`
}
