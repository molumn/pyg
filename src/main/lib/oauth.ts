import { ApplicationHandler } from '../handle/application'

export const loginWithGoogle = async () => {
  ApplicationHandler.instance.popupWindow('https://accounts.google.com/o/oauth2/v2/auth?' +
    'scope=email%20profile&' +
    'response_type=code&' +
    'redirect_uri=http://[::1]:3000&' +
    `client_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}`
  )
  // todo : wait for popup finish ?
}

export const loginWithGithub = async () => {
  // todo
}

export const loginWithEmail = async (email: string, password: string) => {
  // todo
}
