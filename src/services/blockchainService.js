/**
 * Blockchain data service using Moralis API
 */

const MORALIS_API_KEY = import.meta.env.VITE_MORALIS_API_KEY;

if (!MORALIS_API_KEY) {
  throw new Error('Moralis API key missing - get one at https://moralis.io/');
}
const BASE_URL = "https://deep-index.moralis.io/api/v2.2";

const handleMoralisResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Moralis API error: ${errorData.message || 'Unknown error'}`);
  }
  return response.json();
};







export const getBlockByHash = async (blockHash, chain = 'eth') => {
  try {
    const response = await fetch(`${BASE_URL}/block/${blockHash}?chain=${chain}`, {
      headers: { 
        'X-API-Key': MORALIS_API_KEY,
        'Accept': 'application/json'
      }
    });
    return handleMoralisResponse(response);
  } catch (error) {
    console.error('Error fetching block:', error);
    throw error;
  }
};







export const getBlockByDate = async (date, chain = 'eth') => {
  try {
    const response = await fetch(`${BASE_URL}/dateToBlock?date=${date}&chain=${chain}`, {
      headers: { 
        'X-API-Key': MORALIS_API_KEY,
        'Accept': 'application/json'
      }
    });
    return handleMoralisResponse(response);
  } catch (error) {
    console.error('Error fetching block by date:', error);
    throw error;
  }
};







export const getWalletTransactions = async (address, chain = 'eth') => {
  try {
    const response = await fetch(`${BASE_URL}/${address}?chain=${chain}`, {
      headers: { 
        'X-API-Key': MORALIS_API_KEY,
        'Accept': 'application/json'
      }
    });
    return handleMoralisResponse(response);
  } catch (error) {
    console.error('Error fetching wallet transactions:', error);
    throw error;
  }
};







export const getTransactionDetails = async (txHash, chain = 'eth') => {
  try {
    const response = await fetch(`${BASE_URL}/transaction/${txHash}/verbose?chain=${chain}`, {
      headers: { 
        'X-API-Key': MORALIS_API_KEY,
        'Accept': 'application/json'
      }
    });
    return handleMoralisResponse(response);
  } catch (error) {
    console.error('Error fetching transaction details:', error);
    throw error;
  }
};







export const getLatestBlockNumber = async (chain = 'eth') => {
  try {
    const response = await fetch(`${BASE_URL}/latestBlockNumber/${chain}`, {
      headers: { 
        'X-API-Key': MORALIS_API_KEY,
        'Accept': 'application/json'
      }
    });
    const data = await handleMoralisResponse(response);
    return data.block_number;
  } catch (error) {
    console.error('Error fetching latest block:', error);
    throw error;
  }
};







export const getTrendingTokens = async (chain = 'eth') => {
  try {
    const response = await fetch(`${BASE_URL}/tokens/trending?chain=${chain}`, {
      headers: { 
        'X-API-Key': MORALIS_API_KEY,
        'Accept': 'application/json'
      }
    });
    const data = await handleMoralisResponse(response);
    return data.result.map(token => ({
      asset_id: token.symbol,
      name: token.name,
      price_usd: token.price,
      percent_change_24h: token.percentChange24h,
      volume_24h: token.volume
    }));
  } catch (error) {
    console.error('Error fetching trending tokens:', error);
    throw error;
  }
};







export const getTopGainersTokens = async (chain = 'eth') => {
  try {
    const response = await fetch(`${BASE_URL}/discovery/tokens/top-gainers?chain=${chain}`, {
      headers: { 
        'X-API-Key': MORALIS_API_KEY,
        'Accept': 'application/json'
      }
    });
    const data = await handleMoralisResponse(response);
    return data.result.map(token => ({
      asset_id: token.symbol,
      name: token.name,
      price_usd: token.price,
      percent_change_24h: token.percentChange24h
    }));
  } catch (error) {
    console.error('Error fetching top gainers:', error);
    throw error;
  }
};