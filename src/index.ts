import TETROMINOS from './tetrominos';
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

createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;
createjs.Ticker.setFPS(1);

createjs.Ticker.addEventListener("tick", () => {
    gameManager.update();
    stage.update();
});

if (control.pause !== null) {
    control.pause.addEventListener('click', () => {
        console.log('pause button clicked');
    });
}

if (control.start !== null) {
    control.start.addEventListener('click', () => {
        // gameManager.Start();
                console.log('start button clicked');
    });
}

if (control.retry !== null) {
    control.retry.addEventListener('click', () => {
        console.log('retry button clicked');
    });
}

// switch (true){
//     case control.pause !== null:
//         control.pause?.addEventListener('click', 
//         () => {
//             console.log('pause button clicked');
//         });
//         break;

//     case control.start !== null:
//         control.start?.addEventListener('click', 
//         () => {
//             console.log('start button clicked');
//         });
//         break;

//     case control.retry !== null:
//         control.retry?.addEventListener('click', 
//         () => {
//             console.log('retry button clicked');
//         });
//         break;
// }

window.addEventListener('load', init)
