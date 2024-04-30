import React from 'react'

import { hash } from '../../../../../common/hash'

import { twMerge } from 'tailwind-merge'
import { themeClass } from '../../../utils'

import { StarterSidebarOptions } from '../../../hooks'

import { Column } from '../utils/Layout'

type StarterSidebarProps = {
  options: StarterSidebarOptions
  updateOptions: (updater: (options: StarterSidebarOptions) => StarterSidebarOptions) => void
}

export const StarterSidebar = ({ options, updateOptions }: StarterSidebarProps): JSX.Element => {
  return (
    <Column className={twMerge('w-[280px] px-2 py-3', themeClass.dust.start.sidebar)}>
      {options.layout.map((buttonName) => {
        return (
          <button
            key={hash(`starter-sidebar-buttons-${buttonName}`)}
            className={twMerge(
              options.focus === buttonName ? 'bg-dust-concentrate' : 'bg-transparent'
            )}
            onClick={(): void =>
              updateOptions((options) => {
                options.focus = buttonName
                return options
              })
            }
          >
            {buttonName}
          </button>
        )
      })}
    </Column>
  )
}
