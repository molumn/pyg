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

  const ContextItem = ({ className, children, onClick, ...props }: ComponentProps<'button'>): JSX.Element => {
    return (
      <Button
        className={twMerge(className, 'w-full text-start px-1')}
        onClick={(e): void => {
          if (onClick) onClick(e)
          setModalOpened(false)
        }}
        {...props}
      >
        {children}
      </Button>
    )
  }

  const ContextMenu = ({ children, ...props }: ComponentProps<'div'>): JSX.Element => {
    return (
      <div
        style={{
          zIndex: '900',
          display: modalOpened ? '' : 'none',
          backgroundColor: '#FFFFFF00',
          position: 'fixed',
          width: '100%',
          height: '100%'
        }}
        onClick={(event): void => {
          if (event.target === event.currentTarget) setModalOpened(false)
        }}
      >
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
