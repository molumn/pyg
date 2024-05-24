import { BrowserWindow } from 'electron'

import { MainProcessSocket } from '@common/socket/main-process'

export function registerWindowStatusListener(socket: MainProcessSocket): void {
  socket.handleWithEvent('window/status/maximized', (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    return win?.isMaximized() === true
  })
}
