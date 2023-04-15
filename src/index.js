var canvas = document.getElementById("canvas");
var fieldRow = 10;
var fieldCol = 20;
var blockSize = 30;
var canvasSizeX = fieldRow * blockSize;
var canvasSizeY = fieldCol * blockSize;
canvas.width = canvasSizeX;
canvas.height = canvasSizeY;
canvas.style.border = "3px solid #555";
var gameBoard = canvas.getContext("2d");
gameBoard.lineWidth = 10;
var mino = [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
];
for (var i = 0; i < mino.length; i++) {
    for (var j = 0; j < 4; j++) {
        if (mino[i][j]) {
            var px = j * blockSize;
            var py = i * blockSize;
            gameBoard.fillStyle = "red";
            gameBoard.fillRect(px, py, blockSize, blockSize);
        }
    }
}
var total = 0;
var score = document.getElementById("score");
score.innerHTML = "score: ".concat(total);
