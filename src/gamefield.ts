import { Minos } from "./components/Minos";
import { size } from "./components/block/sizeConfig";

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

    public getState(): number[][] {
        return this.field;
    }

    public setState(mino: Minos): void {
        let x: number = 0;
        let y: number = 0;
        const color = mino.getColor();
        const type = mino.getType();

        // dict追加{type: color}
        if (!this.colorDict.has(type)) this.colorDict.set(type, color);

        // field追加
        for (let child of mino.children) {
            // 座標変換
            x = (mino.x + child.x) / size.box;
            y = (mino.y + child.y) / size.box;

            // 座標にkey追加（描画する際のkey）
            this.field[y][x] = type;
        }
    }

    public drawField(stage: createjs.Stage): void {
        stage.removeAllChildren();
        for (let y = 0; y < this.field.length; y++) {
            for (let x = 0; x < this.field[y].length; x++) {
                if (this.field[y][x]) {
                    let box = new createjs.Shape();
                    box.graphics
                        .beginStroke("dark")
                        .setStrokeStyle(1)
                        .beginFill(
                            this.colorDict.get(this.field[y][x]) as string
                        )
                        .rect(0, 0, size.box, size.box);
                    box.x = x * size.box;
                    box.y = y * size.box;
                    stage.addChild(box);
                }
            }
        }
    }

    public getColorDict(): Map<number, string> {
        return this.colorDict;
    }

    // 削除する行を配列として返す
    public checkRows(): number[] | null {
        const clearY = [];
        for (let y = 0; y < this.field.length; y++) {
            if (this.field[y].every((value) => value)) clearY.push(y);
        }
        return clearY.length == 0 ? null : clearY;
    }

    // field配列の削除と0埋め配列追加
    public clearRows(y: number[]): void {
        for (let ele of y) {
            const newArray = new Array(this.fieldX).fill(0);
            this.field.splice(ele, 1);
            this.field.unshift(newArray);
        }
    }
}

export default GameField;
