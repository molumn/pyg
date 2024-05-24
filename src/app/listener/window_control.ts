import { BrowserWindow } from 'electron'

import { MainProcessSocket } from '@common/socket/main-process'

export function registerWindowControlListener(socket: MainProcessSocket): void {
  socket.onWithEvent('window/control/minimize', (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    if (!win) return
    win.minimize()
  })

  socket.onWithEvent('window/control/maximize', (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    if (!win) return
    win.maximize()
  })

  socket.onWithEvent('window/control/restore', (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    if (!win) return
    win.restore()
  })

  socket.onWithEvent('window/control/close', (event) => {
    const win = BrowserWindow.fromId(event.sender.id)
    if (!win) return
    win.close()
  })
}
