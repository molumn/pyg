import { BrowserWindow } from 'electron'

import { ListenerSocket } from '@common/socket/listen'

export function registerWindowStatusListener(socket: ListenerSocket): void {
  socket.handle('windowStatus', 'getWindowIsMaximized', (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    return win?.isMaximized() === true
  })
}
