import { ComponentProps, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { FocusableButton } from '@view/ui'

export type WorkspaceTitleBarButtonType = 'project' | 'flag'

export const useWorkspaceTitleBarButtons = (
  buttons: [WorkspaceTitleBarButtonType, JSX.Element][] = []
): {
  buttonList: [WorkspaceTitleBarButtonType, JSX.Element][]
  selectedWorkspaceSidebarTypeButton: WorkspaceTitleBarButtonType
  checkWorkspaceSidebarTypeButton: (buttonType: WorkspaceTitleBarButtonType) => boolean
  onButtonFocus: (button: WorkspaceTitleBarButtonType) => () => Promise<void>
  WorkspaceTitleBarButton: (
    props: {
      button: [WorkspaceTitleBarButtonType, JSX.Element]
    } & ComponentProps<'button'>
  ) => JSX.Element
} => {
  const [buttonList] = useState<[WorkspaceTitleBarButtonType, JSX.Element][]>(buttons)
  const [selectedWorkspaceSidebarTypeButton, setSelectedWorkspaceSidebarTypeButton] =
    useState<WorkspaceTitleBarButtonType>(buttons[0][0])

  const checkWorkspaceSidebarTypeButton = (buttonType: WorkspaceTitleBarButtonType): boolean => {
    return (
      selectedWorkspaceSidebarTypeButton === buttonType &&
      buttons.find((button) => button[0] === buttonType) !== undefined
    )
  }

  const onButtonFocus = (button: WorkspaceTitleBarButtonType) => async (): Promise<void> => {
    setSelectedWorkspaceSidebarTypeButton(button)
    console.log(button)
  }

  const WorkspaceTitleBarButton = ({
    button,
    className,
    ...props
  }: {
    button: [WorkspaceTitleBarButtonType, JSX.Element]
  } & ComponentProps<'button'>): JSX.Element => {
    return (
      <FocusableButton
        focused={checkWorkspaceSidebarTypeButton(button[0])}
        className={twMerge(className, '')}
        onClick={onButtonFocus(button[0])}
        {...props}
      >
        {button[1]}
      </FocusableButton>
    )
  }

  return {
    buttonList,
    selectedWorkspaceSidebarTypeButton,
    checkWorkspaceSidebarTypeButton,
    onButtonFocus,
    WorkspaceTitleBarButton
  }
}
