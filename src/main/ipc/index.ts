import { ipcMain } from 'electron'
import { IpcAPI } from '../../shared/ipcChannel'
import { applicationHandler } from '../properties'

const ipcCallbacks: IpcAPI = {
  'request-window-type': () => {
    return applicationHandler.mainWindowType
  },
  'set-window-type': (_, type) => {
    applicationHandler.applyWindowType(type)
    console.log(applicationHandler.mainWindowType)
  }
}

export function registerAllIpcCallbacks(): void {
  for (const channel in ipcCallbacks) {
    ipcMain.handle(channel, ipcCallbacks[channel])
  }
}
