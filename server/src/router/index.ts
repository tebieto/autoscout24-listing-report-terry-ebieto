import express from 'express';
import multer from 'multer';
import { uploadCSVWithMulter } from '../middleware/upload';
import { persistReport } from '../services/report';

/**
 * Router Definition
 */
export const router = express.Router();

/**
 * Only REST endpoint available.
 * /upload/csv will be used for uploding the csv files
 * I use multer for file upload using the uploadCSVWithMulter middleware
 * And I call the persistReport Service afterwards, which handles reading 
 * and persisting data in CSV files to database
 * 
 * The csvFilesFied is used to tell multer the files to expect
 */

const csvFilesField: multer.Field[] = [{ name: 'contacts', maxCount: 1 }, { name: 'listings', maxCount: 1 }];
router.post('/upload/csv', uploadCSVWithMulter.fields(csvFilesField), persistReport);