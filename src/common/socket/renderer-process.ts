import { IpcRendererCopy } from './impl'
import { CategorizedChannels, ChannelCategory, getChannelString } from './type'

export interface IpcRendererUnit {
  borrowRequester: (editor: (ipcRenderer: IpcRendererCopy) => any) => any
}

export class RendererSocket {
  private ipcUnit: IpcRendererUnit
  constructor(ipcUnit: IpcRendererUnit) {
    this.ipcUnit = ipcUnit
  }

  get<ReturnType, Category extends ChannelCategory, Parameters extends any[] = any[]>(
    category: Category,
    channel: CategorizedChannels[Category],
    ...args: Parameters
  ): ReturnType {
    return this.ipcUnit.borrowRequester((ipcUnit) => {
      return ipcUnit.sendSync(getChannelString(category, channel), ...args)
    })
  }

  request<ReturnType, Category extends ChannelCategory, Parameters extends any[] = any[]>(
    category: Category,
    channel: CategorizedChannels[Category],
    ...args: Parameters
  ): Promise<ReturnType> {
    return this.ipcUnit.borrowRequester((ipcUnit) => {
      return ipcUnit.invoke(getChannelString(category, channel), ...args)
    })
  }

  command<Category extends ChannelCategory, Parameters extends any[] = any[]>(
    category: Category,
    channel: CategorizedChannels[Category],
    ...args: Parameters
  ): void {
    this.ipcUnit.borrowRequester((ipcUnit) => {
      return ipcUnit.send(getChannelString(category, channel), ...args)
    })
  }

  on(channel: CategorizedChannels['event'], callback: (...args: any[]) => unknown): this {
    this.ipcUnit.borrowRequester((ipcUnit) => {
      ipcUnit.on(getChannelString('event', channel), callback)
      return
    })
    return this
  }

  once(channel: CategorizedChannels['event'], callback: (...args: any[]) => unknown): this {
    this.ipcUnit.borrowRequester((ipcUnit) => {
      ipcUnit.once(getChannelString('event', channel), callback)
      return
    })
    return this
  }
}
