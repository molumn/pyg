import { useThemeContext } from '@view/hooks'
import { ThemeSchema } from '@common/theme'

export type TextProps = {
  size: keyof ThemeSchema['font']['size']
  className?: string
  children: string
}
export const Text = ({ size, ...props }: TextProps): JSX.Element => {
  const theme = useThemeContext()

  return (
    <p
      style={{
        fontSize: theme.font.size[size],
        color: theme.color.text
      }}
      {...props}
    />
  )
}
