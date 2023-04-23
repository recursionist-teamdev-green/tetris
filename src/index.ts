import { size } from "./components/block/sizeConfig";
import { Minos } from "./components/Minos";

type Control = {start: HTMLElement | null}

const control: Control = {
    "start": document.getElementById("start"),
}

const init = () => {
    const stage = new createjs.Stage("canvas");
    const gameField = new createjs.Shape();
    gameField.graphics.beginStroke("Dark").setStrokeStyle(5); 
    gameField.graphics.rect(0, 0, size.box * size.fieldX, size.box * size.fieldY);
    stage.addChild(gameField); 
    stage.update();
    

    const mino = new Minos();
    stage.addChild(mino)

    document.addEventListener('keydown', e => {
        mino.move(e);
        stage.update();
    })

    stage.update();
    
}

window.addEventListener('load',init)
