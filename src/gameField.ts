import { createCanvas, CanvasRenderingContext2D, Canvas } from "canvas";
export class GameField{
 
    private _width: number;
    private _height: number;
    private cellSize: number;
    private _context: CanvasRenderingContext2D | null = null;
    
    constructor(_width: number, _height: number, cellSize: number, canvas: Canvas){
        this._width = _width;
        this._height = _height;
        
        this.cellSize = cellSize;
        canvas.width = this._width * this.cellSize;
        canvas.height = this._height * this.cellSize;

       
    }

    public drawField(context : CanvasRenderingContext2D){
        context.fillStyle = '#000';
        context.fillRect(0,0,this._width * this.cellSize, this._height * this.cellSize);
    }    
}
