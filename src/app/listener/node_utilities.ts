import { MainProcessSocket } from '@common/socket/main-process'

export function registerNodeUtilitiesListener(socket: MainProcessSocket): void {
  // socket.handle('', async (_, directory: string): Promise<boolean> => {
  //   // todo : security check
  //   return /^(\/?[a-z0-9A-Z-]+)+$/.test(directory)
  // })
  socket.handle('', async (): Promise<undefined> => undefined)
}
