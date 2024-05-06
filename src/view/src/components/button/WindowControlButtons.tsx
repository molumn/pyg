import React, { ComponentProps, useEffect, useState } from 'react'

import { twMerge } from 'tailwind-merge'

import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore
} from 'react-icons/vsc'

import { IpcSocket } from '@common/socket'

import { windowPage, themeClass } from '@view/utils'

const WindowControlButton = ({
  className,
  children,
  ...props
}: ComponentProps<'button'>): JSX.Element => {
  return (
    <button
      className={twMerge('w-[40px] h-[32px] flex items-center justify-center', className)}
      {...props}
    >
      {children}
    </button>
  )
}

export const WindowControlButtons = (): JSX.Element => {
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    async function fetchIsMaximized(): Promise<void> {
      const response: boolean = await IpcSocket.requester.request(
        'windowStatus',
        'getWindowIsMaximized'
      )
      setIsMaximized(response)
    }
    fetchIsMaximized()

    window.addEventListener('resize', fetchIsMaximized)
    return () => {
      window.removeEventListener('resize', fetchIsMaximized)
    }
  }, [])

  const onMinimize = (): void => {
    IpcSocket.requester.command('windowControl', 'onMinimized')
  }
  const onMaximizeOrRestore = (): void => {
    if (isMaximized) IpcSocket.requester.command('windowControl', 'onRestore')
    else IpcSocket.requester.command('windowControl', 'onMaximized')
  }
  const onClose = (): void => {
    if (windowPage.isWorkspacePage) {
      // todo : popup
    }
    IpcSocket.requester.command('windowControl', 'onClose')
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
          {isMaximized ? <VscChromeRestore /> : <VscChromeMaximize />}
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
