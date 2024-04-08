import { ReactNode } from 'react'
import { CentralizedDiv, Column, Row } from '../../utils/class/Layout'
import { twMerge } from 'tailwind-merge'
import { themeClass } from '../../utils'
import { FcGoogle } from 'react-icons/fc'
import { IoLogoGithub } from 'react-icons/io'

const EmailInput = (): ReactNode => {
  return (
    <div>
      <label
        htmlFor={'email'}
        className={twMerge('block text-sm font-medium leading-6', themeClass.dust.login.form.label)}
      >
        Email Address
      </label>
      <div className={'mt-2'}>
        <input
          name={'email'}
          type={'email'}
          autoComplete={'email'}
          required={true}
          className={twMerge(
            'w-full block rounded-md py-1.5 shadow-sm ring-1 ring-inset',
            themeClass.dust.login.form.input,
            'focus:ring-2 focus:ring-inset',
            'sm:text-sm sm-leading-6'
          )}
        />
      </div>
    </div>
  )
}

const PasswordInput = (): ReactNode => {
  return (
    <div>
      <div className={'flex items-center justify-between'}>
        <label
          htmlFor={'email'}
          className={twMerge('block text-sm font-medium leading-6', themeClass.dust.login.form.label)}
        >
          Password
        </label>
        <div className="text-sm">
          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
            {/* todo : Sign up */}
            Forgot password?
          </a>
        </div>
      </div>
      <div className={'mt-2'}>
        <input
          name={'password'}
          type={'password'}
          autoComplete={'current-password'}
          required={true}
          className={twMerge(
            'w-full block rounded-md py-1.5 shadow-sm ring-1 ring-inset',
            themeClass.dust.login.form.input,
            'focus:ring-2 focus:ring-inset',
            'sm:text-sm sm-leading-6'
          )}
        />
      </div>
    </div>
  )
}

const SubmitButton = (): ReactNode => {
  return (
    <div>
      <button
        type={'submit'}
        className={twMerge(
          'w-full flex justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
          themeClass.dust.login.form.submit
        )}
      >
        Sign in
      </button>
    </div>
  )
}

const GoogleLoginButton = (): ReactNode => {
  return (
    <CentralizedDiv
      className={twMerge('w-[40px] h-[40px] rounded-full', themeClass.dust.login.form.media)}
    >
      <a href={'#'}>
        {/* todo : 3rd party login */}
        <FcGoogle size={20} />
      </a>
    </CentralizedDiv>
  )
}

const GithubLoginButton = (): ReactNode => {
  return (
    <CentralizedDiv
      className={twMerge('w-[40px] h-[40px] rounded-full', themeClass.dust.login.form.media)}
    >
      <a href={'#'}>
        {/* todo : 3rd party login */}
        <IoLogoGithub size={25} />
      </a>
    </CentralizedDiv>
  )
}

export const EmailLoginForm = (): ReactNode => {
  return (
    <Column className={'w-[400px] min-h-full px-6 py-12'}>
      <div>
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight">
          Sign in to your account
        </h2>
      </div>
      <div className={'mt-10'}>
        <form className={'space-y-6'} onSubmit={() => {}}>
          {/* todo : onSubmit */}
          <EmailInput />
          <PasswordInput />
          <SubmitButton />
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          {/*<a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">*/}
          {/*  /!* todo : Sign up *!/*/}
          {/*  Start a 14 day free trial*/}
          {/*</a>*/}
          {/*  /!* todo : Remove free trial label? *!/*/}
        </p>
        <hr className={'mt-4 border-2 border-b-black'} />
        <Row className={'mt-4 justify-center gap-x-4'}>
          <GoogleLoginButton />
          <GithubLoginButton />
        </Row>
      </div>
    </Column>
  )
}
