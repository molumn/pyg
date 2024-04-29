import { ReactNode } from 'react'
import { Column } from '../utils/Layout'
import { twMerge } from 'tailwind-merge'
import { themeClass } from '../../../utils'
import { StarterSidebarOptions } from '../../../hooks'
import { hash } from '../../../../../shared/hash'

type StarterSidebarProps = {
  options: StarterSidebarOptions,
  updateOptions: (updater: (options: StarterSidebarOptions) => StarterSidebarOptions) => void
}

export const StarterSidebar = ({ options, updateOptions }: StarterSidebarProps): ReactNode => {
  return (
    <Column className={twMerge('w-[280px] px-2 py-3', themeClass.dust.start.sidebar)}>
      {
        options.layout.map((buttonName) => {
          return <button key={hash(`starter-sidebar-buttons-${buttonName}`)} className={twMerge(options.focus === buttonName ? 'bg-dust-concentrate' : 'bg-transparent')} onClick={() => updateOptions(options => {
            options.focus = buttonName
            return options
          })}>
            {buttonName}
          </button>
        })
      }
    </Column>
  )
}
