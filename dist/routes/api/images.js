"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var logger_1 = __importDefault(require("../../utilities/logger"));
var fs = require("fs");
var path = require("path");
var sharp = require("sharp");
var images = express_1.default.Router();
images.get('/', logger_1.default, function (req, res) {
    var fileName = req.query.filename; //filename parameter
    var width = req.query.width; //width parameter
    var height = req.query.height; //height parameter
    if (fileName && width && height) {
        //if all the fields contain values, then proceed
        var fileArr = fileName.split('.'); //spliting needed to rename the file
        var thumbFilePath = //thumbFilePath: path str that leads to public/assets/thumb (which holds resized images)
         '../../../public/assets/thumb/' + //thumbnail filename ex: profile_thumb_20x20.jpg
            fileArr[0] + //fileName
            '_thumb_' +
            width +
            'x' +
            height +
            '.' +
            fileArr[1]; //file extension
        var resizedPath = path.join(__dirname, thumbFilePath); //getting relative path to current dir for thumbs
        //if the file exists, simply serve the content
        if (fs.existsSync(resizedPath)) {
            res.sendFile(resizedPath);
        }
        else {
            try {
                resizeImage(fileName, parseInt(width), parseInt(height), thumbFilePath); //resizeImage deals with sharp logic
                res.sendFile(resizedPath);
            }
            catch (error) {
                res.send(error);
            }
        }
    }
    else {
        //line is executed when parameters to url are invalid
        res.send('Error: No image input was given or the parameters (width and height) are missing.');
    }
});
function resizeImage(fileName, width, height, result) {
    return __awaiter(this, void 0, void 0, function () {
        var fullSizePath, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    fullSizePath = '../../../public/assets/full/' + fileName;
                    return [4 /*yield*/, sharp(path.join(__dirname, fullSizePath)) //await req for resizing image via sharp module and making new file
                            .resize({
                            width: width,
                            height: height,
                        })
                            .toFile(path.join(__dirname, result))];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = images;
