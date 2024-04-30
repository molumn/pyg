import { IpcMainCopy, IpcMainEventCopy, IpcMainInvokeEventCopy } from './impl'
import { CategorizedChannels, ChannelCategory, getChannelString } from './type'

export class ListenerSocket {
  private ipcMain: IpcMainCopy
  constructor(ipcMain: IpcMainCopy) {
    this.ipcMain = ipcMain
  }

  handle<Category extends ChannelCategory>(
    category: Category,
    channel: CategorizedChannels[Category],
    callback: (event: IpcMainInvokeEventCopy, ...args: any[]) => unknown
  ): this {
    this.ipcMain.handle(getChannelString(category, channel), callback)
    return this
  }

  handleOnce<Category extends ChannelCategory>(
    category: Category,
    channel: CategorizedChannels[Category],
    callback: (event: IpcMainInvokeEventCopy, ...args: any[]) => unknown
  ): this {
    this.ipcMain.handleOnce(getChannelString(category, channel), callback)
    return this
  }

  once<Category extends ChannelCategory>(
    category: Category,
    channel: CategorizedChannels[Category],
    callback: (event: IpcMainEventCopy, ...args: any[]) => unknown
  ): this {
    this.ipcMain.once(getChannelString(category, channel), callback)
    return this
  }

  on<Category extends ChannelCategory>(
    category: Category,
    channel: CategorizedChannels[Category],
    callback: (event: IpcMainEventCopy, ...args: any[]) => unknown
  ): this {
    this.ipcMain.on(getChannelString(category, channel), callback)
    return this
  }
}
