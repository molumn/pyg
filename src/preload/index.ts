import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

import { ipcRenderer } from 'electron'

import { IpcChannel, IpcParameter } from "../shared/ipcChannel";

function ipc<Channel extends IpcChannel>(channel: Channel, ...args: IpcParameter[Channel][0]): Promise<IpcParameter[Channel][1]> {
  return ipcRenderer.invoke(channel, ...args)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('ipc', ipc)
    contextBridge.exposeInMainWorld('register', {
      on: (channel: string, callback: (...args: unknown[]) => void) => ipcRenderer.on(channel, (_, ...args) => callback(...args)),
      remove: (channel: string, callback: (...args: unknown[]) => void) => ipcRenderer.removeListener(channel, (_, ...args) => callback(...args))
    })
  } catch (error) {
    console.error(error)
  }
} else {
  throw ReferenceError
}
