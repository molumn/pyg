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
export const TabButton = (props: TabButtonProps): JSX.Element => { return null }
export const TabView = (props: TabViewProps): JSX.Element => { return null }

const TabButtonImpl = ({ sidebarLayout, className, children, onClick, ...props }: { sidebarLayout: 'col' | 'row' } & ComponentProps<'button'>): JSX.Element => {
  let defaultClassName: string
  if (sidebarLayout === 'row') {
    defaultClassName = ''
  } else {
    defaultClassName = ''
  }

  return (
    <button className={twMerge('hover:bg-dust-concentrate focus:bg-dust-concentrate', defaultClassName, className)} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

export const TabSidebar = (props: ComponentProps<'div'>): JSX.Element => { return null }
export const TabViewArea = (props: ComponentProps<'div'>): JSX.Element => { return null }

type TabSidebarImplProps = {
  layout: 'col' | 'row'
  tabs: string[]
  buttonActivatedClassName: string
  onTabClick: (tab: string) => void
  focusedTab: string
} & ComponentProps<'div'>
const TabSidebarImpl = ({ layout, tabs, buttonActivatedClassName, focusedTab, onTabClick, className }: TabSidebarImplProps): JSX.Element => {
  let Layout: (props: ComponentProps<'div'>) => JSX.Element
  if (layout === 'col') Layout = Column
  else Layout = Row

  return (
    <Layout className={twMerge('', className)}>
      {
        tabs.map((tab) => <TabButtonImpl sidebarLayout={layout} key={hash(`tabbable-area-sidebar-tab-${tab}-${Math.random()}`)} className={twMerge(tab === focusedTab ? buttonActivatedClassName : '')} onClick={() => onTabClick(tab)}>{tab}</TabButtonImpl>)
      }
    </Layout>
  )
}

type TabbableAreaProps = {
  layout?: 'col' | 'row'
} & ComponentProps<'div'>
export const TabbableArea = ({ layout, className, children }: TabbableAreaProps): JSX.Element => {
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
    tabButtonProps = sidebarProps.children === undefined ? [] : [sidebarProps.children as JSX.Element]
  }
  if (Array.isArray(viewProps.children)) {
    viewOptionProps = viewProps.children as JSX.Element[]
  } else {
    viewOptionProps = viewProps.children === undefined ? [] : [viewProps.children as JSX.Element]
  }

  const tabs: string[] = tabButtonProps.map((element) => element.props.name)
  const views: { [name: string]: JSX.Element } = {}

  for (const jsxElement of viewOptionProps) {
    views[jsxElement.props.name] = jsxElement.props.children
  }

  let Layout: (props: ComponentProps<'div'>) => JSX.Element
  if (layout === 'row') Layout = Row
  else Layout = Column

  const [focusedTab, setFocusedTab] = useState<string|null>(tabs.length !== 0 ? tabs[0] : null)

  const sidebarImplProps: TabSidebarImplProps = {
    ...sidebarProps,
    layout: layout === 'row' ? 'col' : 'row',
    tabs,
    buttonActivatedClassName: tabButtonProps[0].props.activateClassName,
    focusedTab,
    onTabClick: setFocusedTab
  }

  return (
    <Layout className={twMerge(layout === 'row' ? 'w-full h-full flex flex-row bg-transparent' : 'w-full h-full flex flex-col bg-transparent', className)}>
      {TabSidebarImpl(sidebarImplProps)}
      <div className={viewProps.className}>{views[focusedTab]}</div>
    </Layout>
  )
}
