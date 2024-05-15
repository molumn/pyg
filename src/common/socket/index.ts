import { IpcMainCopy } from './impl'
import { ListenerSocket } from './listen'
import { IpcRequester, RequesterSocket } from './request'

export class IpcSocket {
  private static _listener: ListenerSocket | undefined = undefined
  private static _requester: RequesterSocket | undefined = undefined

  static get listener(): ListenerSocket {
    if (this._listener) return this._listener
    else {
      console.error(
        'Listener Socket is not initialized! please call IpcSocket.createListener(ipcMain: IpcMain) before calling it'
      )
      //@ts-ignore
      return
    }
  }
  static get requester(): RequesterSocket {
    if (this._requester) return this._requester
    else {
      console.error(
        'Requester Socket is not initialized! please call IpcSocket.createRequester(ipcRequester: IpcRequester) before calling it'
      )
      //@ts-ignore
      return
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
