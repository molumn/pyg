import { ComponentProps } from 'react'

import { useThemeContext } from '@view/hooks'
import { twMerge } from 'tailwind-merge'

type FormProps = {
  onSubmitCaptured?: (...inputs: string[]) => void
} & ComponentProps<'form'>
export const Form = ({ id, key, style, className, children, onSubmitCaptured = (...inputs): void => console.log(inputs) }: FormProps): JSX.Element => {
  const theme = useThemeContext()

  return (
    <form
      id={id}
      key={key}
      style={{
        ...style
      }}
      className={twMerge('', className)}
      onSubmit={(event) => {
        event.preventDefault()

        const inputs: string[] = []
        let marker = 0
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        while (event.target[marker]) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          inputs.push(event.target[marker].value)
          marker++
        }
        inputs.pop() // remove submit button
        onSubmitCaptured(...inputs)
      }}
    >
      {children}
    </form>
  )
}
