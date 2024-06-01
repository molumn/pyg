import { IpcRendererCopy } from './impl'
import { getChannelString, IpcChannelURI, MainToWindowEvent } from './type'

export interface IpcRendererUnit {
  borrowRequester: (editor: (ipcRenderer: IpcRendererCopy) => any) => any
}

export class RendererSocket {
  private ipcUnit: IpcRendererUnit
  constructor(ipcUnit: IpcRendererUnit) {
    this.ipcUnit = ipcUnit
  }

  get<ReturnType, Parameters extends any[] = any[]>(channel: IpcChannelURI, ...args: Parameters): ReturnType {
    return this.ipcUnit.borrowRequester((ipcUnit) => {
      return ipcUnit.sendSync(channel, ...args)
    })
  }

  request<ReturnType, Parameters extends any[] = any[]>(channel: IpcChannelURI, ...args: Parameters): ReturnType {
    return this.ipcUnit.borrowRequester((ipcUnit) => {
      return ipcUnit.invoke(channel, ...args)
    })
  }

  command<ReturnType, Parameters extends any[] = any[]>(channel: IpcChannelURI, ...args: Parameters): ReturnType {
    return this.ipcUnit.borrowRequester((ipcUnit) => {
      return ipcUnit.send(channel, ...args)
    })
  }

  on(channel: MainToWindowEvent, callback: (...args: any[]) => unknown): this {
    this.ipcUnit.borrowRequester((ipcUnit) => {
      ipcUnit.on(getChannelString(channel), callback)
      return
    })
    return this
  }

  once(channel: MainToWindowEvent, callback: (...args: any[]) => unknown): this {
    this.ipcUnit.borrowRequester((ipcUnit) => {
      ipcUnit.once(getChannelString(channel), callback)
      return
    })
    return this
  }
}
