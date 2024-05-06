import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'

import store from '@lib/store'

import { ApplicationHandler } from '@app/structure/application'

import { handle, preinit } from '@app/process'

preinit.electron_check_update()
preinit.electron_startup(app)

app.whenReady().then(() => {
  electronApp.setAppUserModelId('me.molumn')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  handle.handleSockets()

  store.init()

  ApplicationHandler.createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) ApplicationHandler.createWindow()
  })

  app.on('before-quit', () => {
    store.save()
  })

  // app.on('login', (event, webContents, authenticationResponseDetails, authInfo, callback) => {
  //   console.log('login')
  // })
})

app.setAsDefaultProtocolClient('pyg-protocol')

app.on('open-url', (_, url: string) => {
  console.log(url)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
