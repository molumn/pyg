import { ComponentProps, useState } from 'react'
import { Column, Row } from './Layout'
import { twMerge } from 'tailwind-merge'
import { hash } from '../../../../../common/hash'
import { DisplayOptional } from './DisplayOptional'

type TabButtonProps = {
  name: string
}
type TabViewProps = {
  name: string
} & ComponentProps<'div'>
export const TabButton = (props: TabButtonProps): JSX.Element => { return null }
export const TabView = (props: TabViewProps): JSX.Element => { return null }

const TabButtonImpl = ({ sidebarLayout, children, onClick }: { sidebarLayout: 'col' | 'row' } & ComponentProps<'button'>): JSX.Element => {
  let className: string
  if (sidebarLayout === 'row') {
    className = ''
  } else {
    className = ''
  }

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}

export const TabSidebar = (props: ComponentProps<'div'>): JSX.Element => { return null }
export const TabViewArea = (props: ComponentProps<'div'>): JSX.Element => { return null }

type TabSidebarImplProps = {
  layout: 'col' | 'row'
  tabs: string[]
  onTabClick: (tab: string) => void
  focusedTab: string
} & ComponentProps<'div'>
const TabSidebarImpl = ({ layout, tabs, className, focusedTab, onTabClick }: TabSidebarImplProps): JSX.Element => {
  let Layout: (props: ComponentProps<'div'>) => JSX.Element
  if (layout === 'col') Layout = Column
  else Layout = Row

  return (
    <Layout className={twMerge('', className)}>
      {
        tabs.map((tab) => <TabButtonImpl sidebarLayout={layout} key={hash(`tabbable-area-sidebar-tab-${tab}-${Math.random()}`)} onClick={() => onTabClick(tab)}>{tab}</TabButtonImpl>)
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

  console.log(sidebarProps)

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
