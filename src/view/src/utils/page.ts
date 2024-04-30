export const windowPage = {
  isLoginPage: window.location.hash.startsWith('#login'),
  isStartPagePage: window.location.hash.startsWith('#start'),
  isWorkspacePage: window.location.hash.startsWith('#workspace')
}
