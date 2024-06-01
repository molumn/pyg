import { ComponentProps } from 'react'
import styled from 'styled-components'

import { useThemeContext } from '@view/hooks'

const StyledDiv = styled.div`
  background-color: transparent;
  &:hover {
    background-color: ${(props): string => props.theme.hover};
  }
`
StyledDiv.defaultProps = {
  theme: {
    hover: '#FFF'
  }
}

export const Hover = (props: ComponentProps<'div'>): JSX.Element => {
  const theme = useThemeContext()

  return (
    <StyledDiv
      theme={{
        hover: theme.color.hover.area
      }}
      {...props}
    />
  )
}
