"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== 'production')
    dotenv_1.default.config();
var cred = {
    'username': process.env.DB_USERNAME || '',
    'password': process.env.DB_PASSWORD || '',
    'database': process.env.PGDATABASE || '',
    'dialect': 'postgres',
    options: {
        'host': process.env.PGHOST || '',
        'dialect': 'postgres',
    }
};
var config = {
    'development': cred,
    'test': cred,
    'production': cred
};
exports.default = config;
