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
import { ChartBar, ChartLine, Bitcoin, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

const MarketInsights = () => {
  const [selectedMetric, setSelectedMetric] = useState('price');

  const { data: marketData, isLoading } = useQuery({
    queryKey: ['marketData', selectedMetric],
    queryFn: async () => {
      // For now, return mock data. In production, integrate with Moralis API
      return {
        price: '$45,000',
        volume: '$2.5B',
        marketCap: '$850B',
        transactions: '125K'
      };
    }
  });

  const metrics = [
    { value: 'price', label: 'Price' },
    { value: 'volume', label: '24h Volume' },
    { value: 'marketCap', label: 'Market Cap' },
    { value: 'transactions', label: 'Transactions' }
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
              <Link to="/marketplace">Go to Market</Link>
            </Button>
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default MarketInsights;