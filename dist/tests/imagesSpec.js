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
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../index"));
var server = (0, supertest_1.default)(index_1.default);
var fs = require("fs");
var path = require("path");
var sharp_1 = __importDefault(require("sharp"));
describe('Server endpoint testing', function () {
    it('can access the /api endpoint', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server.get('/api')];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws an error with no params', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server.get('/api/images')];
                case 1:
                    res = _a.sent();
                    expect(res.text).toBe('Error: No image input was given or the parameters (width and height) are missing.');
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws an error with partial params (only filename)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server.get('/api/images/?file=profile.jpg')];
                case 1:
                    res = _a.sent();
                    expect(res.text).toBe('Error: No image input was given or the parameters (width and height) are missing.');
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws an error with only a filename and width given', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server.get('/api/images/?file=profile.jpg&width=100')];
                case 1:
                    res = _a.sent();
                    expect(res.text).toBe('Error: No image input was given or the parameters (width and height) are missing.');
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws an error with only a filename and height given', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server.get('/api/images/?file=profile.jpg&height=100')];
                case 1:
                    res = _a.sent();
                    expect(res.text).toBe('Error: No image input was given or the parameters (width and height) are missing.');
                    return [2 /*return*/];
            }
        });
    }); });
    it('generates an image with valid parameters', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server.get('/api/images?filename=profile.jpg&width=100&height=100')];
                case 1:
                    res = _a.sent();
                    expect(res.text).not.toBeDefined(); //assuming that a served file header has undef text
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Testing image resizing functionality', function () {
    it('checks if the resized image is generated (using width: 480, height: 320)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var thumbFilePath, fullSizePath, resizedPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    thumbFilePath = '../../public/assets/thumb/profile_thumb_480x320.jpg';
                    fullSizePath = '../../public/assets/full/profile.jpg';
                    resizedPath = path.join(__dirname, thumbFilePath);
                    if (fs.existsSync(resizedPath)) {
                        fs.unlinkSync(resizedPath);
                    }
                    return [4 /*yield*/, (0, sharp_1.default)(path.join(__dirname, fullSizePath)) //await req for resizing image via sharp module and making new file
                            .resize({
                            width: 480,
                            height: 320,
                        })
                            .toFile(path.join(resizedPath))];
                case 1:
                    _a.sent();
                    expect(fs.existsSync(resizedPath)).toEqual(true);
                    return [2 /*return*/];
            }
        });
    }); });
});
