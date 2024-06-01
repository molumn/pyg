import { ComponentProps } from 'react'

import { useModalGateKeeper, useModalRegister, useThemeContext } from '@view/hooks'

import { ModalType } from '@view/store'

export const Modal = ({ modalId, children, ...props }: { modalId: ModalType } & ComponentProps<'div'>): JSX.Element => {
  const theme = useThemeContext()
  const { modalOpened } = useModalGateKeeper(modalId)
  const { unregisterModal } = useModalRegister()

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
      onClick={(event): void => {
        if (event.target === event.currentTarget) unregisterModal()()
      }}
    >
      <div
        {...props}
        id={`modal-hook-element-${modalId}`}
        style={{
          zIndex: '999',
          display: modalOpened ? '' : 'none',
          position: 'fixed',
          backgroundColor: theme.color.base,
          border: '1px solid',
          borderColor: theme.color.separator,
          margin: 'auto',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }}
      >
        {children}
      </div>
    </div>
  )
}
