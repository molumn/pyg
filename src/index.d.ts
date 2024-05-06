import { IpcRendererCopy } from '../shared/listener/impl'
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    borrowRequester: (editor: (ipcRenderer: IpcRendererCopy) => any) => any
  }
}
