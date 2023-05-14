import { tetrominos } from "./block/tetrominos";
import { size } from "./block/sizeConfig";

type Template = {
    shape: number[][];
    color: string;
    type: number;
};

export class Minos extends createjs.Container {
    private randomNum: number;
    private template: Template;
    private color: string;
    private shape: number[][];
    private type: number;

    constructor() {
        super();
        this.randomNum = Math.floor(Math.random() * 7);
        this.template = tetrominos[this.randomNum];
        this.color = this.template.color;
        this.shape = this.template.shape;
        this.type = this.template.type;
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
        this.x = 1 * size.box;
        this.y = 0;
    }

    // 子要素を移動
    public rotate(value: number): void{
        // valueが正の場合、時計回り
        if(value > 0){
            for(let child of this.children){
                const x = child.x / size.box
                const y = child.y / size.box
                
                child.x = (3 - y - 1) * size.box;
                child.y = x * size.box;
            }
        // valueが負の場合、反時計回り
        }else{
            for(let child of this.children){
                const x = child.x / size.box
                const y = child.y / size.box
                
                child.x = y * size.box;                
                child.y = (3 - x - 1) * size.box;
            }
        }
    }

    public getMinosBottom(): number {
        let resList = [];
        for (let child of this.children) {
            resList.push((this.y + child.y) / size.box);
        }
        return Math.max(...resList);
    }

    public getType(): number {
        return this.type;
    }

    public getColor(): string {
        return this.color;
    }
}
