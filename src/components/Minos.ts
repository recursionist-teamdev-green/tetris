import { tetrominos } from "./block/tetrominos";
import { size } from "./block/sizeConfig";

export class Minos extends createjs.Container {
    private color: string
    private randomNum: number
    private shape: number[][]
    
    constructor() {
        super();
        this.randomNum = Math.floor(Math.random() * 7);
        this.color = tetrominos[this.randomNum].color
        this.shape = tetrominos[this.randomNum].shape
        this.createMino();
    }

    public createMino() {
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[i].length; j++) {
                if (this.shape[i][j]) {
                    let box = new createjs.Shape();
                    box.graphics
                        .beginStroke("dark")
                        .setStrokeStyle(1)
                        .beginFill(this.color)
                        .rect(0, 0, size.box, size.box);
                    box.x = j * size.box;
                    box.y = i * size.box;
                    this.addChild(box);
                }
            }
        }
        this.x = 4 * size.box;
    }

    public getMinosBottom(): number {
        let resList = [];
        for (let child of this.children) {
            resList.push((this.y + child.y) / size.box);
        }
        return Math.max(...resList);
    }
}
