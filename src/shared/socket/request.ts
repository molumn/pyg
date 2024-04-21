import { IpcRendererCopy } from './impl'
import { CategorizedChannels, ChannelCategory, getChannelString } from './type'

export interface IpcRequester {
  borrowRequester: (editor: (ipcRenderer: IpcRendererCopy) => any) => any
}

export class RequesterSocket {
  private requester: IpcRequester
  constructor(requester: IpcRequester) {
    this.requester = requester
  }

  get<ReturnType, Category extends ChannelCategory, Parameters extends any[] = any[]>(
    category: Category,
    channel: CategorizedChannels[Category],
    ...args: Parameters
  ): ReturnType {
    return this.requester.borrowRequester((ipcRenderer) => {
      return ipcRenderer.sendSync(getChannelString(category, channel), ...args)
    })
  }

  request<ReturnType, Category extends ChannelCategory, Parameters extends any[] = any[]>(
    category: Category,
    channel: CategorizedChannels[Category],
    ...args: Parameters
  ): Promise<ReturnType> {
    return this.requester.borrowRequester((ipcRenderer) => {
      return ipcRenderer.invoke(getChannelString(category, channel), ...args)
    })
  }

  command<Category extends ChannelCategory, Parameters extends any[] = any[]>(
    category: Category,
    channel: CategorizedChannels[Category],
    ...args: Parameters
  ): void {
    this.requester.borrowRequester((ipcRenderer) => {
      return ipcRenderer.send(getChannelString(category, channel), ...args)
    })
  }

  on<Category extends ChannelCategory>(
    category: Category,
    channel: CategorizedChannels[Category],
    callback: (...args: any[]) => unknown
  ): this {
    this.requester.borrowRequester((ipcRenderer) => {
      ipcRenderer.on(getChannelString(category, channel), callback)
      return
    })
    return this
  }

  once<Category extends ChannelCategory>(
    category: Category,
    channel: CategorizedChannels[Category],
    callback: (...args: any[]) => unknown
  ): this {
    this.requester.borrowRequester((ipcRenderer) => {
      ipcRenderer.once(getChannelString(category, channel), callback)
      return
    })
    return this
  }
}
