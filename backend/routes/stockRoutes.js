import express from 'express';
import Stock from './models/Stock.js';
import {google} from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const sheets = google.sheets({
    version: 'v4',
    auth
});

const addToGoogleSheet = async (data) => {
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    const range = 'Sheet1!A:E';
    const body = {
        values: [[data.item, data.quantity, data.location, new Date()]]
    };
    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        requestBody: {body}
    });
};

const router = express.Router();

/*........................
// Get all stock items
router.get('/', async (req, res) => {
    try {
        const stockItems = await Stock.find().populate('user', 'name');
        res.json(stockItems);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});
........................*/

// Add a new stock item
router.post('/', async (req, res) => {
  try {
    const stock = await Stock.create(req.body);
    res.json(stock);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

export default router;