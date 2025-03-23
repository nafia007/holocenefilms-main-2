import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { ChartBar, ChartLine, CandlestickChart, TrendingUp, TrendingDown, Layers, RefreshCw } from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { getOHLCVData, formatOHLCVForCharts } from '../services/cryptoService';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';
import './TradingView.css';

const CryptoTradingView = ({ assetId, baseId = 'USD' }) => {
  // https://coinmarketcap.com/  // Normalize symbol format for TradingView
  const [selectedExchange, setSelectedExchange] = useState('BINANCE');
const tradingViewSymbol = `${selectedExchange || 'BINANCE'}:${assetId}/${baseId}`.toUpperCase();
  const [chartType, setChartType] = useState('area');
  const [timeframe, setTimeframe] = useState('1DAY');
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [indicators, setIndicators] = useState({
    sma: false,
    ema: false,
    bollinger: false,
    volume: true
  });
  const { toast } = useToast();

  // Technical indicators (simplified for demo)
  const calculateSMA = (data, period = 7) => {
    if (!data || data.length < period) return [];
    
    return data.map((item, index) => {
      if (index < period - 1) return { ...item, sma: null };
      
      const sum = data.slice(index - period + 1, index + 1).reduce((acc, curr) => acc + curr.close, 0);
      return { ...item, sma: sum / period };
    });
  };

  const calculateEMA = (data, period = 12) => {
    if (!data || data.length < period) return [];
    
    const k = 2 / (period + 1);
    let ema = data[0].close;
    
    return data.map((item, index) => {
      if (index === 0) return { ...item, ema: item.close };
      
      ema = (item.close * k) + (ema * (1 - k));
      return { ...item, ema };
    });
  };

  const calculateBollingerBands = (data, period = 20, stdDev = 2) => {
    if (!data || data.length < period) return [];
    
    return data.map((item, index) => {
      if (index < period - 1) {
        return { ...item, upper: null, lower: null, middle: null };
      }
      
      const slice = data.slice(index - period + 1, index + 1);
      const avg = slice.reduce((acc, curr) => acc + curr.close, 0) / period;
      
      const squaredDiffs = slice.map(d => Math.pow(d.close - avg, 2));
      const variance = squaredDiffs.reduce((acc, curr) => acc + curr, 0) / period;
      const stdDeviation = Math.sqrt(variance);
      
      return {
        ...item,
        middle: avg,
        upper: avg + (stdDeviation * stdDev),
        lower: avg - (stdDeviation * stdDev)
      };
    });
  };

  useEffect(() => {
    const fetchChartData = async () => {
      if (!assetId) return;
      
      try {
        setIsLoading(true);
        const ohlcvData = await getOHLCVData(assetId, timeframe, 30, baseId);
        let formattedData = formatOHLCVForCharts(ohlcvData);
        
        // Apply indicators if enabled
        if (indicators.sma) {
          formattedData = calculateSMA(formattedData);
        }
        
        if (indicators.ema) {
          formattedData = calculateEMA(formattedData);
        }
        
        if (indicators.bollinger) {
          formattedData = calculateBollingerBands(formattedData);
        }
        
        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load chart data. Please try again."
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchChartData();
  }, [assetId, baseId, timeframe, indicators, toast]);

  const refreshData = () => {
    setIsLoading(true);
    // Re-trigger the useEffect
    setTimeframe(prev => prev);
  };

  const renderChart = () => {
    if (isLoading || chartData.length === 0) {
      return (
        <div className="h-full flex items-center justify-center">
          <RefreshCw className="h-6 w-6 animate-spin text-purple-500" />
        </div>
      );
    }

    const renderAreaChart = () => (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="time" 
            stroke="#9CA3AF"
            tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
          />
          <YAxis stroke="#9CA3AF" domain={['auto', 'auto']} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(17, 24, 39, 0.8)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="close"
            stroke="#8B5CF6"
            fill="#8B5CF6"
            fillOpacity={0.1}
            strokeWidth={2}
            name="Price"
          />
          {indicators.sma && (
            <Line
              type="monotone"
              dataKey="sma"
              stroke="#EC4899"
              strokeWidth={2}
              dot={false}
              name="SMA"
            />
          )}
          {indicators.ema && (
            <Line
              type="monotone"
              dataKey="ema"
              stroke="#10B981"
              strokeWidth={2}
              dot={false}
              name="EMA"
            />
          )}
          {indicators.bollinger && (
            <>
              <Line
                type="monotone"
                dataKey="upper"
                stroke="#F59E0B"
                strokeWidth={1}
                strokeDasharray="3 3"
                dot={false}
                name="Upper Band"
              />
              <Line
                type="monotone"
                dataKey="middle"
                stroke="#F59E0B"
                strokeWidth={1}
                dot={false}
                name="Middle Band"
              />
              <Line
                type="monotone"
                dataKey="lower"
                stroke="#F59E0B"
                strokeWidth={1}
                strokeDasharray="3 3"
                dot={false}
                name="Lower Band"
              />
            </>
          )}
          {indicators.volume && (
            <Area
              type="monotone"
              dataKey="volume"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.1}
              strokeWidth={1}
              name="Volume"
              yAxisId={1}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    );

    const renderLineChart = () => (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" domain={['auto', 'auto']} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(17, 24, 39, 0.8)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#8B5CF6"
            strokeWidth={2}
            name="Price"
          />
          {indicators.sma && (
            <Line
              type="monotone"
              dataKey="sma"
              stroke="#EC4899"
              strokeWidth={2}
              dot={false}
              name="SMA"
            />
          )}
          {indicators.ema && (
            <Line
              type="monotone"
              dataKey="ema"
              stroke="#10B981"
              strokeWidth={2}
              dot={false}
              name="EMA"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    );

    const renderBarChart = () => (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(17, 24, 39, 0.8)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Bar dataKey="volume" fill="#8B5CF6" name="Volume" />
        </BarChart>
      </ResponsiveContainer>
    );

    const renderTradingViewWidget = () => {
      // Format the symbol for TradingView
      // Default to BINANCE exchange but allow for flexibility with different base currencies
      const tvSymbol = baseId ? `BINANCE:${assetId}${baseId}` : `BINANCE:${assetId}USDT`;
      
      // Map timeframe to TradingView intervals
      const intervalMap = {
        '1HRS': '60',  // 60 minutes
        '1DAY': 'D',   // 1 day
        '7DAY': 'W',   // 1 week
        '1MTH': 'M'    // 1 month
      };
      
      const tvInterval = intervalMap[timeframe] || 'D';
      
      return (
        <div className="h-[500px] w-full">
          <div className="tradingview-widget-container">
            <AdvancedRealTimeChart
              symbol={tradingViewSymbol}
              theme="dark"
              autosize
              toolbar_bg="#1A1F2C"
              hide_side_toolbar={false}
              interval={tvInterval}
              locale="en"
              enable_publishing={false}
              allow_symbol_change={true}
              studies={indicators.volume ? ['Volume'] : []}
            />
          </div>
        </div>
      );
    };

    switch (chartType) {
      case 'line':
        return renderLineChart();
      case 'bar':
        return renderBarChart();
      case 'tradingview':
        return renderTradingViewWidget();
      case 'area':
      default:
        return renderAreaChart();
    }
  };

  // If no asset is selected, show a message
  if (!assetId) {
    return (
      <div className="h-[500px] flex items-center justify-center bg-white/10 backdrop-blur-lg border-purple-500/20 rounded-lg">
        <p className="text-purple-300 text-center p-4">
          Please select a cryptocurrency to view trading charts
        </p>
      </div>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-purple-200 flex items-center gap-2">
            <CandlestickChart className="h-5 w-5" />
            {assetId} Trading View
          </CardTitle>
          <div className="flex items-center gap-4">
            <Select value={selectedExchange} onValueChange={setSelectedExchange}>
              <SelectTrigger className="w-[120px] bg-purple-900/20 border-purple-500/20">
                <SelectValue placeholder="Exchange" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1F2C] border-purple-500/20">
                <SelectItem value="BINANCE">Binance</SelectItem>
                <SelectItem value="COINBASE">Coinbase</SelectItem>
                <SelectItem value="KUCOIN">KuCoin</SelectItem>
                <SelectItem value="KRAKEN">Kraken</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={chartType === 'area' ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setChartType('area')}
                className="p-2"
              >
                <ChartLine className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === 'line' ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setChartType('line')}
                className="p-2"
              >
                <TrendingUp className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === 'bar' ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setChartType('bar')}
                className="p-2"
              >
                <ChartBar className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === 'tradingview' ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setChartType('tradingview')}
                className="p-2"
              >
                <TrendingUp className="h-4 w-4" />
              </Button>
            </div>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[120px] bg-white/10 backdrop-blur-lg border-purple-500/20">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent className="bg-white/10 backdrop-blur-lg border-purple-500/20">
                <SelectItem value="1HRS">1 Hour</SelectItem>
                <SelectItem value="1DAY">1 Day</SelectItem>
                <SelectItem value="7DAY">1 Week</SelectItem>
                <SelectItem value="1MTH">1 Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  );
};

export default CryptoTradingView;
