type GapProps = {
  gap: number | string
}
export const Gap = ({ gap }: GapProps) => {
  return (
    <div
      style={{
        width: gap,
        height: gap
      }}
    />
  )
}
