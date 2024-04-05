import { ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

import { themeClass } from './utils'

import { EmailLoginForm } from './components/form/EmailLoginForm'

export const LoginPage = (): ReactNode => {
  return (
    <div
      className={twMerge('w-full h-full flex justify-center items-center', themeClass.dust.light)}
    >
      <EmailLoginForm />
    </div>
  )
}
