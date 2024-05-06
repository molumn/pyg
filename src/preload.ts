import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { IpcRendererCopy } from '@common/socket/impl'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld(
      'borrowRequester',
      (callback: (ipcRenderer: IpcRendererCopy) => any): any => {
        const wrapper: IpcRendererCopy = {
          invoke: ipcRenderer.invoke,
          off: ipcRenderer.off,
          on: ipcRenderer.on,
          once: ipcRenderer.once,
          send: ipcRenderer.send,
          sendSync: ipcRenderer.sendSync
        }
        return callback(wrapper)
      }
    )
  } catch (error) {
    console.error(error)
  }
} else {
  throw ReferenceError
}
