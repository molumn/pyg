import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ipcRequesters } from '../main/ipc/ipcRequesters'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)

    for (const key in ipcRequesters) {
      contextBridge.exposeInMainWorld(key, ipcRequesters[key])
    }
  } catch (error) {
    console.error(error)
  }
} else {
  throw ReferenceError
}
