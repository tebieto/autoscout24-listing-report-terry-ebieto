"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.Sequelize = void 0;
var sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
var env = process.env.NODE_ENV || 'development';
var index_1 = __importDefault(require("../config/index"));
var config = index_1.default[env];
var sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config.options);
exports.sequelize = sequelize;
