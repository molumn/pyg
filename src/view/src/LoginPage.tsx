import React from 'react'

import { CentralizedDiv } from '@view/components/layout/utils/Layout'

import { EmailLoginForm } from '@view/components/form/EmailLoginForm'

export const LoginPage = (): JSX.Element => {
  return (
    <CentralizedDiv>
      <EmailLoginForm />
    </CentralizedDiv>
  )
}
