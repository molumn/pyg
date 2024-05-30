import { ComponentProps, MouseEvent, useEffect, useState } from 'react'
import { useThemeContext } from '@view/hooks/useThemeContext'
import { Button } from '@view/ui'
import { twMerge } from 'tailwind-merge'

export const useContextMenuController = (
  menuId: string
): {
  ContextMenu: (props: ComponentProps<'div'>) => JSX.Element
  ContextItem: (props: ComponentProps<'button'>) => JSX.Element
  openContextMenu: (event: MouseEvent) => void
} => {
  const theme = useThemeContext()
  const [modalOpened, setModalOpened] = useState(false)
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    function releaseOrNot(event): void {
      setModalOpened(false)
    }

    window.addEventListener('mousedown', releaseOrNot)
    return () => {
      window.removeEventListener('mousedown', releaseOrNot)
    }
  }, [])

  const ContextItem = ({ className, children, ...props }: ComponentProps<'button'>): JSX.Element => {
    return (
      <Button className={twMerge(className, 'w-full text-start px-1')} {...props}>
        {children}
      </Button>
    )
  }

  const ContextMenu = ({ children, ...props }: ComponentProps<'div'>): JSX.Element => {
    return (
      <div
        {...props}
        style={{
          zIndex: '999',
          display: modalOpened ? '' : 'none',
          position: 'fixed',
          backgroundColor: theme.color.base,
          border: '1px solid',
          borderColor: theme.color.separator,
          left: modalPosition.x,
          top: modalPosition.y
        }}
      >
        {children}
      </div>
    )
  }

  return {
    ContextMenu,
    ContextItem,
    openContextMenu: (event): void => {
      event.preventDefault()
      setModalPosition({
        x: event.clientX,
        y: event.clientY
      })
      setModalOpened(true)
    }
  }
}
