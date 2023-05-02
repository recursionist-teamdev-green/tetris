import GameField from './gamefield';
import { Minos } from './components/Minos';
import { size } from './components/block/sizeConfig';

type GameState = {
    Gameover: string,
    Playing: string,
    Paused: boolean,
    Init: string
}

const gameState: GameState = {
    "Gameover" : "gameover",
    "Playing" : "playing",
    "Paused" : false,
    "Init" : "init",
}

//init()、start()、pause()、retry()でゲームの進行を管理する
class GameManager {
    private stage: createjs.Stage;
    // private gameField: GameField;
    // private gameState: GameState;
    private gameOver: boolean;
    private score: number;
    private count: number;
    private currentMino: Minos;

    constructor(stage: createjs.Stage) {
        this.stage = stage;
        // this.gameField = new GameField(size.box, size.fieldX, size.fieldY);
        // this.gameState = gameState.Init;
        this.gameOver = false;
        this.score = 0;
        this.count = 0;
        this.currentMino = new Minos();
    }

    public init() {
        //gameFieldの初期化
        // this.gameField.init();
        // this.stage.addChild(this.gameField);
        //スコアの初期化
        this.score = 0;
        //gameStateの初期化
        // this.gameState = GameState.Init;
        //gameoverフラグの初期化
        this.gameOver = false;
        
    }

    public start() {
        //Todo tetromino classをnewする形に変更する
        this.stage.addChild(this.currentMino)
        createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;
        createjs.Ticker.setFPS(1);
        this.stage.update();

        // ポーズの場合、動かさない
        document.addEventListener('keydown', e => {
            if(!gameState.Paused){
                (this.currentMino as Minos).move(e);
                this.stage.update();
            }
            console.log(gameState.Paused)
        })
        
        createjs.Ticker.addEventListener("tick",()=>{
            this.update();
            console.log(this.currentMino.children)
            console.log(this.stage.children)
        });


        // this.changeGameState(GameState.Playing);
    }

    public pause() {
        // this.gameState === GameState.Paused
        //     ? this.gameState = GameState.Playing
        //     : this.gameState = GameState.Paused;
        if(createjs.Ticker.paused){
            console.log("restart")
            createjs.Ticker.init();
            createjs.Ticker.addEventListener('tick', ()=>{this.update();});
            createjs.Ticker.paused = false;
            gameState.Paused = false;
        }else{
            console.log("reset")
            createjs.Ticker.reset();
            createjs.Ticker.paused = true;
            gameState.Paused = true;
        }
    }

    public retry() {
        this.init();
        this.start();
    }

    public update() {
        this.currentMino.y += size.box;
        console.log(this.currentMino.x);
        console.log(this.currentMino.y);
        this.stage.update();

        // gameStageの底辺にする
        if (this.currentMino.y >= 570){
            this.currentMino = new Minos();
            this.stage.addChild(this.currentMino)
        }
    }

    public checkHit() {
        // point = this.currentMino.localToLocal(0,0,this.stage.children)
    }

    public gameEnd() {

    }


    // public changeGameState(gameState: GameState) {
    //     switch (gameState) {
    //         case gameState.Init:
    //             this.init();
    //             break;
    //         case gameState.Playing:
    //             this.update();
    //             break;
    //         case gameState.Gameover:
    //             this.gameEnd();
    //             break;
    //         case gameState.Paused:
    //             this.pause();
    //     }
    // }
}

export default GameManager;