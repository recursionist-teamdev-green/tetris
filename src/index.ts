import TETROMINOS from './tetrominos';

type Size = {box: number, fieldX: number, fieldY: number};
type Control = {start: HTMLElement | null}

const size: Size = {
    "box": 20,
    "fieldX": 10,
    "fieldY": 20,
}

const control: Control = {
    "start": document.getElementById("start"),
}

const init = () => {
    const stage = new createjs.Stage("canvas");
    const gameField = new createjs.Shape();
    gameField.graphics.beginStroke("Dark").setStrokeStyle(3,2); 
    gameField.graphics.rect(0, 0, size.box * size.fieldX, size.box * size.fieldY);
    stage.addChild(gameField); 
    
    const child = new createjs.Shape();
    child.graphics.beginFill("Dark"); 
    child.graphics.rect(0, 0, size.box, size.box); 
    stage.addChild(child)

    // play
    // control.start?.addEventListener("click", play);
    // function play(){

    // }
    console.log(TETROMINOS[0])

    
    stage.update();
}

window.addEventListener('load',init)
