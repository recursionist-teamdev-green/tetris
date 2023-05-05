import { Minos } from "./components/Minos";
import { size } from "./components/block/sizeConfig";

class GameField{

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
        for(let y = 0; y < this.fieldY; y++){
            this.field[y] = []
            for(let x = 0; x < this.fieldX; x++){
                this.field[y][x] = 0;
            }
        }
    }
    
    public getState(): number[][]{
        return this.field;
    }

    public setState(mino: Minos): void;
    public setState(x: number, y: number): void;
    public setState(ele1: Minos | number, ele2?: number): void{
        if(typeof ele1 === "number"){
            console.log(`set: (${ele1}, ${ele2})`)
            this.field[(ele2 as number)][ele1] = 1;
        }else{
            let x: number = 0;
            let y: number = 0;
            for(let child of ele1.children){
                x = (ele1.x + child.x) / size.box
                y = (ele1.y + child.y) / size.box
                this.field[y][x] = 1;
            }
        }
    }
}

export default GameField;