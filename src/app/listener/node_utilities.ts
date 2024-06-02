import { dialog } from 'electron'

import { MainProcessSocket } from '@common/socket/main-process'
import { WindowManager } from '@app/structure/window'

export function registerNodeUtilitiesListener(socket: MainProcessSocket): void {
  // socket.handle('', async (_, directory: string): Promise<boolean> => {
  //   // todo : security check
  //   return /^(\/?[a-z0-9A-Z-]+)+$/.test(directory)
  // })
  socket.handle('', async (): Promise<undefined> => undefined)

  socket.handle(
    'util/get/directory',
    async (
      ...properties: (
        | 'openFile'
        | 'openDirectory'
        | 'multiSelections'
        | 'showHiddenFiles'
        | 'createDirectory'
        | 'promptToCreate'
        | 'noResolveAliases'
        | 'treatPackageAsDirectory'
        | 'dontAddToRecent'
      )[]
    ): Promise<string> => {
      if (!WindowManager.current) return ''

      const { canceled, filePaths } = await dialog.showOpenDialog(WindowManager.current?.instance, {
        properties: properties
      })

      if (canceled) return ''
      else {
        console.log('filepaths: ', filePaths)
        return filePaths[0]
      }
    }
  )
}
