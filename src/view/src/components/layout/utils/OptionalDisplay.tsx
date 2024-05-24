export const OptionalDisplay = ({ display = false, children }: { display?: boolean; children: JSX.Element }): JSX.Element => {
  if (display) return <>{children}</>
  else return <></>
}
