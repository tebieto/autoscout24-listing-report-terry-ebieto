"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAbsolutePath = exports.csvUploadPath = void 0;
exports.csvUploadPath = '/uploads/csv';
var path_1 = __importDefault(require("path"));
var getAbsolutePath = function (filePath) {
    return path_1.default.join(__dirname, '../', filePath);
};
exports.getAbsolutePath = getAbsolutePath;
