import { ReactNode } from 'react'

import { CentralizedDiv } from './utils/class/Layout'
import { twMerge } from 'tailwind-merge'
import { themeClass } from './utils'
import { EmailLoginForm } from './components/form/EmailLoginForm'

export const LoginPage = (): ReactNode => {
  return (
    <CentralizedDiv className={twMerge('w-full h-full', themeClass.dust.sections.body)}>
      <EmailLoginForm />
    </CentralizedDiv>
  )
}
