import { IpcMainCopy, IpcMainInvokeEventCopy } from './impl'
import { IpcChannelURI } from './type'

export class MainProcessSocket {
  private ipcMain: IpcMainCopy
  constructor(ipcMain: IpcMainCopy) {
    this.ipcMain = ipcMain
  }

  handle(
    channel: IpcChannelURI,
    callback: (event: IpcMainInvokeEventCopy, ...args: any[]) => unknown
  ): this {
    this.ipcMain.handle(channel, callback)
    return this
  }

  handleOnce(
    channel: IpcChannelURI,
    callback: (event: IpcMainInvokeEventCopy, ...args: any[]) => unknown
  ): this {
    this.ipcMain.handleOnce(channel, callback)
    return this
  }

  once(
    channel: IpcChannelURI,
    callback: (event: IpcMainInvokeEventCopy, ...args: any[]) => unknown
  ): this {
    this.ipcMain.once(channel, callback)
    return this
  }

  on(
    channel: IpcChannelURI,
    callback: (event: IpcMainInvokeEventCopy, ...args: any[]) => unknown
  ): this {
    this.ipcMain.on(channel, callback)
    return this
  }
}
