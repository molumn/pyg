import { useThemeContext, WorkspaceTitleBarButtonType } from '@view/hooks'

import { DisplayOptional } from '@view/components/layout/utils/DisplayOptional'
import { ProjectSandboxArea } from './ProjectSandboxArea'

type WorkspaceSectionProps = {
  selectedWorkspaceSidebarTypeButton: WorkspaceTitleBarButtonType
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
