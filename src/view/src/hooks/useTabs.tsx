import { ComponentProps, useState } from 'react'

import { twMerge } from 'tailwind-merge'

export const useTabArea = (
  _tabs: string[],
  ableToEmpty?: boolean
): {
  selectedTab: string
  checkTab: (tab: string) => boolean
  TabButton: (props: { name: string } & ComponentProps<'button'>) => JSX.Element
} => {
  const tabs = _tabs
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0] ?? '')

  const onTabClick = (tab: string) => (): void => {
    if (!tabs.includes(tab)) return
    console.log('check')
    if (ableToEmpty && tab === selectedTab) setSelectedTab('')
    else setSelectedTab(tab)
  }

  const checkTab = (tab: string): boolean => {
    return selectedTab === tab && tabs.includes(tab)
  }

  const TabButton = ({
    name,
    className,
    children,
    ...props
  }: { name: string } & ComponentProps<'button'>): JSX.Element => {
    return (
      <button
        key={`tab-button-name-${name}`}
        className={twMerge(
          'centralize hover:bg-dust-concentrate focus:bg-dust-concentrate',
          name === selectedTab ? 'bg-dust-concentrate' : '',
          className
        )}
        onClick={onTabClick(name)}
        {...props}
      >
        {children}
      </button>
    )
  }

  return {
    selectedTab,
    checkTab,
    TabButton
  }
}
