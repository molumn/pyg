import { app, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'

import { initializeAllStores, saveAllStores } from './lib/store'

import { ApplicationHandler } from './structure/application'

import startup from './app/process/startup'
import { handleSockets } from './app/process/handleSockets'

startup(app)

app.whenReady().then(() => {
  electronApp.setAppUserModelId('me.molumn')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  handleSockets()
  ipcMain.on('ping', () => console.log('pong'))

  initializeAllStores()

  ApplicationHandler.createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) ApplicationHandler.createWindow()
  })

  app.on('before-quit', () => {
    saveAllStores()
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
