import { useAppDispatch, useAppSelector } from '@view/hooks/hook'
import { focusCharacterTabByPath, selectFocusedCharacterTab, selectRegisteredCharacterTabs, unregisterCharacterTabByCharacterPath } from '@view/store'

export const useRegisteredCharacterTabs = () => {
  const dispatcher = useAppDispatch()

  return {
    registeredCharacterTabs: useAppSelector(selectRegisteredCharacterTabs),
    focusedCharacterTab: useAppSelector(selectFocusedCharacterTab),
    unregisterCharacterTab: (path: string): void => {
      dispatcher(unregisterCharacterTabByCharacterPath(path))
    },
    focusCharacterTab: (path: string): void => {
      dispatcher(focusCharacterTabByPath(path))
    }
  }
}
