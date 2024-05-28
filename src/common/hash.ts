export type HashCode = string

const md5 = (input: string): string => {
  let a0 = 0x67452301
  let b0 = 0xefcdab89
  let c0 = 0x98badcfe
  let d0 = 0x10325476

  const s: number[] = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6,
    10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
  ]

  const K: number[] = []
  for (let i = 0; i < 64; i++) {
    K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * Math.pow(2, 32))
  }

  function rotateLeft(value: number, shift: number): number {
    return (value << shift) | (value >>> (32 - shift))
  }

  const message: number[] = []
  for (let i = 0; i < input.length * 8; i += 8) {
    message[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32
  }
  message[(input.length * 8) >> 5] |= 0x80 << (input.length * 8) % 32
  message[(((input.length * 8 + 64) >>> 9) << 4) + 14] = input.length * 8

  for (let i = 0; i < message.length; i += 16) {
    let a = a0
    let b = b0
    let c = c0
    let d = d0

    for (let j = 0; j < 64; j++) {
      let f = 0
      let g = 0

      if (j < 16) {
        f = (b & c) | (~b & d)
        g = j
      } else if (j < 32) {
        f = (d & b) | (~d & c)
        g = (5 * j + 1) % 16
      } else if (j < 48) {
        f = b ^ c ^ d
        g = (3 * j + 5) % 16
      } else {
        f = c ^ (b | ~d)
        g = (7 * j) % 16
      }

      const temp = d
      d = c
      c = b
      b = b + rotateLeft(a + f + K[j] + message[i + g], s[j])
      a = temp
    }

    a0 += a
    b0 += b
    c0 += c
    d0 += d
  }

  // 해시 값을 16진수 문자열로 변환하여 반환
  const toHex = (num: number): string => {
    let hex = ''
    for (let i = 0; i < 4; i++) {
      hex += ((num >> (i * 8)) & 0xff).toString(16).padStart(2, '0')
    }
    return hex
  }

  return toHex(a0) + toHex(b0) + toHex(c0) + toHex(d0)
}

type HashAlgorithm = 'md5'

export const hash = (value: string, algorithm: HashAlgorithm = 'md5'): HashCode => {
  let hash = ''
  if (algorithm === 'md5') {
    hash = md5(value)
  }
  return hash
}
