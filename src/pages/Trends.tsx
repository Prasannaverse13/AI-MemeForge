import { useState, useEffect } from 'react';
import { TrendingUp, ArrowUp, ArrowDown, Loader2, Brain, LineChart, AlertCircle } from 'lucide-react';
import { getTrendingCoins, type CoinTrend } from '../lib/coingecko';
import { analyzeTrends } from '../lib/ai';

export function Trends() {
  const [marketTrends, setMarketTrends] = useState<CoinTrend[]>([]);
  const [aiTrends, setAiTrends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllTrends = async () => {
      try {
        setLoading(true);
        // Fetch both market data and AI analysis in parallel
        const [marketData, aiAnalysis] = await Promise.all([
          getTrendingCoins(),
          analyzeTrends()
        ]);
        
        setMarketTrends(marketData);
        setAiTrends(aiAnalysis);
      } catch (err) {
        setError('Failed to fetch trends. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllTrends();
    // Refresh trends every 5 minutes
    const interval = setInterval(fetchAllTrends, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="py-8 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin mb-4" />
        <p className="text-gray-400">Loading market trends...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-100">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <TrendingUp className="w-8 h-8 text-purple-500 mr-3" />
          <h1 className="text-3xl font-bold">Live Market Trends</h1>
        </div>
        <p className="text-sm text-gray-400">Auto-updates every 5 minutes</p>
      </div>

      {/* AI Analysis Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Brain className="w-6 h-6 text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold">AI Trend Analysis</h2>
        </div>
        
        <div className="grid gap-4">
          {aiTrends.map((trend) => (
            <div 
              key={trend.topic}
              className="bg-blue-900/20 backdrop-blur-sm p-6 rounded-xl border border-blue-500/30 hover:border-blue-500/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-blue-300">{trend.topic}</h3>
                  <div className="flex items-center mt-1">
                    <div className="text-sm text-blue-200">
                      Sentiment: {(trend.sentiment * 100).toFixed(1)}%
                    </div>
                    <div className="mx-2 text-gray-500">•</div>
                    <div className="text-sm text-blue-200">
                      Viral Potential: {(trend.viralPotential * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-medium text-blue-300">
                    Volume: {trend.volume.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Keywords</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {trend.keywords.map((keyword: string) => (
                      <span 
                        key={keyword}
                        className="px-2 py-1 bg-blue-500/20 rounded-full text-xs text-blue-300"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Sources</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {trend.sources.map((source: string) => (
                      <span 
                        key={source}
                        className="px-2 py-1 bg-blue-500/20 rounded-full text-xs text-blue-300"
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Data Section */}
      <div className="mb-4">
        <div className="flex items-center mb-4">
          <LineChart className="w-6 h-6 text-green-500 mr-2" />
          <h2 className="text-xl font-semibold">Market Data</h2>
        </div>
        
        <div className="grid gap-4">
          {marketTrends.map((coin) => (
            <div 
              key={coin.id}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-green-500/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full mr-3" />
                  <div>
                    <h3 className="text-xl font-semibold">{coin.name}</h3>
                    <p className="text-gray-400">{coin.symbol.toUpperCase()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-medium">${coin.current_price.toLocaleString()}</div>
                  <div className={`flex items-center justify-end ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {coin.price_change_percentage_24h >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    <span className="ml-1">{Math.abs(coin.price_change_percentage_24h).toFixed(2)}%</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-400">Market Cap</p>
                  <p className="text-lg">${coin.market_cap.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">24h Volume</p>
                  <p className="text-lg">${coin.total_volume.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-8 p-4 bg-purple-500/20 border border-purple-500 rounded-lg text-purple-100 flex items-start">
        <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
        <p className="text-sm">
          Our AI analyzes social media trends, market sentiment, and trading patterns to identify emerging opportunities.
          Combine this analysis with market data to make informed decisions.
        </p>
      </div>
    </div>
  );
}