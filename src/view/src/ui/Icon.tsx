import { IconBaseProps, IconType } from 'react-icons'
import { useThemeContext } from '@view/hooks'

export const ReactIcon = ({ reactIconType, ...props }: IconBaseProps & { reactIconType: IconType }): JSX.Element => {
  const theme = useThemeContext()

  return reactIconType({
    style: {
      color: theme.color.icon
    },
    ...props
  })
}
