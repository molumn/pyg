import { AuthenticationRequest, AuthenticationResponse } from '../../../common/type'
import { IpcSocket } from '../../../common/socket'

export const login = async (authInfo: AuthenticationRequest): Promise<AuthenticationResponse> => {
  return await IpcSocket.requester.request('authentication', 'onAuth', authInfo)
}
