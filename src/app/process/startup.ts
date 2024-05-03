import { updateElectronApp } from 'update-electron-app'

export default async function startup(app: Electron.App): Promise<void> {
  electron_check_update()
  electron_startup(app)
}

const electron_check_update = (): void => {
  updateElectronApp({
    notifyUser: true
  })
}

const electron_startup = (app: Electron.App): void => {
  if (require('electron-squirrel-startup')) {
    app.quit()
  }
}
