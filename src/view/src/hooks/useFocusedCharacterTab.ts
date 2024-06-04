import { useAppDispatch, useAppSelector } from '@view/hooks/hook'
import { CharacterTab, saveTabCharacterContent, selectFocusedCharacterTab } from '@view/store'

export const useFocusedCharacterTab = () => {
  const dispatcher = useAppDispatch()

  return {
    focusedCharacterTab: useAppSelector(selectFocusedCharacterTab),
    saveTabCharacterContent: (tab?: CharacterTab, content?: string): void => {
      console.log('save tab character', tab)
      if (!tab || !content) return
      dispatcher(
        saveTabCharacterContent({
          character: tab.character,
          newContent: content
        })
      )
    },
    saveTabProfileContent: (tab?: CharacterTab, content?: string): void => {
      if (!tab || !content || !tab.profile) return
      dispatcher(
        saveTabCharacterContent({
          character: tab.profile,
          newContent: content
        })
      )
    }
  }
}
