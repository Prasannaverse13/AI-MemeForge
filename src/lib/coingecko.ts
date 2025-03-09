import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export interface CoinTrend {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
}

export async function getTrendingCoins(): Promise<CoinTrend[]> {
  try {
    const response = await axios.get(`${COINGECKO_API}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'volume_desc',
        per_page: 50,
        page: 1,
        sparkline: false,
        category: 'meme-token'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching trending coins:', error);
    return [];
  }
}

export async function getCoinMarketData(coinId: string) {
  try {
    const response = await axios.get(`${COINGECKO_API}/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: 7,
        interval: 'daily'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching coin market data:', error);
    return null;
  }
}