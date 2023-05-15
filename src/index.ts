import GameManager from "./gamemanager";
import { size } from "./components/block/sizeConfig";

type Control = {
    start: HTMLElement | null;
    pause: HTMLElement | null;
    retry: HTMLElement | null;
    canvas: HTMLElement | null;
    score: HTMLElement | null;
    mini_canvas: HTMLElement | null;
};

const control: Control = {
    start: document.getElementById("start"),
    pause: document.getElementById("pause"),
    retry: document.getElementById("retry"),
    canvas: document.getElementById("canvas"),
    score: document.getElementById("score"),
    mini_canvas: document.getElementById("miniCanvas"),
};

let gameManager: GameManager;
let stage: createjs.Stage;
let score: createjs.Stage;
let nextMino: createjs.Stage;

const init = () => {
    (control.canvas as HTMLCanvasElement).style.border = "2px solid #555";
    (control.canvas as HTMLCanvasElement).width = size.box * size.fieldX;
    (control.canvas as HTMLCanvasElement).height = size.box * size.fieldY;
    (control.score as HTMLCanvasElement).width = 150;
    (control.score as HTMLCanvasElement).height = 30;

    score = new createjs.Stage("score");
    stage = new createjs.Stage("canvas");
    nextMino = new createjs.Stage("miniCanvas");
  
    (control.mini_canvas as HTMLCanvasElement).style.border = "2px solid #555";
    (control.mini_canvas as HTMLCanvasElement).width = size.box * 4;
    (control.mini_canvas as HTMLCanvasElement).height = size.box * 4;

    gameManager = new GameManager(stage, score,nextMino);
    gameManager.init();
};


(control.pause as HTMLElement).addEventListener("click", () => {
    gameManager.pause();
});

(control.start as HTMLElement).addEventListener("click", () => {
    gameManager.start();
});

(control.retry as HTMLElement).addEventListener("click", () => {
    gameManager.init();
});

window.addEventListener("load", init);
