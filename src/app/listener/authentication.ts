import { MainProcessSocket } from '@common/socket/main-process'

export function registerAuthenticationListener(socket: MainProcessSocket): void {
  // listener.handle(
  //   'authentication',
  //   'onAuth',
  //   async (_, authInfo: AuthenticationRequest): Promise<AuthenticationResponse> => {
  //     // todo : authentication
  //     return {
  //       result: true,
  //       type: 'SignIn'
  //     }
  //   }
  // )
}
