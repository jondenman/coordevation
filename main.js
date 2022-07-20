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

/***/ "./src/apiCalls.js":
/*!*************************!*\
  !*** ./src/apiCalls.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getElevation\": () => (/* binding */ getElevation)\n/* harmony export */ });\nconst url = 'https://elevation-api.io/api/elevation?points=(39.90974,-106.17188),(62.52417,10.02487)'\nasync function getElevation(latitude, longitude) {\n    let url = `https://elevation-api.io/api/elevation?points=(${latitude},${longitude})`;\n    const response = await fetch(url, {mode: 'cors'});\n    const elevation = await response.json();\n\n    return elevation;\n}\n\n\n\n//# sourceURL=webpack://coordevation/./src/apiCalls.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiCalls */ \"./src/apiCalls.js\");\n/* harmony import */ var _topography__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./topography */ \"./src/topography.js\");\n/* harmony import */ var _topoKey__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./topoKey */ \"./src/topoKey.js\");\n\n\n\n\nconst contentDiv = document.getElementById('content');\nconst heroRight = document.querySelector('.hero-right');\n\nasync function onClick (e) {\n    console.log(e);\n    // const canvas = document.querySelector('canvas')\n    const rect = contentDiv.getBoundingClientRect()\n    let x = e.x\n    let y = e.y\n\n    let latitude = scale(0, window.innerWidth, 25, 50, x);\n    let longitude = scale(window.innerHeight, 0, 125, 70, y);\n    let rgb = {r: 0, g: 0, b: 0};\n    try {\n        var elevationResponse = await _apiCalls__WEBPACK_IMPORTED_MODULE_0__.getElevation(latitude, longitude);\n        console.log(elevationResponse.elevations[0].elevation);\n        let elevation = elevationResponse.elevations[0].elevation;\n        rgb = (0,_topography__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(elevation);\n        x += window.pageXOffset;\n        y += window.pageYOffset;\n        let nodeText = getNodeString(latitude, longitude, elevation);\n        addNode(x, y, rgb.r, rgb.g, rgb.b, nodeText);\n    } catch (err) {\n        console.log('error');\n    }\n}\n\n// function to scale a number with range constraints\nfunction scale(currentMin, currentMax, scaleMin, scaleMax, num) {\n    let currRange = currentMax - currentMin;\n    let scaleRange = scaleMax - scaleMin;\n    return (((num - currentMin) * scaleRange) / currRange) + scaleMin;\n}\n\n// add a square at given position with given color\nfunction addNode(xPosition, yPosition, red, green, blue, text) {\n    let nodeDiv = document.createElement('div');\n    nodeDiv.classList.add('node');\n    nodeDiv.style.left = `${xPosition}px`; \n    nodeDiv.style.top = `${yPosition}px`;\n    nodeDiv.style.backgroundColor = `rgb(${red},${green},${blue})`;\n    \n    let nodeText = document.createElement('span');\n    nodeText.classList.add('nodetext');\n    nodeText.textContent = text;\n\n    nodeDiv.appendChild(nodeText);\n    contentDiv.appendChild(nodeDiv);\n}\n\nfunction getNodeString(latitude, longitude, elevation) {\n    return `lat: ${latitude.toFixed(5)} long: ${longitude.toFixed(5)} elevation: ${elevation}`;\n}\n\nheroRight.appendChild((0,_topoKey__WEBPACK_IMPORTED_MODULE_2__[\"default\"])());\ncontentDiv.addEventListener('click', onClick);\n\n//# sourceURL=webpack://coordevation/./src/index.js?");

/***/ }),

/***/ "./src/topoKey.js":
/*!************************!*\
  !*** ./src/topoKey.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _topography__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./topography */ \"./src/topography.js\");\n\n\nconst topoKey = () => {\n    let keySteps = [0, 1, 201, 501, 751, 1001, 2001, 3001, 4001];\n    console.log(keySteps.length);\n    const topoKeyDiv = document.createElement('div');\n    const header = document.createElement('div');\n    header.textContent = 'Elevation Key (meters)';\n    topoKeyDiv.appendChild(header);\n\n    for (let i = 0; i < keySteps.length; i++) {\n        console.log(i);\n        let keyRow = document.createElement('div');\n        keyRow.classList.add('keyrow');\n\n        let valueDiv = document.createElement('div');\n        valueDiv.classList.add('value');\n        let valueString = '';\n        if (i == 0) {\n            valueString = `${keySteps[i]}`;\n        } else if (i == keySteps.length - 1) {\n            valueString = `${keySteps[i]}+`\n        } else {\n            valueString = `${keySteps[i]} - ${keySteps[i + 1]}`;\n        }\n        valueDiv.textContent = valueString;\n        keyRow.appendChild(valueDiv);\n\n        let keyDiv = document.createElement('div');\n        keyDiv.classList.add('key');\n        let rgb = (0,_topography__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(keySteps[i])\n        keyDiv.style.backgroundColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`;\n        keyRow.appendChild(keyDiv);\n\n        topoKeyDiv.appendChild(keyRow);\n    }\n\n    return topoKeyDiv;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (topoKey);\n\n//# sourceURL=webpack://coordevation/./src/topoKey.js?");

/***/ }),

/***/ "./src/topography.js":
/*!***************************!*\
  !*** ./src/topography.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst getTopographyColor = (elevation) => {\n    let rgb = {r: 0, g: 0, b: 0};\n    if (elevation < 1) {\n        rgb.r = 0;\n        rgb.g = 0;\n        rgb.b = 250;\n    } else if (elevation >= 1 && elevation <= 200){\n        rgb.r = 149;\n        rgb.g = 207;\n        rgb.b = 187;\n    } else if (elevation > 200 && elevation <= 500) {\n        rgb.r = 107;\n        rgb.g = 214;\n        rgb.b = 105;\n    } else if (elevation > 500 && elevation <= 750) {\n        rgb.r = 234;\n        rgb.g = 235;\n        rgb.b = 81;\n    } else if (elevation > 750 && elevation <= 1000) {\n        rgb.r = 217;\n        rgb.g = 206;\n        rgb.b = 75;\n    } else if (elevation > 1000 && elevation <= 2000) {\n        rgb.r = 209;\n        rgb.g = 180;\n        rgb.b = 71;\n    } else if (elevation > 2000 && elevation <= 3000) {\n        rgb.r = 196;\n        rgb.g = 157;\n        rgb.b = 56;\n    } else if (elevation > 3000 && elevation <= 4000) {\n        rgb.r = 185;\n        rgb.g = 136;\n        rgb.b = 58;\n    } else {\n        rgb.r = 176;\n        rgb.g = 117;\n        rgb.b = 41;\n    }\n    return rgb;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getTopographyColor);\n\n//# sourceURL=webpack://coordevation/./src/topography.js?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;