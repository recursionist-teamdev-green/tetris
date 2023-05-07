import { Minos } from "./components/Minos";
import { size } from "./components/block/sizeConfig";
import { tetrominos } from "./components/block/tetrominos";

class GameField {
    private fieldX: number;
    private fieldY: number;
    private field: number[][];
    private colorDict: Map<number, string>;

    constructor(fieldX: number, fieldY: number) {
        this.fieldX = fieldX;
        this.fieldY = fieldY;
        this.field = [];
        this.colorDict = new Map<number, string>();

        this.init();
    }

    public init() {
        //GameFieldを空にする処理を記述する
        this.field = [];
        for (let y = 0; y < this.fieldY; y++) {
            this.field[y] = [];
            for (let x = 0; x < this.fieldX; x++) {
                this.field[y][x] = 0;
            }
        }
    }

    public getState(): number[][]{
        return this.field;
    }

    public setState(mino: Minos): void{
        let x: number = 0;
        let y: number = 0;
        const color = mino.getColor();
        if(!this.colorDict.has(mino.getType())) this.colorDict.set(mino.getType(), mino.getColor())
        for (let child of mino.children) {
            x = (mino.x + child.x) / size.box;
            y = (mino.y + child.y) / size.box;
            this.field[y][x] = (mino.getType());
        }
    }

    public drawField(stage: createjs.Stage) {
        for (let y = 0; y < this.field.length; y++) {
            for (let x = 0; x < this.field[y].length; x++) {
                if (this.field[y][x]) {
                    console.log(x)
                    let box = new createjs.Shape();
                    box.graphics
                        .beginStroke("dark")
                        .setStrokeStyle(1)
                        .beginFill((this.colorDict.get(this.field[y][x]) as string))
                        .rect(0, 0, size.box, size.box);
                    box.x = x * size.box;
                    box.y = y * size.box;
                    stage.addChild(box);
                }
            }
        }
    }

    public getColorDict(){
        return this.colorDict
    }

    public checkRows(): number | null {
        for (let y = 0; y < this.field.length; y++) {
            if (this.field[y].every((value) => value)) return y;
        }
        return null;
    }
}

export default GameField;
