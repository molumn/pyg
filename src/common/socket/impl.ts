export type EventCopy<Params extends object = {}> = {
  preventDefault: () => void
  readonly defaultPrevented: boolean
} & Params

export interface IpcRendererEventCopy extends EventCopy {
  // ports: MessagePort[]
  sender: IpcRendererCopy
}

export interface SocketSender {
  readonly id: number
}

export interface IpcMainEventCopy extends EventCopy {
  frameId: number
  // ports: MessagePortMain[]
  processId: number
  reply: (channel: string, ...args: any[]) => void
  returnValue: any
  sender: SocketSender
  // readonly senderFrame: WebFrameMain
}

export interface IpcMainInvokeEventCopy extends EventCopy {
  frameId: number
  processId: number
  sender: SocketSender
  // readonly senderFrame: WebFrameMain
}

export interface IpcRendererCopy {
  // addListener(channel: string, listener: (event: IpcRendererEventCopy, ...args: any[]) => void): this
  invoke(channel: string, ...args: any[]): Promise<any>
  off(channel: string, listener: (event: IpcRendererEventCopy, ...args: any[]) => void): this
  on(channel: string, listener: (event: IpcRendererEventCopy, ...args: any[]) => void): this
  once(channel: string, listener: (event: IpcRendererEventCopy, ...args: any[]) => void): this
  // postMessage(channel: string, message: any, transfer?: MessagePort[]): void
  // removeAllListeners(channel: string): this
  // removeListener(channel: string, listener: (event: IpcRendererEventCopy, ...args: any[]) => void): this
  send(channel: string, ...args: any[]): void
  sendSync(channel: string, ...args: any[]): any
  // sendToHost(channel: string, ...args: any[]): void
}

export interface IpcMainCopy {
  handle(
    channel: string,
    listener: (event: IpcMainInvokeEventCopy, ...args: any[]) => Promise<any> | any
  ): void
  handleOnce(
    channel: string,
    listener: (event: IpcMainInvokeEventCopy, ...args: any[]) => Promise<any> | any
  ): void
  on(channel: string, listener: (event: IpcMainEventCopy, ...args: any[]) => void): this
  once(channel: string, listener: (event: IpcMainEventCopy, ...args: any[]) => void): this
  // removeAllListeners(channel?: string): this
  // removeHandler(channel: string): void
  // removeListener(channel: string, listener: (...args: any[]) => void): this
}
