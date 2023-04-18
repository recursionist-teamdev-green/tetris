var sizeConfig = {
    "box": 30,
    "fieldX": 10,
    "fieldY": 20,
};
var stage = new createjs.Stage("canvas");
var init = function () {
    var gameField = new createjs.Shape();
    gameField.graphics.beginStroke("Dark");
    gameField.graphics.setStrokeStyle(3, 2);
    gameField.graphics.rect(0, 0, sizeConfig.box * sizeConfig.fieldX, sizeConfig.box * sizeConfig.fieldY);
    //   const child = new createjs.Shape();
    //   child.graphics.beginFill("Dark"); 
    //   child.graphics.rect(0, 0, 30, 30); 
    //   stage.addChild(child)
    stage.addChild(gameField);
    stage.update();
};
var game = ();
window.addEventListener("load", init);
