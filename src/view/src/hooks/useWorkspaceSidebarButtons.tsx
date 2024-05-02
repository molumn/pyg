import { useState } from 'react'

export type WorkspaceSidebarTypeButtonType = 'project' | 'flag'

export const useWorkspaceSidebarButtons = (
  buttons: [WorkspaceSidebarTypeButtonType, JSX.Element][] = []
): {
  buttonList: [WorkspaceSidebarTypeButtonType, JSX.Element][]
  selectedWorkspaceSidebarTypeButton: WorkspaceSidebarTypeButtonType | undefined
  onButtonFocus: (button: WorkspaceSidebarTypeButtonType) => () => Promise<void>
} => {
  const [buttonList] = useState<[WorkspaceSidebarTypeButtonType, JSX.Element][]>(buttons)
  const [selectedWorkspaceSidebarTypeButton, setSelectedWorkspaceSidebarTypeButton] = useState(
    buttons[0][0]
  )

  const onButtonFocus = (button: WorkspaceSidebarTypeButtonType) => async (): Promise<void> => {
    setSelectedWorkspaceSidebarTypeButton(button)
    console.log(button)
  }

  return {
    buttonList,
    selectedWorkspaceSidebarTypeButton,
    onButtonFocus
  }
}
