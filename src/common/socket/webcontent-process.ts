import { IpcWebContentCopy } from '@common/socket/impl'
import { getChannelString, MainToWindowEvent } from '@common/socket/type'

export class IpcWebContentSocket {
  private webContents: IpcWebContentCopy
  constructor(webContent: IpcWebContentCopy) {
    this.webContents = webContent
  }

  command(event: MainToWindowEvent, ...args: any[]): this {
    this.webContents.send(getChannelString(event), ...args)
    return this
  }
}
