import React from 'react'

import { WorkspaceSidebarTypeButtonType } from '../../../hooks'
import { ProjectSandboxArea } from './sandbox/ProjectSandboxArea'

type WorkspaceSectionProps = {
  selectedWorkspaceSidebarTypeButton: WorkspaceSidebarTypeButtonType
}
export const WorkspaceSandboxArea = ({
  selectedWorkspaceSidebarTypeButton
}: WorkspaceSectionProps): JSX.Element => {
  return (
    <>
      {selectedWorkspaceSidebarTypeButton === 'project' ? (
        <ProjectSandboxArea />
      ) : selectedWorkspaceSidebarTypeButton === 'flag' ? (
        <>flag</>
      ) : (
        <></>
      )}
    </>
  )
}
