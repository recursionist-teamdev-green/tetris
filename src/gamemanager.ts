import GameField from './gamefield';

enum GameState {
    Gameover = "gameover",
    Playing = "playing",
    Paused = "paused",
    Init = "init",
}

let child: createjs.Shape;

//init()、start()、pause()、retry()でゲームの進行を管理する
class GameManager {
    private stage: createjs.Stage;
    private gameField: GameField;
    private gameState: GameState;
    private gameOver: boolean;
    private score: number;
    private count: number = 0;

    constructor(stage: createjs.Stage) {
        this.stage = stage;
        this.gameField = new GameField(20, 10, 20);
        this.gameState = GameState.Init;
        this.gameOver = false;
        this.score = 0;
        this.count = 0;
    }

    public init() {
        //gameFieldの初期化
        this.gameField.init();
        this.stage.addChild(this.gameField);
        //スコアの初期化
        this.score = 0;
        //gameStateの初期化
        this.gameState = GameState.Init;
        //gameoverフラグの初期化
        this.gameOver = false;

        //Todo tetromino classをnewする形に変更する
        child = new createjs.Shape();
        child.graphics.beginFill("Dark");
        child.graphics.rect(10, 10, 10, 10);
        this.stage.addChild(child)
    }

    public Start() {
        // this.changeGameState(GameState.Playing);
    }

    public pause() {
        this.gameState === GameState.Paused
            ? this.gameState = GameState.Playing
            : this.gameState = GameState.Paused;
    }

    public retry() {
        this.init();
        this.Start();
    }

    public update() {
        this.count = this.count + 10;
        child.y = this.count;
        console.log(child.y);
        console.log(child.x);

        // gameStageの底辺にする
        // if (child.y = 390) {
        //     this.gameState = GameState.Gameover;
        // }
    }

    public gameEnd() {

    }


    public changeGameState(gameState: GameState) {
        switch (gameState) {
            case GameState.Init:
                this.init();
                break;
            case GameState.Playing:
                this.update();
                break;
            case GameState.Gameover:
                this.gameEnd();
                break;
            case GameState.Paused:
                this.pause();
        }
    }
}

export default GameManager;