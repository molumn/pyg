import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export * from './workspace'

export * from './useProjectFileStructure'
export * from './useTabs'
export * from './useSelectedFileContent'
export * from './useThemeContext'
