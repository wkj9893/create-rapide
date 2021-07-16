
//  https://github.com/marvinhagemeister/kolorist/blob/main/src/index.ts
export default function color(
    start:number,
    end:number
) {
    return (str:string) => {
        return `\x1b[${start}m${str}\x1b[${end}m`
    };
}

export const green = color(32, 39);
export const yellow = color(33, 39);
export const blue = color(34, 39);



export const lightGreen = color(92, 39);
export const lightYellow = color(93, 39);
export const lightBlue = color(94, 39);

