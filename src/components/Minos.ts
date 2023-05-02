import { tetrominos } from "./block/tetrominos";
import { size } from "./block/sizeConfig";

export class Minos extends createjs.Container{
    // private point: createjs.Shape;
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

        // // test
        // this.point = new createjs.Shape();
        // this.point.graphics.beginFill("dark")
        //                 .drawRect(0, 0, 30, 30)
        // this.addChild(this.point)
    }

    public move(keyDown: KeyboardEvent): void{
        switch(keyDown.code){
            case("ArrowRight"):
                this.x += size.box;
                break;
            case("ArrowLeft"):
                this.x -= size.box;
                break;
            case("ArrowDown"):
                this.y += size.box;
                break;
            case("ArrowUp"):
                this.y -= size.box;
                // this.rotation += 90;
                break;
        }
    }

}