"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger = function (req, res, next) {
    var url = req.url;
    console.dir("".concat(url, " was accessed by ").concat(req.ip.slice(7)));
    next();
};
exports.default = logger;
