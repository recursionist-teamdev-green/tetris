class GameField{

    private fieldX: number;
    private fieldY: number;
    private field: number[][];

    constructor(fieldX: number, fieldY: number) {
        this.fieldX = fieldX;
        this.fieldY = fieldY;
        this.field = [];

        this.init();
    }

    public init() {
        //GameFieldを空にする処理を記述する
        for(let y = 0; y < this.fieldY; y++){
            this.field[y] = []
            for(let x = 0; x < this.fieldX; x++){
                this.field[y][x] = 0;
            }
        }
    }
    
    public getState(): number[][]{
        return this.field;
    }

    public setState(x: number, y: number): void{
        console.log(`set: (${x}, ${y})`)
        this.field[y][x] = 1;
    }
}

export default GameField;