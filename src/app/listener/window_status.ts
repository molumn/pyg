import { BrowserWindow } from 'electron'

import { MainProcessSocket } from '@common/socket/main-process'

export function registerWindowStatusListener(socket: MainProcessSocket): void {
  socket.handle('windowStatus', 'getWindowIsMaximized', (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    return win?.isMaximized() === true
  })
}
