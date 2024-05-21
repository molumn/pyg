import { useThemeContext } from '@view/hooks'

import { Row } from '@view/components/layout/utils/Layout'

export const WorkspaceFooter = (): JSX.Element => {
  const theme = useThemeContext()

  return (
    <Row
      style={{
        borderColor: theme.color.separator
      }}
      className={'h-5 border-t-[1px]'}
    >
      footer
    </Row>
  )
}
