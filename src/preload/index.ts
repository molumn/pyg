import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import {
  AuthorizationIpcRequesters,
  WindowControlIpcRequesters,
  WindowStatusIpcRequesters
} from '../main/ipc/requesters'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)

    contextBridge.exposeInMainWorld('windowControl', WindowControlIpcRequesters)
    contextBridge.exposeInMainWorld('windowStatus', WindowStatusIpcRequesters)
    contextBridge.exposeInMainWorld('authorization', AuthorizationIpcRequesters)
  } catch (error) {
    console.error(error)
  }
} else {
  throw ReferenceError
}
