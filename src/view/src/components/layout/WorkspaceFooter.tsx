import { useThemeContext } from '@view/hooks'

export const WorkspaceFooter = (): JSX.Element => {
  const theme = useThemeContext()

  return (
    <div
      style={{
        backgroundColor: theme.color.base,
        borderColor: theme.color.separator
      }}
      className={'h-[32px] border-t-[1px]'}
    >
      footer
    </div>
  )
}
