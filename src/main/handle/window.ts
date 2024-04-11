import icon from '../../../resources/icon.png?asset'

import { BrowserWindow, BrowserWindowConstructorOptions, shell } from 'electron'
import { WindowType } from '../../shared/types'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

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
  ...(process.platform === 'linux' ? { icon } : {}),
  webPreferences: {
    preload: join(__dirname, '../preload/index.js'),
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
  private readonly url: string | undefined
  constructor(windowType: WindowType, url?: string, parent?: WindowHandler) {
    this.type = windowType
    this.instance = new BrowserWindow(getBrowserWindowOptions(windowType, parent?.instance))
    this.url = url
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
    if (this.url) {
      try {
        this.instance.loadURL(this.url)
      } catch (err) {
        this.instance.loadURL('about:blank')
      }
    } else if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      this.instance.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/#${this.type}`)
    } else {
      this.instance.loadFile(join(__dirname, `../renderer/index.html/#${this.type}`))
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

  private childWindow: WindowHandler | null = null

  display(): void {
    if (this.main) this.main.render()
  }

  switch(type: WindowType): void {
    if (this.main) this.main.close()
    this.main = new WindowHandler(type)
    this.main.preload()
  }

  child(url: string): void {
    if (!this.main) return
    this.childWindow = new WindowHandler('popup', url, this.main)
    this.childWindow.preload()
    this.childWindow.render()
  }
}
