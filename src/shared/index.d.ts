import { HashCode } from './hash'

declare global {
  interface String {
    hashCode: () => HashCode
  }
}
