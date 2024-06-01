import { ComponentProps } from 'react'

import { VscAccount, VscBrowser, VscCircuitBoard, VscFileCode } from 'react-icons/vsc'
import { FaTimeline } from 'react-icons/fa6'

import { twMerge } from 'tailwind-merge'

import { useAppDispatch } from '@view/hooks/hook'

import { stateWorkspaceViewSlice, WorkspaceSidebarTabType } from '@view/store/stateWorkspaceView'
import { Button, ReactIcon } from '@view/ui'

type TabButtonType = {
  name: WorkspaceSidebarTabType
  icon: JSX.Element
}

export const useHookWorkspaceSidebarTabController = (): {
  tabButtons: TabButtonType[]
  TabButton: (props: { button: TabButtonType } & ComponentProps<'button'>) => JSX.Element
} => {
  const tabButtons: TabButtonType[] = [
    {
      name: 'Character Hierarchy',
      icon: <ReactIcon reactIconType={VscAccount} className={'h-[32px]'} />
    },
    {
      name: 'Plot Hierarchy',
      icon: <ReactIcon reactIconType={VscCircuitBoard} className={'h-[32px]'} />
    },
    {
      name: 'Scene Hierarchy',
      icon: <ReactIcon reactIconType={VscBrowser} className={'h-[32px]'} />
    },
    {
      name: 'Timeline Hierarchy',
      icon: <ReactIcon reactIconType={FaTimeline} className={'h-[32px]'} />
    },
    {
      name: 'Scripts Hierarchy',
      icon: <ReactIcon reactIconType={VscFileCode} className={'h-[32px]'} />
    }
  ]

  const dispatcher = useAppDispatch()

  const focusSidebar = (type: WorkspaceSidebarTabType): void => {
    dispatcher(stateWorkspaceViewSlice.actions.focusSidebar(type))
  }

  const TabButton = ({ button, className, ...buttonProps }: { button: TabButtonType } & ComponentProps<'button'>): JSX.Element => {
    return (
      <Button className={twMerge('centralize', className)} {...buttonProps} onClick={(): void => focusSidebar(button.name)}>
        {button.icon}
      </Button>
    )
  }

  return {
    tabButtons,
    TabButton
  }
}
