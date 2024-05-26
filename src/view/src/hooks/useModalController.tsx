import { ComponentProps, MouseEvent, useEffect, useState } from 'react'
import { useThemeContext } from '@view/hooks/useThemeContext'

export const useModalController = (
  position: 'mouseRelative' | 'center',
  modalId: string | undefined = undefined
): {
  Modal: (props: ComponentProps<'div'>) => JSX.Element
  openModal: (event: MouseEvent) => void
} => {
  const theme = useThemeContext()
  const [modalOpened, setModalOpened] = useState(false)
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    function releaseOrNot(event): void {
      if (!modalId) setModalOpened(false)
      else if (document.getElementById(`modal-hook-element-[${modalId}]`)?.contains(event.target as Element) === false) {
        setModalOpened(false)
      }
    }

    window.addEventListener('mousedown', releaseOrNot)
    return () => {
      window.removeEventListener('mousedown', releaseOrNot)
    }
  }, [])

  const Modal = ({ children, ...props }: ComponentProps<'div'>): JSX.Element => {
    return (
      <div
        {...props}
        id={`modal-hook-element-[${modalId}]`}
        style={{
          display: modalOpened ? '' : 'none',
          position: 'fixed',
          backgroundColor: theme.color.base,
          border: '1px solid',
          borderColor: theme.color.separator,
          ...(position === 'center'
            ? {
                margin: 'auto',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
              }
            : {
                left: modalPosition.x,
                top: modalPosition.y
              })
        }}
      >
        {children}
      </div>
    )
  }

  return {
    Modal,
    openModal: (event): void => {
      event.preventDefault()
      setModalPosition({
        x: event.clientX,
        y: event.clientY
      })
      setModalOpened(true)
    }
  }
}
