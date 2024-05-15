export const DisplayOptional = ({
  display = false,
  children
}: {
  display?: boolean
  children: JSX.Element
}): JSX.Element => {
  if (display) return <>{children}</>
  else return <></>
}
