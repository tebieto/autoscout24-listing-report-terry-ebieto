"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadContactList = void 0;
var fs = __importStar(require("fs"));
var csv = __importStar(require("fast-csv"));
var utils_1 = require("../../utils");
var uploadContactList = function (req, res) {
    try {
        if (req.file == undefined) {
            res.status(400).send('Please upload a CSV file!');
        }
        var path = utils_1.getAbsolutePath(utils_1.csvUploadPath);
        var contactList_1 = [];
        fs.createReadStream(path)
            .pipe(csv.parse({ headers: true }))
            .on('error', function (error) {
            throw error.message;
        })
            .on('data', function (row) {
            contactList_1.push(row);
        })
            .on('end', function () {
            console.log({ contactList: contactList_1 });
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Could not upload the file: ' + req.file.originalname,
        });
    }
};
exports.uploadContactList = uploadContactList;
