import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from '@tanstack/react-query';
import { ChartBar, ChartLine, Bitcoin, Database, TrendingUp, ArrowRightLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const MarketInsights = () => {
  const [selectedMetric, setSelectedMetric] = useState('price');
  const [timeframe, setTimeframe] = useState('24h');

  // Mock chart data - in production, this would come from your API
  const chartData = [
    { time: '00:00', value: 45000 },
    { time: '04:00', value: 45200 },
    { time: '08:00', value: 44800 },
    { time: '12:00', value: 46000 },
    { time: '16:00', value: 45600 },
    { time: '20:00', value: 45900 },
    { time: '24:00', value: 45800 },
  ];

  const { data: marketData, isLoading } = useQuery({
    queryKey: ['marketData', selectedMetric, timeframe],
    queryFn: async () => {
      // For now, return mock data. In production, integrate with Moralis API
      return {
        price: '$45,000',
        volume: '$2.5B',
        marketCap: '$850B',
        transactions: '125K',
        priceChange: '+2.5%',
        volumeChange: '+15%'
      };
    }
  });

  const metrics = [
    { value: 'price', label: 'Price' },
    { value: 'volume', label: '24h Volume' },
    { value: 'marketCap', label: 'Market Cap' },
    { value: 'transactions', label: 'Transactions' }
  ];

  const timeframes = [
    { value: '24h', label: '24H' },
    { value: '7d', label: '7D' },
    { value: '30d', label: '30D' },
    { value: '1y', label: '1Y' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#403E43] to-[#221F26] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Market Insights
          </h1>
          <div className="flex gap-4">
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-[180px] bg-white/10 backdrop-blur-lg border-purple-500/20">
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent className="bg-white/10 backdrop-blur-lg border-purple-500/20">
                {metrics.map((metric) => (
                  <SelectItem key={metric.value} value={metric.value} className="text-purple-200 hover:text-purple-100 hover:bg-purple-500/20">
                    {metric.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Link to="/marketplace">Trade Now</Link>
            </Button>
          </div>
        </div>

        {/* Price Chart Section */}
        <Card className="mb-8 bg-white/10 backdrop-blur-lg border-purple-500/20">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-purple-200">Price Chart</CardTitle>
              <div className="flex gap-2">
                {timeframes.map((tf) => (
                  <Button
                    key={tf.value}
                    variant={timeframe === tf.value ? "secondary" : "ghost"}
                    onClick={() => setTimeframe(tf.value)}
                    className="text-sm"
                  >
                    {tf.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
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
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-200 flex items-center gap-2">
                <Bitcoin className="h-5 w-5" />
                Price
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-100">
                {isLoading ? "Loading..." : marketData?.price}
              </p>
              <p className="text-sm text-green-400">{marketData?.priceChange}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-200 flex items-center gap-2">
                <ChartLine className="h-5 w-5" />
                24h Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-100">
                {isLoading ? "Loading..." : marketData?.volume}
              </p>
              <p className="text-sm text-green-400">{marketData?.volumeChange}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-200 flex items-center gap-2">
                <ChartBar className="h-5 w-5" />
                Market Cap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-100">
                {isLoading ? "Loading..." : marketData?.marketCap}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-200 flex items-center gap-2">
                <Database className="h-5 w-5" />
                Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-100">
                {isLoading ? "Loading..." : marketData?.transactions}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button 
            asChild 
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Link to="/dex">
              <ArrowRightLeft className="mr-2 h-5 w-5" />
              Go to DEX
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;