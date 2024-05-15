import React from 'react'

import { useThemeContext, WorkspaceSidebarTypeButtonType } from '@view/hooks'

import { DisplayOptional } from '@view/components/layout/utils/DisplayOptional'
import { ProjectSandboxArea } from './ProjectSandboxArea'

type WorkspaceSectionProps = {
  selectedWorkspaceSidebarTypeButton: WorkspaceSidebarTypeButtonType
}
export const WorkspaceSandboxArea = ({
  selectedWorkspaceSidebarTypeButton
}: WorkspaceSectionProps): JSX.Element => {
  const theme = useThemeContext()

  return (
    <div
      style={{
        backgroundColor: theme.color.base
      }}
      className={'w-full h-full'}
    >
      <DisplayOptional display={selectedWorkspaceSidebarTypeButton === 'project'}>
        <ProjectSandboxArea />
      </DisplayOptional>
      <DisplayOptional display={selectedWorkspaceSidebarTypeButton === 'flag'}>
        <p>flag</p>
      </DisplayOptional>
    </div>
  )
}
