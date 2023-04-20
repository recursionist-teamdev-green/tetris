import TETROMINOS from "./block/tetrominos";

export class Minos extends createjs.Shape{
    constructor(){
        super()
        const randomNum: number = Math.floor(Math.random() * 8)
        const mino = TETROMINOS[randomNum]
    }

}