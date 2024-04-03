import { ElectronAPI } from '@electron-toolkit/preload'
import { IpcRequest } from '../shared/ipcChannel'

declare global {
  interface Window {
    electron: ElectronAPI,
    ipc: IpcRequest,
    register: {
      on: (channel: string, callback: (...args: unknown[]) => void) => void,
      remove: (channel: string, callback: (...args: unknown[]) => void) => void
    }
  }
}
