import { updateElectronApp } from 'update-electron-app'

export const electron_check_update = (): void => {
  updateElectronApp({
    notifyUser: true
  })
}

export const electron_startup = (app: Electron.App): void => {
  if (require('electron-squirrel-startup')) {
    app.quit()
  }
}
