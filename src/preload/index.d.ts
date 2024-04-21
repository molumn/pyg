import { ElectronAPI } from '@electron-toolkit/preload'
import { ipcRequesters } from '../main/ipc/ipcRequesters'
import { IpcRendererCopy } from '../shared/socket/impl'

declare global {
  interface Window {
    electron: ElectronAPI

    windowControl: typeof ipcRequesters.windowControl
    windowStatus: typeof ipcRequesters.windowStatus
    authorization: typeof ipcRequesters.authorization
    workspace: typeof ipcRequesters.workspace

    borrowRequester: (editor: (ipcRenderer: IpcRendererCopy) => any) => any
  }
}
