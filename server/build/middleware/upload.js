'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
	return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.uploadCSV = exports.uploadFile = void 0;
var multer_1 = __importDefault(require('multer'));
var utils_1 = require('../utils');
var isCSV = function (file) {
	return file.mimetype.includes('csv') ? true : false;
};
var getFileName = function (file, timestamp) {
	return timestamp + '-' + file.originalname;
};
var uploadFile = function (req, res, filePath) {
	try {
		var timestamp_1 = Date.now();
		var absolutePath_1 = utils_1.getAbsolutePath(filePath);
		var storage = multer_1.default.diskStorage({
			destination: function (req, file, cb) {
				cb(null, absolutePath_1);
			},
			filename: function (req, file, cb) {
				cb(null, getFileName(file, timestamp_1));
			}
		});
		var upload = multer_1.default({ storage: storage }).single('file');
		upload(req, res, function (err) {
			if (err instanceof multer_1.default.MulterError) {
				return res.status(500).json(err);
			}
			else if (err) {
				return res.status(500).json(err);
			}
			return res.status(200).send(filePath + '/' + getFileName(req.file, timestamp_1));
		});
	}
	catch (error) {
		console.log(error);
	}
};
exports.uploadFile = uploadFile;
var uploadCSV = function (req, res) {
	console.log({ req: req, res: res });
	if (req.file && isCSV(req.file)) {
		exports.uploadFile(req, res, utils_1.csvUploadPath);
	}
	else {
		var message = !req.file ? 'File not uploaded' : 'Only  CSV files allowed';
		res.status(400).send(message);
	}
};
exports.uploadCSV = uploadCSV;
