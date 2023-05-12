import GameField from "./gamefield";
import { Minos } from "./components/Minos";
import { size } from "./components/block/sizeConfig";

type GameState = {
    Gameover: boolean;
    Paused: boolean;
};

type HandleEvent = {
    handleEvent: Function,
    manager: GameManager,
}

//init()、start()、pause()、retry()でゲームの進行を管理する
class GameManager {
    private stage: createjs.Stage;
    private field: GameField;
    private state: GameState;
    private score: number;
    private count: number;
    private currentMino: Minos;
    private handleEvent: HandleEvent | EventListenerOrEventListenerObject;

    constructor(stage: createjs.Stage) {
        this.stage = stage;
        this.state = {
            Gameover: false,
            Paused: false,
        };
        this.score = 0;
        this.count = 0;
        this.field = new GameField(size.fieldX, size.fieldY);
        this.currentMino = new Minos();
        this.handleEvent = {
            handleEvent: this.moveCtrl,
            manager: this,
        }
    }

    public init(): void {
        //gameFieldの初期化
        this.field.init();
        //スコアの初期化
        this.score = 0;
        //gameStateの初期化
        // this.state = GameState.Init;
        //gameoverフラグの初期化
        this.state.Gameover = false;
        this.stage.removeAllChildren();
        this.stage.removeAllEventListeners();
        document.removeEventListener("keydown", (this.handleEvent as EventListenerOrEventListenerObject));
        createjs.Ticker.reset();
        createjs.Ticker.paused = true;
    }

    public start(): void {
        //Todo tetromino classをnewする形に変更する
        this.currentMino = new Minos();
        this.stage.addChild(this.currentMino);
        this.stage.update();

        // ポーズの場合、動かさない
        document.addEventListener("keydown", (this.handleEvent as EventListenerOrEventListenerObject));

        createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;
        createjs.Ticker.setFPS(1);

        createjs.Ticker.addEventListener("tick", () => {
            this.update();
        });

    }

    public moveCtrl(e: KeyboardEvent){
        if (!(this as any as HandleEvent).manager.state.Paused) {
            switch (e.code) {
                case "ArrowRight":
                    (this as any as HandleEvent).manager.movePiece(1, 0);
                    break;
                case "ArrowLeft":
                    (this as any as HandleEvent).manager.movePiece(-1, 0);
                    break;
                case "ArrowDown":
                    (this as any as HandleEvent).manager.movePiece(0, 1);
                    break;
                case "ArrowUp":
                    (this as any as HandleEvent).manager.movePiece(0, -1);
                    // (this as any as HandleEvent).manager.rotation += 90;
                    break;
            }
            (this as any as HandleEvent).manager.stage.update();
        }
    }

    public pause(): void {
        if (createjs.Ticker.paused) {
            createjs.Ticker.init();
            createjs.Ticker.addEventListener("tick", () => {
                this.update();
            });
            createjs.Ticker.paused = false;
            this.state.Paused = false;
        } else {
            createjs.Ticker.reset();
            createjs.Ticker.paused = true;
            this.state.Paused = true;
        }
    }

    public retry(): void {
        this.init();
        this.start();
    }

    public update(): void {
        let isBottom: boolean = this.movePiece(0, 1);
        this.stage.update();
        // gameStageの底辺にする
        if (this.currentMino.getMinosBottom() >= size.fieldY - 1 || isBottom) {
            // gameFieldにFix
            this.field.setState(this.currentMino);
            this.clearCurrentMino();

            // 次のMino描画
            this.nextMino();
        }

        // 行が埋まった場合
        if (this.field.checkRows()) {
            // gameFieldを更新
            this.field.clearRows(this.field.checkRows() as number[]);
            this.clearCurrentMino();

            // 次のMino描画
            this.nextMino();
        }

        // 一番上が１つでも埋まれば終了
        if(this.checkEnd()){
            this.gameEnd();
            this.retry();
        }
    }

    public movePiece(dx: number, dy: number): boolean {
        let isBottom: boolean = false;
        // テトロミノの座標を変更する
        this.currentMino.x += dx * size.box;
        this.currentMino.y += dy * size.box;

        // 移動後のテトロミノの座標において、壁との衝突判定
        if (this.checkWallCollision()) {
            // 衝突した場合、座標を元に戻す
            this.currentMino.x -= dx * size.box;
            this.currentMino.y -= dy * size.box;

        // 移動後のテトロミノの座標において、他のテトロミノとの衝突判定
        } else if (this.checkBottomCollision()) {
            // 衝突した場合、座標を元に戻す
            this.currentMino.x -= dx * size.box;
            this.currentMino.y -= dy * size.box;
            isBottom = true;
        }
        return isBottom;
    }

    public checkWallCollision(): boolean {
        let x: number = 0;
        let y: number = 0;

        for (let child of this.currentMino.children) {
            // fieldの座標へ変換
            x =
                child.x === 0
                    ? this.currentMino.x / size.box
                    : (this.currentMino.x + child.x) / size.box;
            y =
                child.y === 0
                    ? this.currentMino.y / size.box
                    : (this.currentMino.y + child.y) / size.box;

            // field内に収まってない場合
            if (x < 0 || x >= size.fieldX || y < 0 || y >= size.fieldY) {
                return true;
            }
        }
        return false;
    }

    public checkBottomCollision(): boolean {
        let x: number = 0;
        let y: number = 0;
        for (let child of this.currentMino.children) {
            // fieldの座標へ変換
            x =
                child.x === 0
                    ? this.currentMino.x / size.box
                    : (this.currentMino.x + child.x) / size.box;
            y =
                child.y === 0
                    ? this.currentMino.y / size.box
                    : (this.currentMino.y + child.y) / size.box;

            // テトロミノと衝突する場合
            if (this.field.getState()[y][x] !== 0) {
                return true;
            }
        }
        return false;
    }

    public clearCurrentMino(): void {
        this.stage.removeChild(this.currentMino);
        this.stage.update();
    }

    public nextMino(): void {
        // fieldの状態を描画
        this.field.drawField(this.stage);

        // 次のminoを生成
        this.currentMino = new Minos();
        this.stage.addChild(this.currentMino);
        this.stage.update();
    }

    public gameEnd(): void{
        this.pause();
        alert(`あなたのスコアは ${this.score} です！`)
    }

    public checkEnd(): boolean{
        if(this.field.getState()[0].some(value=>value)) return true;
        return false
    }
}

export default GameManager;
