import { useState } from 'react'

import { MutableText } from '@view/ui'
import { ThemeSchema } from '@common/theme'

export const useMutableText = (
  defaultValue?: string,
  onChange?: (text: string) => void
): {
  setMutableState: (state: boolean) => void
  MutableTextComponent: (props: { size: keyof ThemeSchema['font']['size']; className?: string }) => JSX.Element
} => {
  const [mutableState, setMutableState] = useState(false)

  const MutableTextComponent = ({ size, className }: { size: keyof ThemeSchema['font']['size']; className?: string }): JSX.Element => (
    <MutableText
      text={defaultValue}
      mutableStatus={mutableState}
      onEnter={(newText: string): void => {
        if (onChange) onChange(newText)
        setMutableState(false)
      }}
      size={size}
      className={className}
    />
  )

  return {
    setMutableState: (state: boolean) => setMutableState(state),
    MutableTextComponent
  }
}
