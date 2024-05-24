import { join } from 'path'

import { BrowserWindow, BrowserWindowConstructorOptions, shell } from 'electron'
import { is } from '@electron-toolkit/utils'
import { IpcWebContentSocket } from '@common/socket/webcontent-process'
import { IpcSocket } from '@common/socket'

const browserWindowOptions: BrowserWindowConstructorOptions = {
  show: false,
  autoHideMenuBar: true,
  frame: process.platform === 'darwin',
  center: true,
  title: 'Plan Your Game',
  vibrancy: 'under-window',
  visualEffectState: 'active',
  titleBarStyle: 'hidden',
  trafficLightPosition: { x: 15, y: 10 },
  // ...(process.platform === 'linux' ? { icon } : {}),
  webPreferences: {
    preload: join(__dirname, 'preload.js'),
    sandbox: false,
    contextIsolation: true
  },

  // minWidth: 1960,
  // minHeight: 1200,
  width: 1960,
  height: 1200,
  modal: true
}

class WindowHandler {
  private instance: BrowserWindow
  private commander: IpcWebContentSocket
  constructor() {
    this.instance = new BrowserWindow(browserWindowOptions)
    this.commander = IpcSocket.createIpcWebContentRequester(this.instance.webContents)
  }

  preload(): void {
    this.instance.on('ready-to-show', () => {
      this.instance.show()
      this.commander.command('onWindowContentLoaded')
    })

    this.instance.on('close', (): void => {
      this.commander.command('onWorkspaceClose')
      this.commander.command('onWindowClosing')
    })

    this.instance.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })
  }

  render(): void {
    if (is.dev && MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      this.instance.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}`)
    } else {
      // this.instance.loadURL(
      //   `file://${join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)}`
      // )
      this.instance.loadFile(join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
    }
  }

  close(): void {
    // todo : socket send before close
    this.instance.close()
  }
}

export class WindowManager {
  private static main: WindowHandler | null = null

  static display(): void {
    if (this.main) this.main.render()
  }

  static registerMainInstance(): void {
    if (!this.main) this.main = new WindowHandler()
    this.main.preload()
  }

  static createWindowInstance(options: BrowserWindowConstructorOptions = {}): BrowserWindow {
    return new BrowserWindow(options)
  }
}
