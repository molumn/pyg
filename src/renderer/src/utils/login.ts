import { AuthenticationRequest, AuthenticationResponse } from '../../../shared/types'
import { Socket } from '../../../shared/socket'

export const login = async (authInfo: AuthenticationRequest): Promise<AuthenticationResponse> => {
  const socket = Socket.requester(window)
  return await socket.request('authentication', 'onAuth', authInfo)
}
