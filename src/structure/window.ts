import { join } from 'path'

import { BrowserWindow, BrowserWindowConstructorOptions, shell } from 'electron'
import { is } from '@electron-toolkit/utils'

import { WindowType } from '../common/type'

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
  }
}

export function getBrowserWindowOptions(
  type: WindowType,
  parent?: BrowserWindow
): BrowserWindowConstructorOptions {
  if (type === 'login')
    return {
      minWidth: 800,
      minHeight: 600,
      width: 800,
      height: 600,
      maximizable: false,
      roundedCorners: false,
      ...browserWindowOptions
    }
  else if (type === 'start')
    return {
      minWidth: 1000,
      minHeight: 750,
      width: 1000,
      height: 750,
      ...browserWindowOptions
    }
  else if (type === 'workspace')
    return {
      minWidth: 1000,
      minHeight: 750,
      ...browserWindowOptions
    }
  else if (type === 'popup')
    return {
      width: 400,
      height: 600,
      autoHideMenuBar: true,
      center: true,
      parent
    }
  else return browserWindowOptions
}

class WindowHandler {
  private instance: BrowserWindow
  readonly type: WindowType
  constructor(windowType: WindowType, parent?: WindowHandler) {
    this.type = windowType
    this.instance = new BrowserWindow(getBrowserWindowOptions(windowType, parent?.instance))
  }

  preload(): void {
    this.instance.on('ready-to-show', () => {
      // todo : pass window type
      this.instance.show()
    })

    this.instance.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })
  }

  render(): void {
    if (is.dev && MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      this.instance.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}#${this.type}`)
    } else {
      this.instance.loadURL(
        `file://${join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html#${this.type}`)}`
      )
    }
  }

  close(): void {
    // this.instance.webContents.send('beforeClose')
    this.instance.close()
  }
}

export class WindowManager {
  static readonly instance: WindowManager = new WindowManager()

  private main: WindowHandler | null = null
  get mainType(): WindowType {
    return this.main?.type ?? 'login'
  }

  display(): void {
    if (this.main) this.main.render()
  }

  switch(type: WindowType): void {
    if (this.main) this.main.close()
    this.main = new WindowHandler(type)
    this.main.preload()
  }

  static createWindowInstance(options: BrowserWindowConstructorOptions = {}): BrowserWindow {
    return new BrowserWindow(options)
  }
}
