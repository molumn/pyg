const FontSizeDict: {
  [size in TextProps['size']]: string
} = {
  '3xs': '0.6rem',
  '2xs': '0.7rem',
  xs: '0.8rem',
  sm: '0.9rem',
  md: '1rem',
  lg: '1.1rem',
  xl: '1.2rem',
  '2xl': '1.4rem',
  '3xl': '1.6rem',
  '4xl': '2rem'
}
export type TextProps = {
  size: '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  children: string
}
export const Text = ({ size, ...props }: TextProps): JSX.Element => {
  return (
    <p
      style={{
        fontSize: FontSizeDict[size]
      }}
      {...props}
    />
  )
}
