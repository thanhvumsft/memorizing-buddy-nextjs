"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth";
exports.ids = ["pages/api/auth"];
exports.modules = {

/***/ "@liveblocks/node":
/*!***********************************!*\
  !*** external "@liveblocks/node" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@liveblocks/node");

/***/ }),

/***/ "(api)/./pages/api/auth.ts":
/*!***************************!*\
  !*** ./pages/api/auth.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ auth)\n/* harmony export */ });\n/* harmony import */ var _liveblocks_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @liveblocks/node */ \"@liveblocks/node\");\n/* harmony import */ var _liveblocks_node__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_liveblocks_node__WEBPACK_IMPORTED_MODULE_0__);\n\n//TODO: Move this to env files\nconst API_KEY = process.env.API_KEY_WARNING;\nasync function auth(req, res) {\n    if (!API_KEY) {\n        return res.status(403).end();\n    }\n    // For the avatar example, we're generating random users\n    // and set their info from the authentication endpoint\n    // See https://liveblocks.io/docs/api-reference/liveblocks-node#authorize for more information\n    const response = await (0,_liveblocks_node__WEBPACK_IMPORTED_MODULE_0__.authorize)({\n        room: req.body.room,\n        secret: API_KEY,\n        userInfo: {\n            name: NAMES[Math.floor(Math.random() * NAMES.length)],\n            picture: `/avatars/${Math.floor(Math.random() * 10)}.png`\n        }\n    });\n    return res.status(response.status).end(response.body);\n};\nconst NAMES = [\n    \"Charlie Layne\",\n    \"Mislav Abha\",\n    \"Tatum Paolo\",\n    \"Anjali Wanda\",\n    \"Jody Hekla\",\n    \"Emil Joyce\",\n    \"Jory Quispe\",\n    \"Quinn Elton\", \n];\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBNkM7QUFJM0MsOEJBQThCO0FBQ2hDLE1BQU1DLE9BQU8sR0FBR0MsT0FBTyxDQUFDQyxHQUFHLENBQUNDLGVBQWU7QUFFNUIsZUFBZUMsSUFBSSxDQUFDQyxHQUFtQixFQUFFQyxHQUFvQixFQUFFO0lBQzVFLElBQUksQ0FBQ04sT0FBTyxFQUFFO1FBQ1osT0FBT00sR0FBRyxDQUFDQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLEdBQUcsRUFBRSxDQUFDO0tBQzlCO0lBRUQsd0RBQXdEO0lBQ3hELHNEQUFzRDtJQUN0RCw4RkFBOEY7SUFDOUYsTUFBTUMsUUFBUSxHQUFHLE1BQU1WLDJEQUFTLENBQUM7UUFDL0JXLElBQUksRUFBRUwsR0FBRyxDQUFDTSxJQUFJLENBQUNELElBQUk7UUFDbkJFLE1BQU0sRUFBRVosT0FBTztRQUNmYSxRQUFRLEVBQUU7WUFDUkMsSUFBSSxFQUFFQyxLQUFLLENBQUNDLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sRUFBRSxHQUFHSCxLQUFLLENBQUNJLE1BQU0sQ0FBQyxDQUFDO1lBQ3JEQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUVKLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUMxRDtLQUNGLENBQUM7SUFDRixPQUFPWixHQUFHLENBQUNDLE1BQU0sQ0FBQ0UsUUFBUSxDQUFDRixNQUFNLENBQUMsQ0FBQ0MsR0FBRyxDQUFDQyxRQUFRLENBQUNFLElBQUksQ0FBQyxDQUFDO0NBQ3ZEO0FBRUQsTUFBTUksS0FBSyxHQUFHO0lBQ1osZUFBZTtJQUNmLGFBQWE7SUFDYixhQUFhO0lBQ2IsY0FBYztJQUNkLFlBQVk7SUFDWixZQUFZO0lBQ1osYUFBYTtJQUNiLGFBQWE7Q0FDYiIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3BhZ2VzL2FwaS9hdXRoLnRzP2ZiZWMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXV0aG9yaXplIH0gZnJvbSBcIkBsaXZlYmxvY2tzL25vZGVcIjtcbmltcG9ydCB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tIFwibmV4dFwiO1xuXG5cbiAgLy9UT0RPOiBNb3ZlIHRoaXMgdG8gZW52IGZpbGVzXG5jb25zdCBBUElfS0VZID0gcHJvY2Vzcy5lbnYuQVBJX0tFWV9XQVJOSU5HO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBhdXRoKHJlcTogTmV4dEFwaVJlcXVlc3QsIHJlczogTmV4dEFwaVJlc3BvbnNlKSB7XG4gIGlmICghQVBJX0tFWSkge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMykuZW5kKCk7XG4gIH1cblxuICAvLyBGb3IgdGhlIGF2YXRhciBleGFtcGxlLCB3ZSdyZSBnZW5lcmF0aW5nIHJhbmRvbSB1c2Vyc1xuICAvLyBhbmQgc2V0IHRoZWlyIGluZm8gZnJvbSB0aGUgYXV0aGVudGljYXRpb24gZW5kcG9pbnRcbiAgLy8gU2VlIGh0dHBzOi8vbGl2ZWJsb2Nrcy5pby9kb2NzL2FwaS1yZWZlcmVuY2UvbGl2ZWJsb2Nrcy1ub2RlI2F1dGhvcml6ZSBmb3IgbW9yZSBpbmZvcm1hdGlvblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF1dGhvcml6ZSh7XG4gICAgcm9vbTogcmVxLmJvZHkucm9vbSxcbiAgICBzZWNyZXQ6IEFQSV9LRVksXG4gICAgdXNlckluZm86IHtcbiAgICAgIG5hbWU6IE5BTUVTW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE5BTUVTLmxlbmd0aCldLFxuICAgICAgcGljdHVyZTogYC9hdmF0YXJzLyR7TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApfS5wbmdgLFxuICAgIH0sXG4gIH0pO1xuICByZXR1cm4gcmVzLnN0YXR1cyhyZXNwb25zZS5zdGF0dXMpLmVuZChyZXNwb25zZS5ib2R5KTtcbn1cblxuY29uc3QgTkFNRVMgPSBbXG4gIFwiQ2hhcmxpZSBMYXluZVwiLFxuICBcIk1pc2xhdiBBYmhhXCIsXG4gIFwiVGF0dW0gUGFvbG9cIixcbiAgXCJBbmphbGkgV2FuZGFcIixcbiAgXCJKb2R5IEhla2xhXCIsXG4gIFwiRW1pbCBKb3ljZVwiLFxuICBcIkpvcnkgUXVpc3BlXCIsXG4gIFwiUXVpbm4gRWx0b25cIixcbl07XG4iXSwibmFtZXMiOlsiYXV0aG9yaXplIiwiQVBJX0tFWSIsInByb2Nlc3MiLCJlbnYiLCJBUElfS0VZX1dBUk5JTkciLCJhdXRoIiwicmVxIiwicmVzIiwic3RhdHVzIiwiZW5kIiwicmVzcG9uc2UiLCJyb29tIiwiYm9keSIsInNlY3JldCIsInVzZXJJbmZvIiwibmFtZSIsIk5BTUVTIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibGVuZ3RoIiwicGljdHVyZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth.ts"));
module.exports = __webpack_exports__;

})();