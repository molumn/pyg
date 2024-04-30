import { IpcRendererCopy } from '../shared/socket/impl'
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    borrowRequester: (editor: (ipcRenderer: IpcRendererCopy) => any) => any
  }
}
