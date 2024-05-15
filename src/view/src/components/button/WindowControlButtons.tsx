import React, { ComponentProps, useEffect, useState } from 'react'

import { twMerge } from 'tailwind-merge'

import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore
} from 'react-icons/vsc'

import { IpcSocket } from '@common/socket'

import { themeClass } from '@view/utils'

import { Row } from '@view/components/layout/utils/Layout'

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
  // todo : safe close
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
    IpcSocket.requester.command('windowControl', 'onClose')
  }

  return window.electron.process.platform !== 'darwin' ? (
    <Row className={'fixed w-auto h-auto top-0 right-0 item-center justify-center bg-inherit'}>
      <WindowControlButton onClick={onMinimize} className={themeClass.dust.control.minimize}>
        <VscChromeMinimize />
      </WindowControlButton>
      <WindowControlButton
        onClick={onMaximizeOrRestore}
        className={themeClass.dust.control.maximize}
      >
        {isMaximized ? <VscChromeRestore /> : <VscChromeMaximize />}
      </WindowControlButton>
      <WindowControlButton onClick={onClose} className={themeClass.dust.control.close}>
        <VscChromeClose />
      </WindowControlButton>
    </Row>
  ) : (
    <></>
  )
}
