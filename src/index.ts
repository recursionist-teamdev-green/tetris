import GameManager from './gamemanager';

type Control = {
    start: HTMLElement | null;
    pause: HTMLElement | null;
    retry: HTMLElement | null;
}

const control: Control = {
    "start": document.getElementById("start"),
    "pause": document.getElementById("pause"),
    "retry": document.getElementById("retry"),
}

let gameManager: GameManager;
let stage: createjs.Stage;

const init = () => {
    stage = new createjs.Stage("canvas");
    gameManager = new GameManager(stage);
    gameManager.init();
    stage.update();
}


(control.pause as HTMLElement).addEventListener('click', () => {
    gameManager.pause();
    console.log('pause button clicked');
});


(control.start as HTMLElement).addEventListener('click', () => {
    gameManager.start();
    console.log('start button clicked');
});


(control.retry as HTMLElement).addEventListener('click', () => {
    gameManager.retry();
    console.log('retry button clicked');
});


window.addEventListener('load', init)
