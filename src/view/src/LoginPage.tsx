import React from 'react'

import { twMerge } from 'tailwind-merge'

import { themeClass } from '@view/utils'

import { CentralizedDiv } from '@view/components/layout/utils/Layout'

import { TitleBarSection } from '@view/components/TitleBar'
import { EmailLoginForm } from '@view/components/form/EmailLoginForm'

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
