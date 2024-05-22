import { IpcWebContentCopy } from '@common/socket/impl'
import { CategorizedChannels, getChannelString } from '@common/socket/type'

export class IpcWebContentSocket {
  private webContents: IpcWebContentCopy
  constructor(webContent: IpcWebContentCopy) {
    this.webContents = webContent
  }

  command(event: CategorizedChannels['event'], ...args: any[]): this {
    this.webContents.send(getChannelString('event', event), ...args)
    return this
  }
}
