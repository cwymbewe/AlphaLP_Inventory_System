import express from 'express';
import Stock from './models/Stock.js'

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