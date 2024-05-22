import { MainProcessSocket } from '@common/socket/main-process'

export function registerNodeUtilitiesListener(socket: MainProcessSocket): void {
  socket.handle(
    'nodeUtilities',
    'checkDirectoryIsFree',
    async (_, directory: string): Promise<boolean> => {
      // todo : security check
      return /^(\/?[a-z0-9A-Z-]+)+$/.test(directory)
    }
  )
  socket.handle('nodeUtilities', 'null', async (): Promise<undefined> => undefined)
}
