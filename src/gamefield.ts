class GameField extends createjs.Shape {

    private box: number;
    private fieldX: number;
    private fieldY: number;

    constructor(box: number, fieldX: number, fieldY: number) {
        super();
        this.box = box;
        this.fieldX = fieldX;
        this.fieldY = fieldY;

        this.graphics
            .beginStroke("Dark")
            .setStrokeStyle(3, 2)
            .rect(0, 0, this.box * this.fieldX, this.box * this.fieldY);
    }

    public init() {
        //GameFieldを空にする処理を記述する
    }
}

export default GameField;