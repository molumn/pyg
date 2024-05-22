import { BrowserWindow } from 'electron'

import { MainProcessSocket } from '@common/socket/main-process'

export function registerWindowControlListener(socket: MainProcessSocket): void {
  socket.on('window/control/minimize', (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    if (!win) return
    win.minimize()
  })

  socket.on('window/control/maximize', (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    if (!win) return
    win.maximize()
  })

  socket.on('window/control/restore', (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    if (!win) return
    win.restore()
  })

  socket.on('window/control/close', (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    if (!win) return
    win.close()
  })
}
