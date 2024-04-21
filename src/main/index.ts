import 'dotenv/config.js'

import { app, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'

import { ApplicationHandler } from './handle/application'
import { initializeAllStores, saveAllStores } from './lib/store'
import { prepareSockets } from './process/prepare'

app.whenReady().then(() => {
  electronApp.setAppUserModelId('me.molumn')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  prepareSockets()
  ipcMain.on('ping', () => console.log('pong'))

  initializeAllStores()

  ApplicationHandler.instance.createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) ApplicationHandler.instance.createWindow()
  })

  app.on('before-quit', () => {
    saveAllStores()
  })

  // app.on('login', (event, webContents, authenticationResponseDetails, authInfo, callback) => {
  //   console.log('login')
  // })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
