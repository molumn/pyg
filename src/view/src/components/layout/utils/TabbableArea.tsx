import { ComponentProps, useState } from 'react'
import { Column, Row } from './Layout'
import { twMerge } from 'tailwind-merge'
import { hash } from '../../../../../common/hash'

type TabButtonProps = {
  name: string
  activateClassName?: string
} & ComponentProps<'button'>
type TabViewProps = {
  name: string
} & ComponentProps<'div'>
export const TabButton = (props: TabButtonProps): JSX.Element => {
  return null
}
export const TabView = (props: TabViewProps): JSX.Element => {
  return null
}

const TabButtonImpl = ({
  sidebarLayout,
  className,
  children,
  onClick,
  ...props
}: { sidebarLayout: 'col' | 'row' } & ComponentProps<'button'>): JSX.Element => {
  let defaultClassName = 'centralize'
  if (sidebarLayout === 'row') {
    defaultClassName += ''
  } else {
    defaultClassName += ''
  }

  return (
    <button
      className={twMerge(
        'hover:bg-dust-concentrate focus:bg-dust-concentrate',
        defaultClassName,
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export const TabSidebar = (props: ComponentProps<'div'>): JSX.Element => {
  return null
}
export const TabViewArea = (props: ComponentProps<'div'>): JSX.Element => {
  return null
}

type TabSidebarImplProps = {
  layout: 'col' | 'row'
  tabButtons: [string, JSX.Element][]
  buttonActivatedClassName: string
  ableToEmpty: boolean
  onTabClick: (tab: string) => void
  focusedTab: string
} & ComponentProps<'div'>
const TabSidebarImpl = ({
  layout,
  tabButtons,
  buttonActivatedClassName,
  ableToEmpty,
  focusedTab,
  onTabClick,
  className
}: TabSidebarImplProps): JSX.Element => {
  let Layout: (props: ComponentProps<'div'>) => JSX.Element
  if (layout === 'col') Layout = Column
  else Layout = Row

  return (
    <Layout className={twMerge('', className)}>
      {tabButtons.map((tab) => (
        <TabButtonImpl
          sidebarLayout={layout}
          key={hash(`tabbable-area-sidebar-tab-${tab[0]}-${Math.random()}`)}
          className={twMerge(tab[0] === focusedTab ? buttonActivatedClassName : '')}
          onClick={(): void => {
            if (ableToEmpty && focusedTab === tab[0]) onTabClick(null)
            else onTabClick(tab[0])
          }}
          {...tab[1].props}
        />
      ))}
    </Layout>
  )
}

type TabbableAreaProps = {
  layout?: 'col' | 'row'
  ableToEmpty?: boolean
} & ComponentProps<'div'>
export const TabbableArea = ({
  layout,
  ableToEmpty,
  className,
  children
}: TabbableAreaProps): JSX.Element => {
  if (!Array.isArray(children)) return null

  const sidebar = (children as JSX.Element[])[0]
  const view = (children as JSX.Element[])[1]

  if (typeof sidebar.type === 'string' && typeof view.type === 'string') return null
  if (sidebar.type.name !== 'TabSidebar' && view.type.name !== 'TabViewArea') return null

  const sidebarProps: ComponentProps<'div'> = sidebar.props
  const viewProps: ComponentProps<'div'> = view.props

  let tabButtonProps: JSX.Element[]
  let viewOptionProps: JSX.Element[]

  if (Array.isArray(sidebarProps.children)) {
    tabButtonProps = sidebarProps.children as JSX.Element[]
  } else {
    tabButtonProps =
      sidebarProps.children === undefined ? [] : [sidebarProps.children as JSX.Element]
  }
  if (Array.isArray(viewProps.children)) {
    viewOptionProps = viewProps.children as JSX.Element[]
  } else {
    viewOptionProps = viewProps.children === undefined ? [] : [viewProps.children as JSX.Element]
  }

  const tabs: string[] = tabButtonProps.map((element) => element.props.name)
  const tabButtons: [string, JSX.Element][] = tabButtonProps.map((element) => [
    element.props.name,
    element
  ])
  const views: { [name: string]: JSX.Element } = {}

  for (const jsxElement of viewOptionProps) {
    views[jsxElement.props.name] = jsxElement.props.children
  }

  let Layout: (props: ComponentProps<'div'>) => JSX.Element
  if (layout === 'row') Layout = Row
  else Layout = Column

  const [focusedTab, setFocusedTab] = useState<string | null>(tabs.length !== 0 ? tabs[0] : null)

  const sidebarImplProps: TabSidebarImplProps = {
    ...sidebarProps,
    layout: layout === 'row' ? 'col' : 'row',
    tabButtons,
    buttonActivatedClassName: tabButtonProps[0]?.props?.activateClassName ?? '',
    ableToEmpty: ableToEmpty === true,
    focusedTab,
    onTabClick: setFocusedTab
  }

  return (
    <Layout
      className={twMerge(
        layout === 'row'
          ? 'w-full h-full flex flex-row bg-transparent'
          : 'w-full h-full flex flex-col bg-transparent',
        className
      )}
    >
      {TabSidebarImpl(sidebarImplProps)}
      {focusedTab !== null ? <div className={viewProps.className}>{views[focusedTab]}</div> : <></>}
    </Layout>
  )
}
