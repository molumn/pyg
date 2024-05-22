import { IpcMainCopy, IpcWebContentCopy } from '@common/socket/impl'
import { MainProcessSocket } from '@common/socket/main-process'
import { IpcRendererUnit, RendererSocket } from '@common/socket/renderer-process'
import { IpcWebContentSocket } from '@common/socket/webcontent-process'

export class IpcSocket {
  private static _ipcMain: MainProcessSocket | undefined = undefined
  private static _ipcRenderer: RendererSocket | undefined = undefined

  static createIpcWebContentRequester(webContents: IpcWebContentCopy): IpcWebContentSocket {
    return new IpcWebContentSocket(webContents)
  }

  static get ipcMain(): MainProcessSocket {
    if (this._ipcMain) return this._ipcMain
    else {
      console.error(
        'Listener Socket is not initialized! please call IpcSocket.createListener(ipcMain: IpcMain) before calling it'
      )
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      return
    }
  }
  static get ipcRenderer(): RendererSocket {
    if (this._ipcRenderer) return this._ipcRenderer
    else {
      console.error(
        'Requester Socket is not initialized! please call IpcSocket.createRequester(ipcRequester: IpcRequester) before calling it'
      )
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      return
    }
  }

  static createIpcMainUnit(ipcMain: IpcMainCopy): MainProcessSocket {
    this._ipcMain = new MainProcessSocket(ipcMain)
    return this.ipcMain
  }
  static createIpcRendererUnit(ipcRequester: IpcRendererUnit): RendererSocket {
    this._ipcRenderer = new RendererSocket(ipcRequester)
    return this.ipcRenderer
  }
}
