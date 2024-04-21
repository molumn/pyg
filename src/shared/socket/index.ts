import { IpcMainCopy } from './impl'
import { ListenerSocket } from './listen'
import { IpcRequester, RequesterSocket } from './request'

export class Socket {
  static listener(ipcMain: IpcMainCopy): ListenerSocket {
    return new ListenerSocket(ipcMain)
  }
  static requester(ipcRequester: IpcRequester): RequesterSocket {
    return new RequesterSocket(ipcRequester)
  }
}
