import { ComponentProps, ReactNode, useEffect } from 'react'

import { twMerge } from 'tailwind-merge'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchWindowIsMaximized, selectWindowIsMaximized } from '../../store/state/window'

import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore
} from 'react-icons/vsc'

import { windowPage } from '../../utils'
import { themeClass } from '../../utils'
import { Socket } from '../../../../shared/socket'

const WindowControlButton = ({
  className,
  children,
  ...props
}: ComponentProps<'button'>): ReactNode => {
  return (
    <button
      className={twMerge('w-[40px] h-[32px] flex items-center justify-center', className)}
      {...props}
    >
      {children}
    </button>
  )
}

export const WindowControlButtons = (): ReactNode => {
  const maximized = useAppSelector(selectWindowIsMaximized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    function handleResize(): void {
      dispatch(fetchWindowIsMaximized())
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  const onMinimize = (): void => {
    Socket.requester(window).command('windowControl', 'onMinimized')
  }
  const onMaximizeOrRestore = (): void => {
    const requester = Socket.requester(window)
    if (maximized) requester.command('windowControl', 'onRestore')
    else requester.command('windowControl', 'onMaximized')
  }
  const onClose = (): void => {
    if (windowPage.isWorkspacePage) {
      // todo : popup
    }
    Socket.requester(window).command('windowControl', 'onClose')
  }

  return window.electron.process.platform !== 'darwin' ? (
    <div
      className={
        'fixed top-0 right-0 justify-self-center flex flex-row items-center justify-center bg-inherit'
      }
    >
      <WindowControlButton onClick={onMinimize} className={themeClass.dust.control.minimize}>
        <VscChromeMinimize />
      </WindowControlButton>
      {!windowPage.isLoginPage ? (
        <WindowControlButton
          onClick={onMaximizeOrRestore}
          className={themeClass.dust.control.maximize}
        >
          {maximized ? <VscChromeRestore /> : <VscChromeMaximize />}
        </WindowControlButton>
      ) : (
        <></>
      )}
      <WindowControlButton onClick={onClose} className={themeClass.dust.control.close}>
        <VscChromeClose />
      </WindowControlButton>
    </div>
  ) : (
    <></>
  )
}
