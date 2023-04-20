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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Minos = void 0;\nconst tetrominos_1 = __webpack_require__(/*! ./block/tetrominos */ \"./src/components/block/tetrominos.ts\");\nconst sizeConfig_1 = __webpack_require__(/*! ./block/sizeConfig */ \"./src/components/block/sizeConfig.ts\");\nclass Minos extends createjs.Container {\n    constructor() {\n        super();\n        const randomNum = Math.floor(Math.random() * 7);\n        const template = tetrominos_1.tetrominos[randomNum];\n        for (let i = 0; i < template.shape.length; i++) {\n            for (let j = 0; j < template.shape[i].length; j++) {\n                if (template.shape[i][j]) {\n                    let box = new createjs.Shape();\n                    let px = j * sizeConfig_1.size.box;\n                    let py = i * sizeConfig_1.size.box;\n                    box.graphics.beginFill(template.color);\n                    box.graphics.rect(px, py, sizeConfig_1.size.box, sizeConfig_1.size.box);\n                    this.addChild(box);\n                }\n            }\n        }\n    }\n    move(keyDown) {\n        if (keyDown.code == \"ArrowRight\")\n            this.x += sizeConfig_1.size.box;\n        else if (keyDown.code == \"ArrowLeft\")\n            this.x -= sizeConfig_1.size.box;\n        else if (keyDown.code == \"ArrowDown\")\n            this.y += sizeConfig_1.size.box;\n    }\n}\nexports.Minos = Minos;\n\n\n//# sourceURL=webpack://tetris/./src/components/Minos.ts?");

/***/ }),

/***/ "./src/components/block/sizeConfig.ts":
/*!********************************************!*\
  !*** ./src/components/block/sizeConfig.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.size = void 0;\nexports.size = {\n    \"box\": 30,\n    \"fieldX\": 12,\n    \"fieldY\": 20,\n};\n\n\n//# sourceURL=webpack://tetris/./src/components/block/sizeConfig.ts?");

/***/ }),

/***/ "./src/components/block/tetrominos.ts":
/*!********************************************!*\
  !*** ./src/components/block/tetrominos.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.tetrominos = void 0;\nexports.tetrominos = [\n    {\n        \"shape\": [\n            [0, 1, 0, 0],\n            [0, 1, 0, 0],\n            [0, 1, 0, 0],\n            [0, 1, 0, 0]\n        ],\n        \"color\": 'rgb(190, 10, 5)'\n    },\n    {\n        \"shape\": [\n            [0, 1, 0, 0],\n            [0, 1, 0, 0],\n            [1, 1, 0, 0],\n            [0, 0, 0, 0],\n        ],\n        \"color\": 'rgb(170, 190, 5)'\n    },\n    {\n        \"shape\": [\n            [0, 1, 0, 0],\n            [0, 1, 0, 0],\n            [0, 1, 1, 0],\n            [0, 0, 0, 0],\n        ],\n        \"color\": 'rgb(50, 190, 5)'\n    },\n    {\n        \"shape\": [\n            [0, 1, 1, 0],\n            [0, 1, 1, 0],\n            [0, 0, 0, 0],\n            [0, 0, 0, 0],\n        ],\n        \"color\": 'rgb(5, 190, 160)'\n    },\n    {\n        \"shape\": [\n            [0, 1, 1, 0],\n            [1, 1, 0, 0],\n            [0, 0, 0, 0],\n            [0, 0, 0, 0]\n        ],\n        \"color\": 'rgb(15, 5, 190)'\n    },\n    {\n        \"shape\": [\n            [0, 1, 0, 0],\n            [0, 1, 1, 0],\n            [0, 1, 0, 0],\n            [0, 0, 0, 0]\n        ],\n        \"color\": 'rgb(125, 5, 190)'\n    },\n    {\n        \"shape\": [\n            [0, 1, 1, 0],\n            [0, 0, 1, 1],\n            [0, 0, 0, 0],\n            [0, 0, 0, 0]\n        ],\n        \"color\": 'rgb(185, 5, 190)'\n    }\n];\n\n\n//# sourceURL=webpack://tetris/./src/components/block/tetrominos.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst sizeConfig_1 = __webpack_require__(/*! ./components/block/sizeConfig */ \"./src/components/block/sizeConfig.ts\");\nconst Minos_1 = __webpack_require__(/*! ./components/Minos */ \"./src/components/Minos.ts\");\nconst control = {\n    \"start\": document.getElementById(\"start\"),\n};\nconst init = () => {\n    const stage = new createjs.Stage(\"canvas\");\n    const gameField = new createjs.Shape();\n    gameField.graphics.beginStroke(\"Dark\").setStrokeStyle(3, 2);\n    gameField.graphics.rect(0, 0, sizeConfig_1.size.box * sizeConfig_1.size.fieldX, sizeConfig_1.size.box * sizeConfig_1.size.fieldY);\n    stage.addChild(gameField);\n    stage.update();\n    const mino = new Minos_1.Minos();\n    stage.addChild(mino);\n    document.addEventListener('keydown', e => {\n        mino.move(e);\n        stage.update();\n    });\n    stage.update();\n};\nwindow.addEventListener('load', init);\n\n\n//# sourceURL=webpack://tetris/./src/index.ts?");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;