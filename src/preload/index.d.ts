import { ElectronAPI } from '@electron-toolkit/preload'
import {
  AuthorizationIpcRequesters,
  WindowControlIpcRequesters,
  WindowStatusIpcRequesters
} from '../main/ipc/requesters'

declare global {
  interface Window {
    electron: ElectronAPI

    windowControl: typeof WindowControlIpcRequesters
    windowStatus: typeof WindowStatusIpcRequesters
    authorization: typeof AuthorizationIpcRequesters
  }
}
