import 'dotenv/config.js'

import { app, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'

import { registerAllIpcCallbacks } from './ipc'

import { ApplicationHandler } from './handle/application'

app.whenReady().then(() => {
  electronApp.setAppUserModelId('me.molumn')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))
  registerAllIpcCallbacks()

  ApplicationHandler.instance.createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) ApplicationHandler.instance.createWindow()
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
