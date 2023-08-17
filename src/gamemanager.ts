import GameField from "./gamefield";
import { Minos } from "./components/Minos";
import { size } from "./components/block/sizeConfig";

type GameState = {
    Gameover: boolean;
    Paused: boolean;
    Playing: boolean
};

//init()、start()、pause()、retry()でゲームの進行を管理する
class GameManager {
    private stage: createjs.Stage;
    private scoreStage: createjs.Stage;
    private scoreEle: createjs.Text;
    private nextMinoDisplay: createjs.Stage;
    private field: GameField;
    private state: GameState;
    private score: number;
    private currentMino: Minos;
    private nextMino: Minos;

    constructor(stage: createjs.Stage, scoreStage: createjs.Stage, nextMinoDisplay: createjs.Stage) {
        this.stage = stage;
        this.scoreStage = scoreStage;
        this.nextMinoDisplay = nextMinoDisplay;
        this.state = {
            Gameover: false,
            Paused: false,
            Playing: false,
        };
        this.score = 0;
        this.scoreEle = new createjs.Text("", "24px serif", "DarkRed");
        this.field = new GameField(size.fieldX, size.fieldY);
        this.currentMino = new Minos();
        this.moveCtrl = this.moveCtrl.bind(this)
        this.nextMino = this.currentMino;
        this.nextMinoDisplay.addChild(this.nextMino);
        this.nextMinoDisplay.update();
    }

    public init(): void {
        //gameFieldの初期化
        this.field.init();

        //スコアの初期化
        this.score = 0;

        //gameStateの初期化
        this.state.Gameover = false;
        this.state.Paused = false;
        this.state.Playing = false;

        // stageの初期化
        this.resetStage();
    }

    public start(): void {
        // プレイ中は操作しない
        if(this.state.Playing) return

        // テトロミノ生成 / 描画
        this.makeNextMino();

        // スコア描画
        this.drawScore();
        this.stage.update();

        // ステータス更新
        this.state.Playing = true;

        // キーボード操作
        document.addEventListener("keydown", this.moveCtrl);

        // ティッカー操作
        createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;
        createjs.Ticker.setFPS(1);
        createjs.Ticker.addEventListener("tick", () => {
            this.update();
        });
    }

    public moveCtrl(e: KeyboardEvent) {
        if (!this.state.Paused) {
            switch (e.code) {
                case "ArrowRight":
                    this.movePiece(1, 0);
                    break;
                case "ArrowLeft":
                    this.movePiece(-1, 0);
                    break;
                case "ArrowDown":
                    this.movePiece(0, 1);
                    break;
                case "ArrowUp":
                    this.currentMino.rotate(1);
                    if (this.checkBottomCollision() || this.checkWallCollision()) this.currentMino.rotate(-1);
                    break;
            }
            this.stage.update();
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
            console.log("pause")
            createjs.Ticker.reset();
            createjs.Ticker.paused = true;
            this.state.Paused = true;
        }
    }

    public retry(): void {
        this.init();
        this.start();
    }

    public resetStage(): void{
        // stage
        this.stage.removeAllChildren();
        this.stage.removeAllEventListeners();
        document.removeEventListener("keydown", this.moveCtrl);
        createjs.Ticker.reset();
        this.stage.update();

        // nextMino
        this.nextMinoDisplay.removeAllChildren();
        this.nextMinoDisplay.update();
        
        // score
        this.drawScore();
        this.scoreStage.update();
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
            this.drawNextMino();
        }
        // 行が埋まった場合
        if (this.field.checkRows()) {
            // gameFieldを更新
            const clearList = this.field.checkRows();
            this.score += (clearList as number[]).length * 10;
            this.field.clearRows(clearList as number[]);

            this.field.drawField(this.stage);
            this.drawScore();
            this.stage.addChild(this.currentMino)
            this.stage.update();
        }
        
        // 一番上が１つでも埋まれば終了
        if (this.checkEnd()) {
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

    public drawNextMino(): void {
        this.field.drawField(this.stage);
        // score描画
        this.drawScore();
        // 次のminoを生成
        this.makeNextMino();
    }


    public drawScore(): void {
        this.scoreEle.text = `Score: ${this.score}`;
        this.scoreStage.addChild(this.scoreEle)
        this.scoreStage.update();
    }

    public gameEnd(): void {
        alert(`あなたのスコアは ${this.score} です！`)
        this.retry();

    }

    public checkEnd(): boolean {
        if (this.field.getState()[0].some(value => value)) return true;
        return false
    }

    public makeNextMino(): void {
        this.nextMinoDisplay.removeChild(this.nextMino);
        this.currentMino = this.nextMino;
        this.currentMino.x = 4 * size.box;
        this.currentMino.y = 0;

        this.nextMino = new Minos();

        // ステージ更新
        this.stage.addChild(this.currentMino);
        this.nextMinoDisplay.addChild(this.nextMino);
        this.stage.update();
        this.nextMinoDisplay.update();
    }

    public getState(): GameState{
        return this.state;
    }

}

export default GameManager;
