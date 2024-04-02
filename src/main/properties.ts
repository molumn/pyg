import icon from '../../resources/icon.png?asset'

import { join } from 'path'

import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import { WindowType } from "../shared/types";

export const applicationHandler = new class ApplicationHandler {
  private static _mainWindow: BrowserWindow
  public get mainWindow(): BrowserWindow { return ApplicationHandler._mainWindow }

  private static _mainWindowType: WindowType
  public get mainWindowType(): WindowType { return ApplicationHandler._mainWindowType }


  applyWindow() {
    const typeAndOptions = getWindowTypeAndBrowserWindowOptions()
    ApplicationHandler._mainWindowType = typeAndOptions[0]
    ApplicationHandler._mainWindow = new BrowserWindow(typeAndOptions[1])
  }
  applyWindowType(type: WindowType) {
    ApplicationHandler._mainWindowType = type
  }
}()



const browserWindowOptions: BrowserWindowConstructorOptions = {
  show: false,
  autoHideMenuBar: true,
  frame: false,
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

export function getWindowTypeAndBrowserWindowOptions(): [WindowType, BrowserWindowConstructorOptions] {
  // todo : load configurations and check appropriate option
  return [
    'login',
    {
      width: 970,
      height: 600,
      ...browserWindowOptions
    }
  ]
}
