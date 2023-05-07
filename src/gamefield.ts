import { Minos } from "./components/Minos";
import { size } from "./components/block/sizeConfig";

class GameField {
    private fieldX: number;
    private fieldY: number;
    public field: number[][];

    constructor(fieldX: number, fieldY: number) {
        this.fieldX = fieldX;
        this.fieldY = fieldY;
        this.field = [];

        this.init();
    }

    public init() {
        //GameFieldを空にする処理を記述する
        for (let y = 0; y < this.fieldY; y++) {
            this.field[y] = [];
            for (let x = 0; x < this.fieldX; x++) {
                this.field[y][x] = 0;
            }
        }
    }

    public getState(): number[][] {
        return this.field;
    }

    public setState(mino: Minos): void{
        let x: number = 0;
        let y: number = 0;
        for (let child of mino.children) {
            x = (mino.x + child.x) / size.box;
            y = (mino.y + child.y) / size.box;
            this.field[y][x] = 1;
        }
    }

    public checkRows(): number | null{
        for(let y = 0; y < this.field.length; y++){
            if(this.field[y].every((value) => value)) return y
        }
        return null
    }
}

export default GameField;
