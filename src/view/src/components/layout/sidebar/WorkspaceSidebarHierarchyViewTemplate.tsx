import { ComponentProps } from 'react'

import { twMerge } from 'tailwind-merge'

import { Resizable } from 're-resizable'

import { useThemeContext } from '@view/hooks'
import { Column } from '@view/components/layout/utils'

export const WorkspaceSidebarHierarchyViewTemplate = ({ className, children, ...props }: ComponentProps<'div'>): JSX.Element => {
  const theme = useThemeContext()

  return (
    <Resizable
      defaultSize={{
        width: 250,
        height: '100%'
      }}
      minWidth={50}
      maxWidth={0.8 * window.innerWidth}
      enable={{
        top: false,
        right: true,
        bottom: false,
        left: true,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false
      }}
      handleStyles={{
        right: {
          width: '0.5px',
          height: '100%',
          right: '0px',
          backgroundColor: theme.color.separator
        }
      }}
    >
      <Column className={twMerge(className, 'cursor-auto overflow-y-scroll overflow-x-hidden')} {...props}>
        {children}
      </Column>
    </Resizable>
  )
}
