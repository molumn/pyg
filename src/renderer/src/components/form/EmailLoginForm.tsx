import { ComponentProps, ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

import { MdEmail, MdPassword } from 'react-icons/md'

import { themeClass } from '../../utils'
import { HandledDiv } from '../base/HandledDiv'

const EmailInput = ({ className, ...props }: ComponentProps<'input'>): ReactNode => {
  return (
    <HandledDiv
      className={twMerge(
        'w-[400px] h-[40px] rounded-3xl flex flex-row items-center justify-center',
        themeClass.dust.secondary
      )}
    >
      <MdEmail className={'ml-1 mr-0.5 w-[40px] self-center justify-self-center'} size={22} />
      <input
        type={'email'}
        className={twMerge(
          'grow mr-[4px] h-[32px] self-center justify-self-center rounded-r-3xl border-0 indent-1.5',
          themeClass.dust.light,
          className
        )}
        {...props}
        onInvalid={(event) => event.preventDefault()}
      />
    </HandledDiv>
  )
}

const PasswordInput = ({ className, ...props }: ComponentProps<'input'>): ReactNode => {
  return (
    <HandledDiv
      className={twMerge(
        'w-[400px] h-[40px] rounded-3xl flex flex-row items-center justify-center',
        themeClass.dust.secondary
      )}
    >
      <MdPassword className={'ml-1 mr-0.5 w-[40px] self-center justify-self-center'} size={22} />
      <input
        type={'password'}
        className={twMerge(
          'grow mr-[4px] h-[32px] self-center justify-self-center rounded-r-3xl border-0 indent-1.5',
          themeClass.dust.light,
          className
        )}
        {...props}
        onInvalid={(event) => event.preventDefault()}
      />
    </HandledDiv>
  )
}

export const EmailSubmitButton = ({
  className,
  children,
  ...props
}: ComponentProps<'button'>): ReactNode => {
  return (
    <button
      type={'submit'}
      className={twMerge(
        'w-[400px] h-[40px] rounded-3xl flex flex-row items-center justify-center',
        themeClass.dust.secondary,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export const EmailLoginForm = ({ className, ...props }: ComponentProps<'form'>): ReactNode => {
  return (
    <form
      className={twMerge(
        'w-[500px] rounded-xl h-[400px] flex flex-col gap-5 items-center justify-center',
        themeClass.dust.concentrate,
        className
      )}
      {...props}
      onSubmit={(event) => {
        event.preventDefault()
        console.log('submit')
      }}
    >
      <div className={'grow'} />
      <h1 className={'text-3xl font-black'}>Welcome To P.Y.G!</h1>
      <div className={'grow'} />
      <EmailInput />
      <PasswordInput />
      <EmailSubmitButton>Log In</EmailSubmitButton>
      <div className={'grow'} />
    </form>
  )
}
