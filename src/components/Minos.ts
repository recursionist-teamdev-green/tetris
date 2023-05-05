import { tetrominos } from "./block/tetrominos";
import { size } from "./block/sizeConfig";

export class Minos extends createjs.Container{
    constructor(){
        super()
        this.createMino();
    }

    public createMino(){
        const randomNum: number = Math.floor(Math.random() * 7)
        const template = tetrominos[randomNum]
        
        for(let i = 0; i < template.shape.length; i++){
            for(let j = 0; j < template.shape[i].length; j++){
                if(template.shape[i][j]){
                    let box = new createjs.Shape();
                    box.graphics.beginFill(template.color).rect(0, 0, size.box, size.box); 
                    box.x = j * size.box
                    box.y = i * size.box
                    this.addChild(box)
                }
            }
        }
        this.x = 40
    }

    public getMinosBottom(): number{
        let resList = []
        for(let child of this.children){
            resList.push((this.y + child.y) / size.box)
        }
        return Math.max(...resList)
    }

}