import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useQuery } from '@tanstack/react-query';
import { ChartBar, ChartLine, Bitcoin, Layers, Database, TrendingUp, ArrowRightLeft, Search, RefreshCw, DollarSign, Clock, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import CryptoTradingView from '../components/CryptoTradingView';
import CryptoCategorySelector from '../components/CryptoCategorySelector';
import ErrorBoundary from '../components/ErrorBoundary';
import { getAssets, getAssetsByCategory, getExchangeRates, getOHLCVData, getGlobalMetrics } from '../services/cryptoService';
import { getLatestBlockNumber, getTrendingTokens, getTopGainersTokens } from '../services/blockchainService';

const MarketInsights = () => {
  const [globalMetrics, setGlobalMetrics] = useState(null);
const [blockchainData, setBlockchainData] = useState({
    latestBlockNumber: 0,
    transactionsPerSecond: 0,
    averageGasFee: 0,
    pendingTransactions: 0,
    networkUtilization: 0,
    walletTransactions: []
  });
  const [trendingTokens, setTrendingTokens] = useState([]);
  const [topGainers, setTopGainers] = useState([]);
  const [ohlcvData, setOhlcvData] = useState([]);

  useEffect(() => {
    const fetchTokenAnalytics = async () => {
      try {
        const [trending, gainers] = await Promise.all([
          getTrendingTokens(),
          getTopGainersTokens()
        ]);
        setTrendingTokens(trending || []);
        setTopGainers(gainers || []);
      } catch (error) {
        console.error('Error fetching token analytics:', error);
        toast({
          variant: 'destructive',
          title: 'Data Error',
          description: 'Failed to load market movers data'
        });
      }
    };
    fetchTokenAnalytics();
  }, []);

  

  useEffect(() => {
    const fetchGlobalMetrics = async () => {
      try {
        const metrics = await getGlobalMetrics();
        setGlobalMetrics(metrics);
      } catch (error) {
        console.error('Error fetching global metrics:', error);
        toast({
          variant: 'destructive',
          title: 'API Error',
          description: error.message
        });
      }
    };
    fetchGlobalMetrics();
  }, []);

  useEffect(() => {
    const fetchBlockchainData = async () => {
      try {
        const blockNumber = await getLatestBlockNumber();
        setBlockchainData(prev => ({
          ...prev,
          latestBlockNumber: blockNumber
        }));
      } catch (error) {
        console.error('Error fetching blockchain data:', error);
      }
    };
    fetchBlockchainData();
  }, []);

  const { toast } = useToast();
  const [selectedMetric, setSelectedMetric] = useState('price');
  const [timeframe, setTimeframe] = useState('1DAY');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAsset, setSelectedAsset] = useState('BTC');
  const [searchQuery, setSearchQuery] = useState('');
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch assets based on selected category
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setIsLoading(true);
        let data;
        
        if (selectedCategory === 'all') {
          data = await getAssets();
        } else {
          data = await getAssetsByCategory(selectedCategory);
        }

        if (!data || data.length === 0) {
          toast({
            variant: 'destructive',
            title: 'No Data',
            description: 'No cryptocurrencies found for this category'
          });
        }

        setAssets(data || []);
      } catch (error) {
        console.error('Error fetching assets:', error);
        toast({
          variant: 'destructive',
          title: 'API Error',
          description: error.message
        });
        setAssets([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAssets();
  }, [selectedCategory]);

  // Filter assets based on search query
  const filteredAssets = searchQuery
    ? assets.filter(asset => 
        asset.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.asset_id?.toLowerCase().includes(searchQuery.toLowerCase()))
    : assets;

  // Fetch market data for selected asset
  const { data: marketData, isLoading: isMarketDataLoading, error } = useQuery({
    queryKey: ['marketData', selectedAsset, timeframe],
    queryFn: async () => {
      try {
        const exchangeRate = await getExchangeRates(selectedAsset);
        
        // Calculate price change (mock data for now)
        let ohlcvData;
try {
  const data = await getOHLCVData(selectedAsset, timeframe, 24) || [];
  setOhlcvData(data);
  ohlcvData = data;
} catch (error) {
  ohlcvData = [];
}
const selectedAssetData = assets.find(asset => asset.asset_id === selectedAsset);
        const priceChange = ohlcvData?.length > 0 && ohlcvData[0]?.price_close
          ? ((exchangeRate.rate - ohlcvData[0].price_close) / ohlcvData[0].price_close * 100).toFixed(2)
          : 0;
        const volumeChange = ohlcvData?.length > 1 && ohlcvData[0]?.volume_traded && ohlcvData[1]?.volume_traded
          ? ((ohlcvData[1].volume_traded - ohlcvData[0].volume_traded) / ohlcvData[0].volume_traded * 100).toFixed(2)
          : 0;
        
        return {
          price: `$${exchangeRate?.rate?.toFixed(2) || '0.00'}`, 
          volume: `$${(ohlcvData?.reduce((acc, curr) => acc + (curr?.volume_traded || 0), 0) / 1e6 || 0).toFixed(2)}M`, 
          marketCap: `$${((exchangeRate?.rate || 0) * ((ohlcvData[0]?.volume_traded || 0)) / 1e9).toFixed(2)}B`,
          transactions: `${Math.floor((ohlcvData[0]?.trades_count || 0) / 1000)}K`,
          priceChange: `${priceChange > 0 ? '+' : ''}${priceChange}%`,
          volumeChange: `${volumeChange > 0 ? '+' : ''}${volumeChange}%`,
          aiPrediction: {
            nextDay: `$${(exchangeRate?.rate * (1 + Math.random() * 0.1)).toFixed(2) || '0.00'}`,
            nextWeek: `$${(exchangeRate?.rate * (1 + Math.random() * 0.2)).toFixed(2) || '0.00'}`,
            confidence: `${Math.floor(Math.random() * 30 + 70)}%`,
            trend: Math.random() > 0.5 ? 'bullish' : 'bearish',
            signals: []
          }
        };
      } catch (error) {
        console.error('Error fetching market data:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load market data. Please try again."
        });
        return {};
      }
    },
    enabled: !!selectedAsset,
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Market Data Error',
        description: error.message
      });
    }
  });

  const metrics = [
    { value: 'price', label: 'Price' },
    { value: 'volume', label: '24h Volume' },
    { value: 'marketCap', label: 'Market Cap' },
    { value: 'transactions', label: 'Transactions' },
    { value: 'sentiment', label: 'Market Sentiment' }
  ];

  const timeframes = [
    { value: '1HRS', label: '1H' },
    { value: '1DAY', label: '1D' },
    { value: '7DAY', label: '1W' },
    { value: '1MTH', label: '1M' }
  ];

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#403E43] to-[#221F26] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Crypto Market Insights
          </h1>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
              <Input
                placeholder="Search cryptocurrencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 bg-white/10 backdrop-blur-lg border-purple-500/20 text-purple-200"
              />
            </div>
            <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Link to="/marketplace">Trade Now</Link>
            </Button>
          </div>
        </div>

        {/* Cryptocurrency Categories */}
        {/* Global Market Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <Card className="bg-purple-900/20 backdrop-blur-lg border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-300">
                Transactions/Sec
              </CardTitle>
              <ArrowRightLeft className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-purple-100">
                {blockchainData.transactionsPerSecond.toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-purple-900/20 backdrop-blur-lg border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-300">
                Avg Gas Fee
              </CardTitle>
              <DollarSign className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-purple-100">
                {(blockchainData.averageGasFee / 1e9).toFixed(2)} gwei
              </div>
            </CardContent>
          </Card>
          <Card className="bg-purple-900/20 backdrop-blur-lg border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-300">
                Pending Transactions
              </CardTitle>
              <Clock className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-purple-100">
                {blockchainData.pendingTransactions}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-purple-900/20 backdrop-blur-lg border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-300">
                Network Utilization
              </CardTitle>
              <Activity className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-purple-100">
                {blockchainData.networkUtilization}%
              </div>
            </CardContent>
          </Card>
          <Card className="bg-purple-900/20 backdrop-blur-lg border-purple-500/20">
            <CardContent className="p-4">
              <div className="text-sm text-purple-300 mb-1">Total Market Cap</div>
              <div className="text-xl font-bold text-purple-100">
                ${(globalMetrics?.total_market_cap / 1e12).toFixed(2)}T
              </div>
              <div className={`text-xs ${globalMetrics?.market_cap_change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {globalMetrics?.market_cap_change?.toFixed(2)}%
              </div>
            </CardContent>
          </Card>
          <Card className="bg-purple-900/20 backdrop-blur-lg border-purple-500/20">
            <CardContent className="p-4">
              <div className="text-sm text-purple-300 mb-1">24h Volume</div>
              <div className="text-xl font-bold text-purple-100">$124.56B</div>
              <div className="text-xs text-red-400">-1.23%</div>
            </CardContent>
          </Card>
          <Card className="bg-purple-900/20 backdrop-blur-lg border-purple-500/20">
            <CardContent className="p-4">
              <div className="text-sm text-purple-300 mb-1">BTC Dominance</div>
              <div className="text-xl font-bold text-purple-100">48.3%</div>
              <div className="text-xs text-green-400">+0.67%</div>
            </CardContent>
          </Card>
          <Card className="bg-purple-900/20 backdrop-blur-lg border-purple-500/20">
            <CardContent className="p-4">
              <div className="text-sm text-purple-300 mb-1">ETH Dominance</div>
              <div className="text-xl font-bold text-purple-100">18.2%</div>
              <div className="text-xs text-red-400">-0.32%</div>
            </CardContent>
          </Card>
          <Card className="bg-purple-900/20 backdrop-blur-lg border-purple-500/20">
            <CardContent className="p-4">
              <div className="text-sm text-purple-300 mb-1">Active Cryptos</div>
              <div className="text-xl font-bold text-purple-100">10,234</div>
              <div className="text-xs text-green-400">+124 (24h)</div>
            </CardContent>
          </Card>
          <Card className="bg-purple-900/20 backdrop-blur-lg border-purple-500/20">
            <CardContent className="p-4">
              <div className="text-sm text-purple-300 mb-1">Total Exchanges</div>
              <div className="text-xl font-bold text-purple-100">523</div>
              <div className="text-xs text-green-400">+3 (24h)</div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <CryptoCategorySelector 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
        </div>

        {/* Asset Selection and Trading View */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1">
            <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20 h-full">
              <CardHeader>
                <CardTitle className="text-purple-200 flex items-center gap-2">
                  <Bitcoin className="h-5 w-5" />
                  Available Cryptocurrencies
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[600px]">
                <ScrollArea className="h-full">
                  {isLoading ? (
                    <div className="animate-pulse text-center py-4">
                      <p className="text-purple-500">Loading cryptocurrencies...</p>
                    </div>
                  ) : filteredAssets.length === 0 ? (
                    <p className="text-center text-purple-300 py-4">No cryptocurrencies found</p>
                  ) : (
                    <div className="space-y-2">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-purple-900/20">
                            <tr>
                              <th className="p-2 text-left">#</th>
                              <th className="p-2 text-left">Name</th>
                              <th className="p-2 text-right">Price</th>
                              <th className="p-2 text-right">24h %</th>
                              <th className="p-2 text-right">Market Cap</th>
                              <th className="p-2 text-right">Volume(24h)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredAssets.map((asset, index) => (
                              <tr
                                key={asset.asset_id}
                                className="hover:bg-purple-500/10 cursor-pointer"
                                onClick={() => setSelectedAsset(asset.asset_id)}
                              >
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2 font-medium">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono">{asset.asset_id}</span>
                                    <span className="text-purple-300">{asset.name}</span>
                                  </div>
                                </td>
                                <td className="p-2 text-right">${asset.price_usd?.toFixed(2) || '0.00'}</td>
                                <td className={`p-2 text-right ${asset.percent_change_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                  {asset.percent_change_24h?.toFixed(2)}%
                                </td>
                                <td className="p-2 text-right">${(asset.market_cap / 1e9).toFixed(2)}B</td>
                                <td className="p-2 text-right">${(asset.volume_24h / 1e6).toFixed(2)}M</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-3">
            {isMarketDataLoading ? (
              <div className="h-[400px] flex items-center justify-center">
                <RefreshCw className="h-8 w-8 animate-spin text-purple-500" />
              </div>
            ) : (
              <ErrorBoundary fallback={<div className="text-red-400">Chart initialization failed</div>}>
                <CryptoTradingView 
                  assetId={selectedAsset}
                  baseId="USD"
                />
              </ErrorBoundary>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-200 flex items-center gap-2">
                <Bitcoin className="h-5 w-5" />
                Current Price
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-100">
                {isMarketDataLoading ? "Loading..." : marketData?.price}
              </p>
              <p className="text-sm text-green-400">{marketData?.priceChange}</p>
              <p className="text-xs text-purple-300 mt-2">
                AI Prediction: {marketData?.aiPrediction?.nextDay} (24h)
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-200 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Market Sentiment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-100">
                {marketData?.aiPrediction?.trend || "Loading..."}
              </p>
              <div className="mt-2">
                {marketData?.aiPrediction?.signals?.map((signal, index) => (
                  <p key={index} className="text-xs text-purple-300">{signal}</p>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-200 flex items-center gap-2">
                <ChartBar className="h-5 w-5" />
                Trading Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-100">
                {isLoading ? "Loading..." : marketData?.volume}
              </p>
              <p className="text-sm text-green-400">{marketData?.volumeChange}</p>
              <p className="text-xs text-purple-300 mt-2">
                Confidence: {marketData?.aiPrediction?.confidence}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-200 flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5" />
                Price Prediction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-100">
                {marketData?.aiPrediction?.nextWeek || "Loading..."}
              </p>
              <p className="text-sm text-purple-300">7-day forecast</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-2 w-full bg-purple-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    style={{ width: marketData?.aiPrediction?.confidence || '0%' }}
                  />
                </div>
                <span className="text-xs text-purple-300">{marketData?.aiPrediction?.confidence}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Movers Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-200 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trending Tokens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {trendingTokens.length > 0 ? (
                  trendingTokens.map(token => (
                    <div key={token.asset_id} className="flex items-center justify-between p-2 hover:bg-purple-500/10">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-purple-100">{token.name}</span>
                        <span className="text-sm text-purple-300">{token.asset_id}</span>
                      </div>
                      <span className={`text-sm ${token.percent_change_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {token.percent_change_24h >= 0 ? '+' : ''}{token.percent_change_24h}%
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-purple-300">
                    <p>No trending tokens data available</p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-200 flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Top Gainers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {topGainers.length > 0 ? (
                  topGainers.map(token => (
                    <div key={token.asset_id} className="flex items-center justify-between p-2 hover:bg-purple-500/10">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-purple-100">{token.name}</span>
                        <span className="text-sm text-purple-300">{token.asset_id}</span>
                      </div>
                      <span className="text-sm text-green-400">
                        +{token.percent_change_24h}%
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-purple-300">
                    <p>No top gainers data available</p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </ErrorBoundary>
  );
};

export default MarketInsights;
