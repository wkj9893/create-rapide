//  https://github.com/marvinhagemeister/kolorist/blob/main/src/index.ts
function color(start: number, end: number) {
  return (str: string) => {
    return `\x1b[${start}m${str}\x1b[${end}m`
  }
}

const lightBlue = color(94, 39)
const lightGreen = color(92, 39)
const lightYellow = color(93, 39)

export { lightBlue, lightGreen, lightYellow }
