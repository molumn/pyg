import { ComponentProps, ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  fetchWindowIsMaximized,
  selectWindowIsMaximized,
  selectWindowType
} from '../../store/state/window'

import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore
} from 'react-icons/vsc'
import { themeClass } from '../../utils'

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
  const windowType = useAppSelector(selectWindowType)
  const maximized = useAppSelector(selectWindowIsMaximized)
  const dispatch = useAppDispatch()

  const onMinimize = async (): Promise<void> => {
    window.ipc('request-minimize-window')
  }
  const onMaximizeOrRestore = async (): Promise<void> => {
    if (maximized) await window.ipc('request-restore-window')
    else await window.ipc('request-maximize-window')

    dispatch(fetchWindowIsMaximized())
  }
  const onClose = async (): Promise<void> => {
    if (windowType === 'workspace') {
      // todo : popup
    }
    window.ipc('request-close-window')
  }

  return window.electron.process.platform !== 'darwin' ? (
    <div className={'right-0 justify-self-center flex flex-row grow-0 items-center justify-center'}>
      <WindowControlButton onClick={onMinimize} className={themeClass.dust.control.minimize}>
        <VscChromeMinimize />
      </WindowControlButton>
      {
        windowType !== 'login' ? (
          <WindowControlButton
            onClick={onMaximizeOrRestore}
            className={themeClass.dust.control.maximize}
          >
            {maximized ? <VscChromeRestore /> : <VscChromeMaximize />}
          </WindowControlButton>
        ) : (
          <></>
        )
      }
      <WindowControlButton onClick={onClose} className={themeClass.dust.control.close}>
        <VscChromeClose />
      </WindowControlButton>
    </div>
  ) : (
    <></>
  )
}
