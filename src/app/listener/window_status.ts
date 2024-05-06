import { BrowserWindow } from 'electron'

import { ListenerSocket } from '@common/socket/listen'

import { ApplicationHandler } from '@app/structure/application'

export function registerWindowStatusListener(socket: ListenerSocket): void {
  socket.handle('windowStatus', 'getWindowIsMaximized', (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    return win?.isMaximized() === true
  })

  socket.handle('windowStatus', 'getWindowType', () => {
    return ApplicationHandler.applicationRunningType
  })
}
