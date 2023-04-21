import { tetrominos } from "./block/tetrominos";
import { size } from "./block/sizeConfig";

export class Minos extends createjs.Container{
    constructor(){
        super()
        const randomNum: number = Math.floor(Math.random() * 7)
        const template = tetrominos[randomNum]
        
        for(let i = 0; i < template.shape.length; i++){
            for(let j = 0; j < template.shape[i].length; j++){
                if(template.shape[i][j]){
                    let box = new createjs.Shape();
                    let px = j * size.box
                    let py = i * size.box
                    box.graphics.beginFill(template.color); 
                    box.graphics.rect(px, py, size.box, size.box); 
                    this.addChild(box)
                }
            }
        }
    }

    move(keyDown: KeyboardEvent): void{
        if(keyDown.code == "ArrowRight") this.x += size.box;
        else if(keyDown.code == "ArrowLeft") this.x -= size.box;
        else if(keyDown.code == "ArrowDown") this.y += size.box;
    }

}