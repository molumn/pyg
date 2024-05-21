import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export * from './useTabs'
export * from './useThemeContext'
export * from './useSelectedFileContent'
export * from './useProjectFolderStructure'
export * from './useWorkspaceTitleBarButtons'
