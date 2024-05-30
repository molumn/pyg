import { useHookWorkspaceSidebarFocusedType, useHookWorkspaceSidebarGateKeeper, useThemeContext } from '@view/hooks'

import { AccordVertical, OptionalDisplay } from '@view/components/layout/utils'
import {
  WorkspaceSidebarTabMenu,
  WorkspaceSidebarCharacterHierarchyView,
  WorkspaceSidebarPlotHierarchyView,
  WorkspaceSidebarSceneHierarchyView,
  WorkspaceSidebarScriptHierarchyView,
  WorkspaceSidebarTimelineHierarchyView,
  WorkspaceSidebarHierarchyViewTemplate
} from '@view/components/layout/sidebar'

export const WorkspaceSidebar = (): JSX.Element => {
  const theme = useThemeContext()

  const { sidebarViewOpened } = useHookWorkspaceSidebarGateKeeper()
  const { checkFocused } = useHookWorkspaceSidebarFocusedType()

  return (
    <>
      <WorkspaceSidebarTabMenu />
      <AccordVertical
        style={{
          borderColor: theme.color.separator
        }}
        className={'w-auto'}
        animate={sidebarViewOpened}
      >
        <WorkspaceSidebarHierarchyViewTemplate>
          <OptionalDisplay display={checkFocused('Character Hierarchy')}>
            <WorkspaceSidebarCharacterHierarchyView />
          </OptionalDisplay>
          <OptionalDisplay display={checkFocused('Plot Hierarchy')}>
            <WorkspaceSidebarPlotHierarchyView />
          </OptionalDisplay>
          <OptionalDisplay display={checkFocused('Scene Hierarchy')}>
            <WorkspaceSidebarSceneHierarchyView />
          </OptionalDisplay>
          <OptionalDisplay display={checkFocused('Timeline Hierarchy')}>
            <WorkspaceSidebarTimelineHierarchyView />
          </OptionalDisplay>
          <OptionalDisplay display={checkFocused('Scripts Hierarchy')}>
            <WorkspaceSidebarScriptHierarchyView />
          </OptionalDisplay>
        </WorkspaceSidebarHierarchyViewTemplate>
      </AccordVertical>
    </>
  )
}
