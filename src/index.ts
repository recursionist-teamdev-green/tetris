import GameManager from "./gamemanager";
import { size } from "./components/block/sizeConfig";

type Control = {
    start: HTMLElement | null;
    pause: HTMLElement | null;
    retry: HTMLElement | null;
    canvas: HTMLElement | null;
    score: HTMLElement | null;
};

const control: Control = {
    start: document.getElementById("start"),
    pause: document.getElementById("pause"),
    retry: document.getElementById("retry"),
    canvas: document.getElementById("canvas"),
    score: document.getElementById("score"),
};

let gameManager: GameManager;
let stage: createjs.Stage;
let score: createjs.Stage;

const init = () => {
    (control.canvas as HTMLCanvasElement).style.border = "2px solid #555";
    (control.canvas as HTMLCanvasElement).width = size.box * size.fieldX;
    (control.canvas as HTMLCanvasElement).height = size.box * size.fieldY;
    (control.score as HTMLCanvasElement).width = 150;
    (control.score as HTMLCanvasElement).height = 30;

    score = new createjs.Stage("score");
    stage = new createjs.Stage("canvas");
    gameManager = new GameManager(stage, score);
    gameManager.init();

};

(control.pause as HTMLElement).addEventListener("click", () => {
    gameManager.pause();
    console.log("pause button clicked");
});

(control.start as HTMLElement).addEventListener("click", () => {
    gameManager.start();
    console.log("start button clicked");
});

(control.retry as HTMLElement).addEventListener("click", () => {
    gameManager.retry();
    console.log("retry button clicked");
});

window.addEventListener("load", init);
