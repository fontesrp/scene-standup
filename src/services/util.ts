const max8Bit = 0xff

const clamp8Bit = (input: number, min: number, max: number): number =>
  Math.floor((input * (max - min)) / max8Bit + min)

const randomUint8Arr = (length: number): Uint8Array => {
  const arr = new Uint8Array(length)

  let { crypto } = global

  if (!crypto) {
    try {
      crypto = require('node:crypto')
    } catch (err) {
      console.error(err)
    }
  }

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

// Richard Durstenfeld imlementation of Fisher–Yates
export const shuffleInPlace = (arr: [any]): [any] => {
  const randomValues = randomUint8Arr(arr.length)

  randomValues.forEach((rand, i) => {
    const j = clamp8Bit(rand, 0, i + 1)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  })

  return arr
}
