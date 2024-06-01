import { useAppSelector } from '@view/hooks/hook'
import { ModalType, selectModalIsOpened, selectModalType } from '@view/store/stateModalManager'

export const useModalGateKeeper = (
  modalId: ModalType
): {
  modalOpened: boolean
} => {
  const modalOpened = useAppSelector(selectModalIsOpened)
  const modalType = useAppSelector(selectModalType)

  return {
    modalOpened: modalOpened && modalType === modalId
  }
}
