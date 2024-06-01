import { ModalType, registerModal } from '@view/store'
import { useAppDispatch } from '@view/hooks/hook'

export const useModalRegister = (): {
  registerModal: (type: ModalType) => () => void
  unregisterModal: () => () => void
} => {
  const dispatcher = useAppDispatch()

  return {
    registerModal: (type: ModalType) => () => dispatcher(registerModal(type)),
    unregisterModal: () => () => dispatcher(registerModal(undefined))
  }
}
