import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { ThemeSchema } from '@common/theme'

import { useThemeContext } from '@view/hooks'
import { Button } from '@view/ui/Button'
import { IpcSocket } from '@common/socket'
import { Row } from '@view/components/layout/utils'

type InputProps = {
  label?: string
  fontSize?: keyof ThemeSchema['font']['size']
} & ComponentProps<'input'>
export const Input = ({ label = 'input', fontSize = 'sm', className, children, ...props }: InputProps): JSX.Element => {
  const theme = useThemeContext()

  return (
    <>
      <label
        style={{
          fontSize: '0.8rem'
        }}
        htmlFor={label}
      >
        {label}
      </label>
      <Row
        style={{
          backgroundColor: theme.color.base,
          borderColor: theme.color.separator
        }}
        className={twMerge('w-auto h-auto items-center border-2 rounded px-2', className)}
      >
        <input
          id={label}
          style={{
            fontSize: theme.font.size[fontSize]
          }}
          className={'w-full h-full bg-transparent rounded'}
          {...props}
        />
        {children}
      </Row>
    </>
  )
}

type FilePathInputProps = {
  dialogProperties: ('openFile' | 'openDirectory' | 'multiSelections' | 'showHiddenFiles' | 'createDirectory' | 'promptToCreate' | 'noResolveAliases' | 'treatPackageAsDirectory' | 'dontAddToRecent')[]
  onResult: (filepath: string) => void
} & ComponentProps<typeof Button>
export const FilePathInput = ({ dialogProperties, onResult, className, ...props }: FilePathInputProps): JSX.Element => {
  const onClick = async (): Promise<void> => {
    const filepath: string = await IpcSocket.ipcRenderer.request('util/get/directory', ...dialogProperties)
    if (filepath === '') return
    onResult(filepath)
  }

  return <Button {...props} className={twMerge('centralize', className)} onClick={onClick} />
}
