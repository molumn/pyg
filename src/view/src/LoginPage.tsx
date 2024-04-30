import React from 'react'

import { twMerge } from 'tailwind-merge'

import { themeClass } from './utils'

import { CentralizedDiv } from './components/layout/utils/Layout'

import { TitleBarSection } from './components/TitleBar'
import { EmailLoginForm } from './components/form/EmailLoginForm'

export const LoginPage = (): JSX.Element => {
  return (
    <>
      <TitleBarSection className={'bg-transparent'} />
      <CentralizedDiv className={twMerge('w-full h-full', themeClass.dust.sections.body)}>
        <EmailLoginForm />
      </CentralizedDiv>
    </>
  )
}
