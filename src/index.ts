import { createServer, ServerResponse } from 'http';
import { createCanvas, CanvasRenderingContext2D} from 'canvas';
import { GameField } from './gameField';
import * as fs from 'fs';

createServer((req, res: ServerResponse) => {
    const canvas = createCanvas(300,600);
    const context = canvas.getContext('2d'); 

    //DrawRectangle
    // context.fillStyle = 'rgba(0, 0, 255, 0.5)';
    // context.fillRect(10, 10, 190, 190);

    
    const field = new GameField(10,20,30,canvas);
    field.drawField(context);

    res.writeHead(200, {'Content-type' : 'Text/html'});
    res.end('<img src="' + canvas.toDataURL() + '">');
}).listen(3000);


// context.fillStyle = '#000';
// context.fillRect(0,0,canvas.width, canvas.height);





