"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tetrominos_1 = require("./tetrominos");
var size = {
    "box": 20,
    "fieldX": 10,
    "fieldY": 20,
};
var control = {
    "start": document.getElementById("start"),
};
var init = function () {
    var stage = new createjs.Stage("canvas");
    var gameField = new createjs.Shape();
    gameField.graphics.beginStroke("Dark").setStrokeStyle(3, 2);
    gameField.graphics.rect(0, 0, size.box * size.fieldX, size.box * size.fieldY);
    stage.addChild(gameField);
    var child = new createjs.Shape();
    child.graphics.beginFill("Dark");
    child.graphics.rect(0, 0, size.box, size.box);
    stage.addChild(child);
    // play
    // control.start?.addEventListener("click", play);
    // function play(){
    // }
    console.log(tetrominos_1.default[0]);
    stage.update();
};
window.addEventListener('load', init);
