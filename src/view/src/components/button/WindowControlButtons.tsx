import { useEffect, useState } from 'react'

import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore
} from 'react-icons/vsc'

import { IpcSocket } from '@common/socket'

import { Button, FatalButton } from '@view/ui'

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
    <>
      <Button className={'w-[40px] h-[32px] flex items-center justify-center'} onClick={onMinimize}>
        <VscChromeMinimize />
      </Button>
      <Button
        className={'w-[40px] h-[32px] flex items-center justify-center'}
        onClick={onMaximizeOrRestore}
      >
        {isMaximized ? <VscChromeRestore /> : <VscChromeMaximize />}
      </Button>
      <FatalButton
        className={'w-[40px] h-[32px] flex items-center justify-center'}
        onClick={onClose}
      >
        <VscChromeClose />
      </FatalButton>
    </>
  ) : (
    <></>
  )
}
