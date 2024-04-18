import * as crypto from 'crypto'

export type HashCode = string

export const hash = (value: string): HashCode => {
  const hash = crypto.createHash('md5')
  hash.update(value)
  return hash.digest('hex')
}
