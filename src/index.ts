const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
const fieldRow: number = 10;
const fieldCol: number = 20;
const blockSize: number = 30;

const canvasSizeX: number = fieldRow * blockSize;
const canvasSizeY: number = fieldCol * blockSize;
canvas.width = canvasSizeX;
canvas.height = canvasSizeY;
canvas.style.border = "3px solid #555"

const gameBoard: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");
gameBoard.lineWidth = 10

const mino: Array<Array<number>> = [
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0]
]

for(let i = 0; i < mino.length; i++){
    for(let j = 0; j < 4; j++){
        if(mino[i][j]){
            let px = j * blockSize
            let py = i * blockSize
            gameBoard.fillStyle = "red";
            gameBoard.fillRect(px,py, blockSize, blockSize);
        }
    }
}

const total: number = 0;

const score: HTMLHeadingElement = <HTMLHeadingElement>document.getElementById("score") 
score.innerHTML = `score: ${total}`;
