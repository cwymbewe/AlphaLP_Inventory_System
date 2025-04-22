import express from 'express';
import Stock from '../models/Stock.js';
import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();
const auth = new google.auth.GoogleAuth({
    credentials: process.env.GOOGLE_SERVICE_ACCOUNT_JSON ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON) : {},
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
});
const sheets = google.sheets({
    version: 'v4',
    auth
});
const addToGoogleSheet = async (data) => {
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    const range = 'Sheet1!B2:H9999'; // Base range to fetch existing data
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
    });
    const existingValues = response.data.values || [];
    const nextRow = existingValues.length + 2; // +2 to account for header and starting row
    const body = {
        values: [[data.item, data.quantity, data.location, new Date()]]
    };
    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `Sheet1!B${nextRow}:H${nextRow}`, // Dynamic range
        valueInputOption: 'RAW',
        requestBody: body
    });
};
import { authenticate } from '../authMiddleware.js'; // Import authentication middleware
const router = express.Router();
router.post('/', authenticate, async (req, res) => {
    const { item, quantity, location } = req.body;
    // Data validation
    if (!item || !quantity || !location) {
        return res.status(400).json({ error: 'Item, quantity, and location are required.' });
    }
    try {
        // Save data to MongoDB first
        const stock = await Stock.create(req.body);
        // Then, add data to Google Sheet
        await addToGoogleSheet(stock);
        // Return the stock item as response
        res.json(stock);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
router.get('/', authenticate, async (req, res) => {
    console.log('Fetching stocks...'); // Log the fetching action
    try {
        const stocks = await Stock.find(); // Fetch all stocks from the database
        res.json(stocks); // Return stocks as response
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export default router;
