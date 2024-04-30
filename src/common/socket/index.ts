import { IpcMainCopy } from './impl'
import { ListenerSocket } from './listen'
import { IpcRequester, RequesterSocket } from './request'

export class IpcSocket {
  private static _listener: ListenerSocket | undefined = undefined
  private static _requester: RequesterSocket | undefined = undefined

  static get listener(): ListenerSocket {
    try {
      return this._listener
    } catch (err) {
      console.error(
        'Listener Socket is not initialized! please call IpcSocket.createListener(ipcMain: IpcMainCopy) before calling it'
      )
    }
  }
  static get requester(): RequesterSocket {
    try {
      return this._requester
    } catch (err) {
      console.error(
        'Requester Socket is not initialized! please call IpcSocket.createRequester(ipcRequester: IpcRequester) before calling it'
      )
    }
  }

  static createListener(ipcMain: IpcMainCopy): ListenerSocket {
    this._listener = new ListenerSocket(ipcMain)
    return this.listener
  }
  static createRequester(ipcRequester: IpcRequester): RequesterSocket {
    this._requester = new RequesterSocket(ipcRequester)
    return this.requester
  }
}
