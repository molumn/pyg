import { ApplicationHandler } from '../handle/application'
import { AuthenticationResponse } from '../../shared/types'

export const loginWithGoogle = async (): Promise<AuthenticationResponse> => {
  ApplicationHandler.instance.popupWindow(
    'https://accounts.google.com/o/oauth2/v2/auth?' +
      'scope=email%20profile&' +
      'response_type=code&' +
      'redirect_uri=http://[::1]:3000/start&' +
      `client_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}`
  )
  // todo : wait for popup finish ?
  return {
    result: true,
    type: 'SignIn'
  }
}

export const loginWithGithub = async (): Promise<AuthenticationResponse> => {
  // todo
  return {
    result: true,
    type: 'SignIn'
  }
}

export const loginWithEmail = async (email: string, password: string): Promise<AuthenticationResponse> => {
  // todo
  return {
    result: true,
    type: 'SignIn'
  }
}
