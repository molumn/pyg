export type WindowType =
  | 'start'
  | 'workspace'
  | 'login'
  | 'popup'

export type AuthenticationRequest = {
  req: {
    type: 'SignIn' | 'SignUp' | 'SignInWithCredentials'
  }
} & ({
  email: string,
  password: string,
} | {
  type: 'google' | 'github'
})
export type AuthenticationResponse = {
  type: 'SignIn' | 'SignUp' | 'SignInWithCredentials'
  result: boolean
}
