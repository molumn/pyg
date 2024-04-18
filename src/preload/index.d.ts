import { ElectronAPI } from '@electron-toolkit/preload'
import { ipcRequesters } from '../main/ipc/ipcRequesters'

declare global {
  interface Window {
    electron: ElectronAPI

    windowControl: typeof ipcRequesters.windowControl
    windowStatus: typeof ipcRequesters.windowStatus
    authorization: typeof ipcRequesters.authorization
    workspace: typeof ipcRequesters.workspace
  }
}
