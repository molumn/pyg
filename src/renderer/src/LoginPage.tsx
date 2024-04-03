import { ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

import { themeClass } from './utils'

import { Frame } from './components/Frame'
import { EmailLoginForm } from './components/form/EmailLoginForm'

export const LoginPage = (): ReactNode => {
  return (
    <Frame className={twMerge('flex items-center justify-center', themeClass.dust.heavy)}>
      <div className={'flex flex-col justify-center'}>
        <EmailLoginForm />
      </div>
    </Frame>
  )
}
