import { ComponentProps, ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

import { MdEmail, MdPassword } from 'react-icons/md'

import { themeBackgroundClass, themeClass } from '../../utils'

const EmailInput = ({ className, ...props }: ComponentProps<'input'>): ReactNode => {
  return <div className={twMerge('group w-[400px] h-[40px] rounded-3xl flex flex-row items-center justify-center', themeBackgroundClass.dust.highlight)}>
    <MdEmail className={'ml-1 mr-0.5 w-[40px] self-center justify-self-center'} size={22} />
    <input type={'email'} className={twMerge('grow mr-[4px] h-[32px] self-center justify-self-center rounded-r-3xl border-0', themeClass.dust.light, className)} {...props} onInvalid={(event) => event.preventDefault()} />
  </div>
}

const PasswordInput = ({ className, ...props }: ComponentProps<'input'>): ReactNode => {
  return <div className={twMerge('group w-[400px] h-[40px] rounded-3xl flex flex-row items-center justify-center', themeBackgroundClass.dust.highlight)}>
    <MdPassword className={'ml-1 mr-0.5 w-[40px] self-center justify-self-center'} size={22} />
    <input type={'password'} className={twMerge('grow mr-[4px] h-[32px] self-center justify-self-center rounded-r-3xl border-0', themeClass.dust.light, className)} {...props} onInvalid={(event) => event.preventDefault()} />
  </div>
}

export const EmailLoginForm = ({ className, ...props }: ComponentProps<'form'>): ReactNode => {
  return <form className={twMerge('', className)} {...props}>
    <EmailInput />
    <PasswordInput />
  </form>
}
