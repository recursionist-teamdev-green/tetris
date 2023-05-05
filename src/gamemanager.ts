import GameField from './gamefield';
import { Minos } from './components/Minos';
import { size } from './components/block/sizeConfig';

type GameState = {
    Gameover: boolean,
    Paused: boolean,
}

//init()、start()、pause()、retry()でゲームの進行を管理する
class GameManager {
    private stage: createjs.Stage;
    private gameField: GameField;
    private gameState: GameState;
    private score: number;
    private count: number;
    private currentMino: Minos;

    constructor(stage: createjs.Stage) {
        this.stage = stage;
        this.gameState = {
            "Gameover" : false,
            "Paused" : false,
        };
        this.score = 0;
        this.count = 0;
        this.gameField = new GameField(size.fieldX, size.fieldY);
        this.currentMino = new Minos();
        
    }
    
    public test(){
        const point = new createjs.Shape();
        point.graphics.beginFill("dark").drawRect(0, 0, size.box, size.box)
        point.x = 60;
        point.y = 150
        this.stage.addChild(point)
        this.gameField.setState(point.x / size.box, point.y / size.box);
    }
    
    
    public init() {
        //gameFieldの初期化
        this.gameField.init();
        //スコアの初期化
        this.score = 0;
        //gameStateの初期化
        // this.gameState = GameState.Init;
        //gameoverフラグの初期化
        this.gameState.Gameover = false;
    }
    
    public start() {
        // 黒ポチ
        this.test();

        //Todo tetromino classをnewする形に変更する
        this.stage.addChild(this.currentMino)
        createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;
        createjs.Ticker.setFPS(1);
        this.stage.update();
        
        console.log(`(${this.currentMino.x}, ${this.currentMino.y})`)
        for(let child of this.currentMino.children){
            console.log(`${child.x}, ${child.y}`)
        }
        
        // ポーズの場合、動かさない
        document.addEventListener('keydown', e => {
            if(!this.gameState.Paused){
                switch(e.code){
                    case("ArrowRight"):
                    this.movePiece(1,0);
                    break;
                    case("ArrowLeft"):
                    this.movePiece(-1,0);
                    break;
                    case("ArrowDown"):
                    this.movePiece(0,1);
                    break;
                    case("ArrowUp"):
                    this.movePiece(0,-1);
                    // this.rotation += 90;
                    break;
                }
                this.stage.update();
            }
            console.log(`(${this.currentMino.x}, ${this.currentMino.y})`)
            console.log(this.checkCollision())
        })
          
        // テトリミノが底に着いたら、テトリミノを盤面に配置する
        // if (isGameOver()) {
        //     gameOver();
        // } else if (isPieceBottomedOut()) {
        //     placePiece();
        // }
        
        // // 盤面から行を消去する
        // clearRows();
        
        // 新しいテトリミノを生成する
        if (this.currentMino === null) {
            this.currentMino = new Minos();
        }
          

        // createjs.Ticker.addEventListener("tick",()=>{
        //     this.update();
        //     this.checkHit();
        //     console.log(this.currentMino.children)
        //     console.log(this.stage.children)
        // });


        // this.changeGameState(GameState.Playing);
    }

    public pause() {
        if(createjs.Ticker.paused){
            createjs.Ticker.init();
            createjs.Ticker.addEventListener('tick', ()=>{this.update();});
            createjs.Ticker.paused = false;
            this.gameState.Paused = false;
        }else{
            createjs.Ticker.reset();
            createjs.Ticker.paused = true;
            this.gameState.Paused = true;
        }
    }

    public retry() {
        this.init();
        this.start();
    }

    public update() {
        this.currentMino.y += size.box;
        this.stage.update();

        // gameStageの底辺にする
        if (this.currentMino.y >= 570){
            this.currentMino = new Minos();
            this.stage.addChild(this.currentMino)
        }
    }

    public movePiece(dx: number, dy: number){
        // テトリミノの座標を変更する
        this.currentMino.x += dx * size.box;
        this.currentMino.y += dy * size.box;

        // 移動後のテトリミノの座標において、他のテトリミノや壁との衝突判定を行う
        if (this.checkCollision()) {
            // 衝突した場合、座標を元に戻す
            this.currentMino.x -= dx * size.box;
            this.currentMino.y -= dy * size.box;

            // テトリミノが一番上に到達した場合は、ゲームオーバー
            if (dy === 1) {
            this.gameState.Gameover = true;
            }

            // 一列揃った行がある場合は、その行を消してスコアを加算する
            // clearRows(grid);
        }
    }

    public checkCollision(){
        let x: number = 0;
        let y: number = 0;
        for(let child of this.currentMino.children){
            // fieldの座標へ変換
            x = child.x === 0 ? this.currentMino.x / size.box : (this.currentMino.x + child.x) / size.box
            y = child.y === 0 ? this.currentMino.y / size.box : (this.currentMino.y + child.y) / size.box
            
            console.log(`(${x}, ${y})`)

            // field内に収まってない場合
            if(x < 0 || x >= size.fieldX || y < 0 || y >= size.fieldY){
                return true;
            }

            // 衝突する場合
            if(this.gameField.getState()[y][x] !== 0){
                return true;
            }
        }
        return false;
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