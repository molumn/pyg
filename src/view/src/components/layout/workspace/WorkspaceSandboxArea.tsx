import React from 'react'

import { WorkspaceSidebarTypeButtonType } from '@view/hooks'

import { DisplayOptional } from '@view/components/layout/utils/DisplayOptional'
import { ProjectSandboxArea } from './sandbox/ProjectSandboxArea'

type WorkspaceSectionProps = {
  selectedWorkspaceSidebarTypeButton: WorkspaceSidebarTypeButtonType
}
export const WorkspaceSandboxArea = ({
  selectedWorkspaceSidebarTypeButton
}: WorkspaceSectionProps): JSX.Element => {
  return (
    <>
      <DisplayOptional display={selectedWorkspaceSidebarTypeButton === 'project'}>
        <ProjectSandboxArea />
      </DisplayOptional>
      <DisplayOptional display={selectedWorkspaceSidebarTypeButton === 'flag'}>
        flag
      </DisplayOptional>
    </>
  )
}
