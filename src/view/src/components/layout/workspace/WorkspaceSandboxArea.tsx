import { useAppSelector, useThemeContext, WorkspaceTitleBarButtonType } from '@view/hooks'

import { selectRootNode } from '@view/store/ProjectFileNode'

import { DisplayOptional } from '@view/components/layout/utils/DisplayOptional'
import { ProjectSandboxArea } from './ProjectSandboxArea'
import { TextButton } from '@view/ui'
import { CentralizedDiv } from '@view/components/layout/utils/Layout'
import { useWorkspaceControlFlow } from '@view/hooks/useWorkspaceControlFlow'

type WorkspaceSectionProps = {
  selectedWorkspaceSidebarTypeButton: WorkspaceTitleBarButtonType
}
export const WorkspaceSandboxArea = ({
  selectedWorkspaceSidebarTypeButton
}: WorkspaceSectionProps): JSX.Element => {
  const theme = useThemeContext()

  const projectFileNode = useAppSelector(selectRootNode)

  const { openWorkspace } = useWorkspaceControlFlow()

  if (!projectFileNode) {
    return (
      <CentralizedDiv
        style={{
          backgroundColor: theme.color.base,
          borderColor: theme.color.separator
        }}
        className={'w-full h-full overflow-x-hidden overflow-y-scroll flex-col'}
      >
        <TextButton size={'md'} onClick={() => {}}>
          New Workspace
        </TextButton>
        <TextButton
          size={'md'}
          onClick={async () => {
            await openWorkspace({
              name: 'demo',
              rootPath: 'C:\\Users\\stude\\AppData\\Roaming\\pyg\\defaults\\demo-workspaces\\demo',
              isExisted: true,
              type: 'demo'
            })
          }}
        >
          Open Workspace
        </TextButton>
        {/*<TextButton size={'md'} onClick={() => {}}>*/}
        {/*  Open File*/}
        {/*</TextButton>*/}
      </CentralizedDiv>
    )
  }

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
