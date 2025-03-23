import express from 'express';
import { getAssets, getGlobalMetrics } from '../services/cryptoService';
import { getLatestBlockNumber } from '../services/blockchainService';

const router = express.Router();

// Test CoinMarketCap API endpoints
router.get('/crypto/assets', async (req, res) => {
  try {
    const assets = await getAssets(1, 5);
    res.json({ success: true, data: assets });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/crypto/global-metrics', async (req, res) => {
  try {
    const metrics = await getGlobalMetrics();
    res.json({ success: true, data: metrics });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Test Moralis API endpoints
router.get('/blockchain/latest-block', async (req, res) => {
  try {
    const blockNumber = await getLatestBlockNumber();
    res.json({ success: true, data: { blockNumber } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;