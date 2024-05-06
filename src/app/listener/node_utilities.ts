import { ListenerSocket } from '@common/socket/listen'

export function registerNodeUtilitiesListener(socket: ListenerSocket): void {
  socket.handle(
    'nodeUtilities',
    'checkDirectoryIsFree',
    async (_, directory: string): Promise<boolean> => {
      const result: boolean = /^(\/?[a-z0-9A-Z-]+)+$/.test(directory)
      return result
    }
  )
}
