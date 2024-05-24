import { ComponentProps, useState } from 'react'
import { Button } from '@view/ui'
import { twMerge } from 'tailwind-merge'

type TabButtonType<CategorizedName extends string> = {
  name: CategorizedName
  icon: JSX.Element
}

export const useTabController = <CategorizedName extends string = string>(
  tabButtons: TabButtonType<CategorizedName>[],
  releasable = false
): {
  checkFocused: (tabName: CategorizedName) => boolean
  tabButtons: TabButtonType<CategorizedName>[]
  TabButton: (props: { button: TabButtonType<CategorizedName> } & ComponentProps<'button'>) => JSX.Element
} => {
  const [focusedTabButtonName, setFocusedTabButtonName] = useState<CategorizedName | undefined>(tabButtons[0]?.name)

  const TabButton = ({ button, className, ...buttonProps }: { button: TabButtonType<CategorizedName> } & ComponentProps<'button'>): JSX.Element => {
    return (
      <Button
        className={twMerge('centralize', className)}
        {...buttonProps}
        onClick={(): void => {
          if (releasable) setFocusedTabButtonName(focusedTabButtonName === button.name ? undefined : button.name)
          else setFocusedTabButtonName(button.name)
        }}
      >
        {button.icon}
      </Button>
    )
  }

  const checkFocused = (tabName: CategorizedName): boolean => focusedTabButtonName === tabName

  return {
    checkFocused,
    tabButtons,
    TabButton
  }
}
