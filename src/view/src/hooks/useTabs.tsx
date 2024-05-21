import { ComponentProps, useState } from 'react'

import { twMerge } from 'tailwind-merge'

import { FocusableButton } from '@view/ui'

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
      <FocusableButton
        focused={name === selectedTab}
        key={`tab-button-name-${name}`}
        className={twMerge('centralize', className)}
        onClick={onTabClick(name)}
        {...props}
      >
        {children}
      </FocusableButton>
    )
  }

  return {
    selectedTab,
    checkTab,
    TabButton
  }
}
