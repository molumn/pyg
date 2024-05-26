import { ComponentProps, MouseEvent, useEffect, useState } from 'react'
import { useThemeContext } from '@view/hooks/useThemeContext'

export const useModalController = (
  position: 'mouseRelative' | 'center',
  modalId: string
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
      if (document.getElementById(`modal-hook-element-[${modalId}]`)?.contains(event.target) !== true) {
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
        style={{
          zIndex: '900',
          display: modalOpened ? '' : 'none',
          backgroundColor: '#FFFFFF22',
          position: 'fixed',
          width: '100%',
          height: '100%'
        }}
      >
        <div
          {...props}
          id={`modal-hook-element-[${modalId}]`}
          style={{
            zIndex: '999',
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
