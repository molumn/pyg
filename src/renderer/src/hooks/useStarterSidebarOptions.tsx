import { useState } from 'react'

export type StarterSidebarButton = 'workspace' | 'configuration'

export type StarterSidebarOptions = {
  layout: StarterSidebarButton[],
  focus: StarterSidebarButton
}

export const useStarterSidebarOptions = (): {
  options: StarterSidebarOptions,
  updateOptions: (updater: (options: StarterSidebarOptions) => StarterSidebarOptions) => void
} => {
  const [_options, setOptions] = useState<StarterSidebarOptions>({
    layout: [
      'workspace',
      'configuration'
    ],
    focus: 'workspace'
  })

  const updateOptions = (updater: (options: StarterSidebarOptions) => StarterSidebarOptions): void => {
    const newOptions: StarterSidebarOptions = {
      ..._options
    }
    setOptions(updater(newOptions))
  }

  return {
    options: _options,
    updateOptions,
  }
}
