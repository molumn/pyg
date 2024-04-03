import { join } from 'path'

import { app, BrowserWindow, shell, ipcMain } from 'electron'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'

import { applicationHandler } from './properties'
import { registerAllIpcCallbacks } from './ipc'

function loadWindow(): void {
  applicationHandler.applyWindow()

  const window = applicationHandler.mainWindow

  window.on('ready-to-show', () => {
    // todo : pass window type
    window.show()
  })

  window.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    window.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    window.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('me.molumn')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))
  registerAllIpcCallbacks()

  loadWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) loadWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
