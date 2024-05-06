import { useState } from 'react'

export type WorkspaceSidebarTypeButtonType = 'project' | 'flag'

export const useWorkspaceSidebarButtons = (
  buttons: [WorkspaceSidebarTypeButtonType, JSX.Element][] = []
): {
  buttonList: [WorkspaceSidebarTypeButtonType, JSX.Element][]
  selectedWorkspaceSidebarTypeButton: WorkspaceSidebarTypeButtonType | undefined
  checkWorkspaceSidebarTypeButton: (buttonType: WorkspaceSidebarTypeButtonType) => boolean
  onButtonFocus: (button: WorkspaceSidebarTypeButtonType) => () => Promise<void>
} => {
  const [buttonList] = useState<[WorkspaceSidebarTypeButtonType, JSX.Element][]>(buttons)
  const [selectedWorkspaceSidebarTypeButton, setSelectedWorkspaceSidebarTypeButton] = useState(
    buttons[0][0]
  )

  const checkWorkspaceSidebarTypeButton = (buttonType: WorkspaceSidebarTypeButtonType): boolean => {
    return (
      selectedWorkspaceSidebarTypeButton === buttonType &&
      buttons.find((button) => button[0] === buttonType) !== undefined
    )
  }

  const onButtonFocus = (button: WorkspaceSidebarTypeButtonType) => async (): Promise<void> => {
    setSelectedWorkspaceSidebarTypeButton(button)
    console.log(button)
  }

  return {
    buttonList,
    selectedWorkspaceSidebarTypeButton,
    checkWorkspaceSidebarTypeButton,
    onButtonFocus
  }
}
