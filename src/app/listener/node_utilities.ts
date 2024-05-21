import { ListenerSocket } from '@common/socket/listen'

export function registerNodeUtilitiesListener(socket: ListenerSocket): void {
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
