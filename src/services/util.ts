const max8Bit = 0xff

const randomUint8 = (): number => {
  const arr = new Uint8Array(1)

  let { crypto } = global

  if (!crypto) {
    try {
      crypto = require('node:crypto')
    } catch (err) {
      console.error(err)
    }
  }

  if (crypto) {
    crypto.getRandomValues(arr)
    return arr[0]
  }

  return Math.floor(Math.random() * max8Bit)
}

const randomUint8Between = (min: number, max: number): number => {
  let rand

  do {
    rand = randomUint8()
  } while (rand === max8Bit)

  return Math.floor((rand * (max - min)) / max8Bit + min)
}

// Richard Durstenfeld imlementation of Fisher–Yates
export const shuffleInPlace = (arr: [any]): [any] => {
  for (let i = 0; i < arr.length; i++) {
    const j = randomUint8Between(0, i + 1)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
