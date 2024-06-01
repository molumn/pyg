import styled from 'styled-components'
import { ComponentProps } from 'react'

import { useThemeContext } from '@view/hooks'
import { Text, TextProps } from '@view/ui'

const StyledTextButton = styled.button`
  &:hover {
    text-decoration: underline;
  }
`

export const TextButton = ({ size, children, ...props }: TextProps & ComponentProps<'button'>): JSX.Element => {
  return (
    <StyledTextButton {...props}>
      <Text size={size}>{children}</Text>
    </StyledTextButton>
  )
}

const StyledButton = styled.button`
  background-color: ${(props): string => props.theme.color};
  &:hover {
    background-color: ${(props): string => props.theme.hovered};
  }
`

StyledButton.defaultProps = {
  theme: {
    color: 'transparent',
    hovered: '#FFF'
  }
}

export const Button = (props: ComponentProps<'button'>): JSX.Element => {
  const theme = useThemeContext()
  const hovered = theme.color.hover.button

  return (
    <StyledButton
      theme={{
        hovered
      }}
      {...props}
    />
  )
}

export const ColoredButton = ({ hover, ...props }: { hover?: string } & ComponentProps<'button'>): JSX.Element => {
  const theme = useThemeContext()
  const hovered = hover ?? theme.color.hover.button

  return (
    <StyledButton
      style={{
        borderColor: theme.color.separator
      }}
      theme={{
        color: theme.color.button,
        hovered
      }}
      {...props}
    />
  )
}

export const FatalButton = (props: ComponentProps<'button'>): JSX.Element => {
  const theme = useThemeContext()
  const hovered = theme.color.hover.fatal

  return (
    <StyledButton
      theme={{
        hovered
      }}
      {...props}
    />
  )
}

export const FocusableButton = ({ focused, ...props }: { focused: boolean } & ComponentProps<'button'>): JSX.Element => {
  const theme = useThemeContext()
  const hovered = theme.color.hover.button

  return (
    <StyledButton
      style={{
        backgroundColor: focused ? theme.color.hover.button : 'transparent'
      }}
      theme={{
        hovered
      }}
      {...props}
    />
  )
}
