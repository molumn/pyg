import { IpcMainCopy, IpcMainEventCopy, IpcMainInvokeEventCopy } from './impl'
import { IpcChannelURI } from './type'

export class MainProcessSocket {
  private ipcMain: IpcMainCopy
  constructor(ipcMain: IpcMainCopy) {
    this.ipcMain = ipcMain
  }

  handleWithEvent(channel: IpcChannelURI, callback: (event: IpcMainInvokeEventCopy, ...args: any[]) => unknown): this {
    this.ipcMain.handle(channel, callback)
    return this
  }
  handle(channel: IpcChannelURI, callback: ((...args: any[]) => unknown) | undefined): this {
    if (!callback) return this
    this.ipcMain.handle(channel, (_: IpcMainInvokeEventCopy, ...args) => callback(...args))
    return this
  }
  handleLazy<E>(channel: IpcChannelURI, lazyElement: () => E, callbackWrapper: (lazyElement: E | undefined) => ((...args: any[]) => unknown) | undefined): this {
    this.handle(channel, (...args: any[]): unknown => {
      const callback = callbackWrapper(lazyElement())
      if (callback) callback(...args)
    })
    return this
  }

  onWithEvent(channel: IpcChannelURI, callback: (event: IpcMainEventCopy, ...args: any[]) => unknown): this {
    this.ipcMain.on(channel, callback)
    return this
  }

  on(channel: IpcChannelURI, callback: ((...args: any[]) => unknown) | undefined): this {
    if (!callback) return this
    this.ipcMain.on(channel, (_: IpcMainInvokeEventCopy, ...args) => callback(...args))
    return this
  }

  handleOnce(channel: IpcChannelURI, callback: (event: IpcMainInvokeEventCopy, ...args: any[]) => unknown): this {
    this.ipcMain.handleOnce(channel, callback)
    return this
  }

  once(channel: IpcChannelURI, callback: (event: IpcMainEventCopy, ...args: any[]) => unknown): this {
    this.ipcMain.once(channel, callback)
    return this
  }
}
