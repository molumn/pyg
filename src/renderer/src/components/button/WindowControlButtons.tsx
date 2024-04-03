import { ComponentProps, ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchWindowIsMaximized, selectWindowIsMaximized, selectWindowType } from '../../store/state/window'

import { VscChromeClose, VscChromeMaximize, VscChromeMinimize, VscChromeRestore } from 'react-icons/vsc'

const WindowControlButton = ({ className, children, ...props }: ComponentProps<'button'>): ReactNode => {
  return <button className={twMerge('w-[40px] h-[32px] flex items-center justify-center', className)} {...props}>
    {children}
  </button>
}

export const WindowControlButtons = (): ReactNode => {
  const windowType = useAppSelector(selectWindowType)
  const maximized = useAppSelector(selectWindowIsMaximized)
  const dispatch = useAppDispatch()

  const onMinimize = async () => {
    window.ipc('request-minimize-window')
  }
  const onMaximizeOrRestore = async () => {
    if (maximized) await window.ipc('request-restore-window')
    else await window.ipc('request-maximize-window')

    dispatch(fetchWindowIsMaximized())
  }
  const onClose = async () => {
    if (windowType === 'workspace') {
      // todo : popup
    }
    window.ipc('request-close-window')
  }

  return window.electron.process.platform !== 'darwin' ? (
    <div className={'right-0 justify-self-center flex flex-row grow-0 items-center justify-center'} >
      <WindowControlButton onClick={onMinimize} className={'hover:bg-[#8C8C8CC0]'}>
        <VscChromeMinimize />
      </WindowControlButton>
      <WindowControlButton onClick={onMaximizeOrRestore} className={'hover:bg-[#8C8C8CC0]'}>
        {maximized ? <VscChromeRestore /> : <VscChromeMaximize />}
      </WindowControlButton>
      <WindowControlButton onClick={onClose} className={'hover:bg-red-700'}>
        <VscChromeClose />
      </WindowControlButton>
    </div>
  ) : <></>
}
