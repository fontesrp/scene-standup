const max8Bit = 0xff

const clamp8Bit = (input: number, min: number, max: number): number =>
  Math.floor((input * (max - min)) / max8Bit + min)

const UNSAFE_generateUUID = () => {
  let d = Date.now()
  let d2 = (global.performance?.now?.() || 0) * 1e3

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = Math.random() * 16
    if (d > 0) {
      r = (d + r) % 16 | 0
      d = Math.floor(d / 16)
    } else {
      r = (d2 + r) % 16 | 0
      d2 = Math.floor(d2 / 16)
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

const getCrypto = (): Crypto | undefined => {
  let { crypto } = global

  if (!crypto) {
    try {
      crypto = require('node:crypto')
    } catch (err) {
      console.error(err)
    }
  }

  return crypto
}

export const randomUUID = () => {
  const crypto = getCrypto()

  if (crypto?.randomUUID) {
    return crypto.randomUUID()
  }

  if (crypto?.getRandomValues) {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c => {
      const n = Number(c)
      return (n ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (n / 4)))).toString(16)
    })
  }

  return UNSAFE_generateUUID()
}

const randomUint8Arr = (length: number): Uint8Array => {
  const arr = new Uint8Array(length)

  const crypto = getCrypto()

  // Node >= 18
  if (crypto?.getRandomValues) {
    do {
      crypto.getRandomValues(arr)
      // Random values must always be smaller than `max8Bit` to make them
      // interchangeable with those returned by `Math.random`
    } while (arr.includes(max8Bit))
    return arr
  }

  return arr.map(() => Math.floor(Math.random() * max8Bit))
}

export const randomNumericId = () => randomUint8Arr(1)[0]

// Richard Durstenfeld imlementation of Fisher–Yates
export const shuffleInPlace = (arr: any[]): any[] => {
  const randomValues = randomUint8Arr(arr.length)

  randomValues.forEach((rand, i) => {
    const j = clamp8Bit(rand, 0, i + 1)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  })

  return arr
}
