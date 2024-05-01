export default async function startup(app: Electron.App): Promise<void> {
  electron_check_update()
  electron_startup(app)
}

const electron_check_update = (): void => {
  require('update-electron-app')()
}

const electron_startup = (app: Electron.App): void => {
  if (require('electron-squirrel-startup')) {
    app.quit()
  }
}
