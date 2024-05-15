import { BrowserWindow } from 'electron'

import { ListenerSocket } from '@common/socket/listen'

export function registerWindowControlListener(socket: ListenerSocket): void {
  socket.on('windowControl', 'onMinimized', (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    if (!win) return
    win.minimize()
  })

  socket.on('windowControl', 'onMaximized', (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    if (!win) return
    win.maximize()
  })

  socket.on('windowControl', 'onRestore', (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    if (!win) return
    win.restore()
  })

  socket.on('windowControl', 'onClose', (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    if (!win) return
    win.close()
  })
}
