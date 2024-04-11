import { AuthenticationRequest, AuthenticationResponse } from '../../../shared/types'

export const login = async (authInfo: AuthenticationRequest): Promise<AuthenticationResponse> => {
  return await window.ipc('request-user-authentication', authInfo)
}
