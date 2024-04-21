import { contextBridge, ipcRenderer, IpcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld(
      'borrowRequester',
      (callback: (ipcRenderer: IpcRenderer) => any): any => {
        return callback(ipcRenderer)
      }
    )
  } catch (error) {
    console.error(error)
  }
} else {
  throw ReferenceError
}
