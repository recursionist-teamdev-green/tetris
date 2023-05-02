class GameField extends createjs.Shape {

    // private box: number;
    private fieldX: number;
    private fieldY: number;
    private field: number[][];

    constructor(box: number, fieldX: number, fieldY: number) {
        super();
        // this.box = box;
        this.fieldX = fieldX;
        this.fieldY = fieldY;
        
        this.field = [];
        for(let y = 0; y < this.fieldY; y++){
            this.field[y] = []
            for(let x = 0; x < this.fieldX; x++){
                this.field[y][x] = 0;
            }
        }
        
    }

    public init() {
        //GameFieldを空にする処理を記述する
    }
}

export default GameField;