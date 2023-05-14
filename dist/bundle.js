/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Minos.ts":
/*!*********************************!*\
  !*** ./src/components/Minos.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Minos = void 0;\nconst tetrominos_1 = __webpack_require__(/*! ./block/tetrominos */ \"./src/components/block/tetrominos.ts\");\nconst sizeConfig_1 = __webpack_require__(/*! ./block/sizeConfig */ \"./src/components/block/sizeConfig.ts\");\nclass Minos extends createjs.Container {\n    constructor() {\n        super();\n        this.randomNum = Math.floor(Math.random() * 7);\n        this.template = tetrominos_1.tetrominos[this.randomNum];\n        this.color = this.template.color;\n        this.shape = this.template.shape;\n        this.type = this.template.type;\n        this.createMino();\n    }\n    createMino() {\n        for (let i = 0; i < this.shape.length; i++) {\n            for (let j = 0; j < this.shape[i].length; j++) {\n                if (this.shape[i][j]) {\n                    let box = new createjs.Shape();\n                    box.graphics\n                        .beginStroke(\"dark\")\n                        .setStrokeStyle(1)\n                        .beginFill(this.color)\n                        .rect(0, 0, sizeConfig_1.size.box, sizeConfig_1.size.box);\n                    box.x = j * sizeConfig_1.size.box;\n                    box.y = i * sizeConfig_1.size.box;\n                    this.addChild(box);\n                }\n            }\n        }\n        this.x = 4 * sizeConfig_1.size.box;\n    }\n    getMinosBottom() {\n        let resList = [];\n        for (let child of this.children) {\n            resList.push((this.y + child.y) / sizeConfig_1.size.box);\n        }\n        return Math.max(...resList);\n    }\n    getType() {\n        return this.type;\n    }\n    getColor() {\n        return this.color;\n    }\n}\nexports.Minos = Minos;\n\n\n//# sourceURL=webpack://tetris/./src/components/Minos.ts?");

/***/ }),

/***/ "./src/components/block/sizeConfig.ts":
/*!********************************************!*\
  !*** ./src/components/block/sizeConfig.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.size = void 0;\nexports.size = {\n    box: 20,\n    fieldX: 10,\n    fieldY: 20,\n};\n\n\n//# sourceURL=webpack://tetris/./src/components/block/sizeConfig.ts?");

/***/ }),

/***/ "./src/components/block/tetrominos.ts":
/*!********************************************!*\
  !*** ./src/components/block/tetrominos.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.tetrominos = void 0;\nexports.tetrominos = [\n    {\n        shape: [\n            [1, 0, 0, 0],\n            [1, 0, 0, 0],\n            [1, 0, 0, 0],\n            [1, 0, 0, 0],\n        ],\n        color: \"rgb(190, 10, 5)\",\n        type: 1,\n    },\n    {\n        shape: [\n            [0, 1, 0, 0],\n            [0, 1, 0, 0],\n            [1, 1, 0, 0],\n            [0, 0, 0, 0],\n        ],\n        color: \"rgb(170, 190, 5)\",\n        type: 2,\n    },\n    {\n        shape: [\n            [1, 0, 0, 0],\n            [1, 0, 0, 0],\n            [1, 1, 0, 0],\n            [0, 0, 0, 0],\n        ],\n        type: 3,\n        color: \"rgb(50, 190, 5)\",\n    },\n    {\n        shape: [\n            [1, 1, 0, 0],\n            [1, 1, 0, 0],\n            [0, 0, 0, 0],\n            [0, 0, 0, 0],\n        ],\n        type: 4,\n        color: \"rgb(5, 190, 160)\",\n    },\n    {\n        shape: [\n            [0, 1, 1, 0],\n            [1, 1, 0, 0],\n            [0, 0, 0, 0],\n            [0, 0, 0, 0],\n        ],\n        type: 5,\n        color: \"rgb(15, 5, 190)\",\n    },\n    {\n        shape: [\n            [1, 0, 0, 0],\n            [1, 1, 0, 0],\n            [1, 0, 0, 0],\n            [0, 0, 0, 0],\n        ],\n        type: 6,\n        color: \"rgb(125, 5, 190)\",\n    },\n    {\n        shape: [\n            [1, 1, 0, 0],\n            [0, 1, 1, 0],\n            [0, 0, 0, 0],\n            [0, 0, 0, 0],\n        ],\n        type: 7,\n        color: \"rgb(185, 5, 190)\",\n    },\n];\n\n\n//# sourceURL=webpack://tetris/./src/components/block/tetrominos.ts?");

/***/ }),

/***/ "./src/gamefield.ts":
/*!**************************!*\
  !*** ./src/gamefield.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst sizeConfig_1 = __webpack_require__(/*! ./components/block/sizeConfig */ \"./src/components/block/sizeConfig.ts\");\nclass GameField {\n    constructor(fieldX, fieldY) {\n        this.fieldX = fieldX;\n        this.fieldY = fieldY;\n        this.field = [];\n        this.colorDict = new Map();\n        this.init();\n    }\n    init() {\n        //GameFieldを空にする処理を記述する\n        this.field = [];\n        for (let y = 0; y < this.fieldY; y++) {\n            this.field[y] = [];\n            for (let x = 0; x < this.fieldX; x++) {\n                this.field[y][x] = 0;\n            }\n        }\n    }\n    getState() {\n        return this.field;\n    }\n    setState(mino) {\n        let x = 0;\n        let y = 0;\n        const color = mino.getColor();\n        const type = mino.getType();\n        // dict追加{type: color}\n        if (!this.colorDict.has(type))\n            this.colorDict.set(type, color);\n        // field追加\n        for (let child of mino.children) {\n            // 座標変換\n            x = (mino.x + child.x) / sizeConfig_1.size.box;\n            y = (mino.y + child.y) / sizeConfig_1.size.box;\n            // 座標にkey追加（描画する際のkey）\n            this.field[y][x] = type;\n        }\n    }\n    drawField(stage) {\n        stage.removeAllChildren();\n        for (let y = 0; y < this.field.length; y++) {\n            for (let x = 0; x < this.field[y].length; x++) {\n                if (this.field[y][x]) {\n                    let box = new createjs.Shape();\n                    box.graphics\n                        .beginStroke(\"dark\")\n                        .setStrokeStyle(1)\n                        .beginFill(this.colorDict.get(this.field[y][x]))\n                        .rect(0, 0, sizeConfig_1.size.box, sizeConfig_1.size.box);\n                    box.x = x * sizeConfig_1.size.box;\n                    box.y = y * sizeConfig_1.size.box;\n                    stage.addChild(box);\n                }\n            }\n        }\n    }\n    getColorDict() {\n        return this.colorDict;\n    }\n    // 削除する行を配列として返す\n    checkRows() {\n        const clearY = [];\n        for (let y = 0; y < this.field.length; y++) {\n            if (this.field[y].every((value) => value))\n                clearY.push(y);\n        }\n        return clearY.length == 0 ? null : clearY;\n    }\n    // field配列の削除と0埋め配列追加\n    clearRows(y) {\n        for (let ele of y) {\n            const newArray = new Array(this.fieldX).fill(0);\n            this.field.splice(ele, 1);\n            this.field.unshift(newArray);\n        }\n    }\n}\nexports[\"default\"] = GameField;\n\n\n//# sourceURL=webpack://tetris/./src/gamefield.ts?");

/***/ }),

/***/ "./src/gamemanager.ts":
/*!****************************!*\
  !*** ./src/gamemanager.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst gamefield_1 = __importDefault(__webpack_require__(/*! ./gamefield */ \"./src/gamefield.ts\"));\nconst Minos_1 = __webpack_require__(/*! ./components/Minos */ \"./src/components/Minos.ts\");\nconst sizeConfig_1 = __webpack_require__(/*! ./components/block/sizeConfig */ \"./src/components/block/sizeConfig.ts\");\n//init()、start()、pause()、retry()でゲームの進行を管理する\nclass GameManager {\n    constructor(stage, nextMinoDisplay) {\n        this.stage = stage;\n        this.nextMinoDisplay = nextMinoDisplay;\n        this.state = {\n            Gameover: false,\n            Paused: false,\n        };\n        this.score = 0;\n        this.count = 0;\n        this.field = new gamefield_1.default(sizeConfig_1.size.fieldX, sizeConfig_1.size.fieldY);\n        this.currentMino = new Minos_1.Minos();\n        this.nextMino = this.currentMino;\n        this.nextMino.x = 1 * sizeConfig_1.size.box;\n        this.nextMino.y = 0;\n        this.nextMinoDisplay.addChild(this.nextMino);\n        this.nextMinoDisplay.update();\n    }\n    init() {\n        //gameFieldの初期化\n        this.field.init();\n        //スコアの初期化\n        this.score = 0;\n        //gameStateの初期化\n        // this.state = GameState.Init;\n        //gameoverフラグの初期化\n        this.state.Gameover = false;\n    }\n    start() {\n        this.stage.addChild(this.currentMino);\n        this.makeNextMino();\n        this.stage.update();\n        // ポーズの場合、動かさない\n        document.addEventListener(\"keydown\", (e) => {\n            if (!this.state.Paused) {\n                switch (e.code) {\n                    case \"ArrowRight\":\n                        this.movePiece(1, 0);\n                        break;\n                    case \"ArrowLeft\":\n                        this.movePiece(-1, 0);\n                        break;\n                    case \"ArrowDown\":\n                        this.movePiece(0, 1);\n                        break;\n                    case \"ArrowUp\":\n                        this.movePiece(0, -1);\n                        // this.rotation += 90;\n                        break;\n                }\n                this.stage.update();\n            }\n        });\n        createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;\n        createjs.Ticker.setFPS(1);\n        createjs.Ticker.addEventListener(\"tick\", () => {\n            this.update();\n        });\n        // this.changeGameState(GameState.Playing);\n    }\n    pause() {\n        if (createjs.Ticker.paused) {\n            createjs.Ticker.init();\n            createjs.Ticker.addEventListener(\"tick\", () => {\n                this.update();\n            });\n            createjs.Ticker.paused = false;\n            this.state.Paused = false;\n        }\n        else {\n            createjs.Ticker.reset();\n            createjs.Ticker.paused = true;\n            this.state.Paused = true;\n        }\n    }\n    retry() {\n        this.init();\n        this.start();\n    }\n    update() {\n        let isBottom = this.movePiece(0, 1);\n        this.stage.update();\n        // gameStageの底辺にする\n        if (this.currentMino.getMinosBottom() >= sizeConfig_1.size.fieldY - 1 || isBottom) {\n            // gameFieldにFix\n            this.field.setState(this.currentMino);\n            this.clearCurrentMino();\n            // 次のMino描画\n            this.drawNextMino();\n            console.log(\"よばれた1\");\n        }\n        // 行が埋まった場合\n        else if (this.field.checkRows()) {\n            // gameFieldを更新\n            this.field.clearRows(this.field.checkRows());\n            this.clearCurrentMino();\n            // 次のMino描画\n            // this.drawNextMino();\n            console.log(\"よばれた2\");\n        }\n    }\n    movePiece(dx, dy) {\n        let isBottom = false;\n        // テトロミノの座標を変更する\n        this.currentMino.x += dx * sizeConfig_1.size.box;\n        this.currentMino.y += dy * sizeConfig_1.size.box;\n        // 移動後のテトロミノの座標において、壁との衝突判定\n        if (this.checkWallCollision()) {\n            // 衝突した場合、座標を元に戻す\n            this.currentMino.x -= dx * sizeConfig_1.size.box;\n            this.currentMino.y -= dy * sizeConfig_1.size.box;\n        }\n        else if (this.checkBottomCollision()) {\n            // 衝突した場合、座標を元に戻す\n            this.currentMino.x -= dx * sizeConfig_1.size.box;\n            this.currentMino.y -= dy * sizeConfig_1.size.box;\n            isBottom = true;\n        }\n        return isBottom;\n    }\n    checkWallCollision() {\n        let x = 0;\n        let y = 0;\n        for (let child of this.currentMino.children) {\n            // fieldの座標へ変換\n            x =\n                child.x === 0\n                    ? this.currentMino.x / sizeConfig_1.size.box\n                    : (this.currentMino.x + child.x) / sizeConfig_1.size.box;\n            y =\n                child.y === 0\n                    ? this.currentMino.y / sizeConfig_1.size.box\n                    : (this.currentMino.y + child.y) / sizeConfig_1.size.box;\n            // field内に収まってない場合\n            if (x < 0 || x >= sizeConfig_1.size.fieldX || y < 0 || y >= sizeConfig_1.size.fieldY) {\n                return true;\n            }\n        }\n        return false;\n    }\n    checkBottomCollision() {\n        let x = 0;\n        let y = 0;\n        for (let child of this.currentMino.children) {\n            // fieldの座標へ変換\n            x =\n                child.x === 0\n                    ? this.currentMino.x / sizeConfig_1.size.box\n                    : (this.currentMino.x + child.x) / sizeConfig_1.size.box;\n            y =\n                child.y === 0\n                    ? this.currentMino.y / sizeConfig_1.size.box\n                    : (this.currentMino.y + child.y) / sizeConfig_1.size.box;\n            // テトロミノと衝突する場合\n            if (this.field.getState()[y][x] !== 0) {\n                return true;\n            }\n        }\n        return false;\n    }\n    clearCurrentMino() {\n        this.stage.removeChild(this.currentMino);\n        this.stage.update();\n    }\n    drawNextMino() {\n        // fieldの状態を描画\n        this.field.drawField(this.stage);\n        // 次のminoを生成\n        this.makeNextMino();\n        this.stage.addChild(this.currentMino);\n        this.stage.update();\n    }\n    changeCurrentMino() {\n    }\n    makeNextMino() {\n        this.nextMinoDisplay.removeChild(this.nextMino);\n        this.currentMino = this.nextMino;\n        this.nextMino = new Minos_1.Minos();\n        this.nextMino.x = 1 * sizeConfig_1.size.box;\n        this.nextMino.y = 0;\n        this.nextMinoDisplay.addChild(this.nextMino);\n        this.nextMinoDisplay.update();\n    }\n    gameEnd() { }\n}\nexports[\"default\"] = GameManager;\n\n\n//# sourceURL=webpack://tetris/./src/gamemanager.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst gamemanager_1 = __importDefault(__webpack_require__(/*! ./gamemanager */ \"./src/gamemanager.ts\"));\nconst sizeConfig_1 = __webpack_require__(/*! ./components/block/sizeConfig */ \"./src/components/block/sizeConfig.ts\");\nconst control = {\n    start: document.getElementById(\"start\"),\n    pause: document.getElementById(\"pause\"),\n    retry: document.getElementById(\"retry\"),\n    canvas: document.getElementById(\"canvas\"),\n    mini_canvas: document.getElementById(\"miniCanvas\"),\n};\nlet gameManager;\nlet stage;\nlet nextMino;\nconst init = () => {\n    control.canvas.style.border = \"2px solid #555\";\n    control.canvas.width = sizeConfig_1.size.box * sizeConfig_1.size.fieldX;\n    control.canvas.height = sizeConfig_1.size.box * sizeConfig_1.size.fieldY;\n    control.mini_canvas.style.border = \"2px solid #555\";\n    control.mini_canvas.width = sizeConfig_1.size.box * 4;\n    control.mini_canvas.height = sizeConfig_1.size.box * 4;\n    stage = new createjs.Stage(\"canvas\");\n    nextMino = new createjs.Stage(\"miniCanvas\");\n    gameManager = new gamemanager_1.default(stage, nextMino);\n    gameManager.init();\n    stage.update();\n};\ncontrol.pause.addEventListener(\"click\", () => {\n    gameManager.pause();\n    console.log(\"pause button clicked\");\n});\ncontrol.start.addEventListener(\"click\", () => {\n    gameManager.start();\n    console.log(\"start button clicked\");\n});\ncontrol.retry.addEventListener(\"click\", () => {\n    gameManager.retry();\n    console.log(\"retry button clicked\");\n});\nwindow.addEventListener(\"load\", init);\n\n\n//# sourceURL=webpack://tetris/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;