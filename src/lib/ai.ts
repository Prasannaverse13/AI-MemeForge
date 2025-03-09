import axios from 'axios';

const MISTRAL_API_KEY = 'pGCiWXqzVpASTEDW08g4o3uVCFHYadku';
const MISTRAL_API_URL = 'https://api.mistral.ai/v1';

interface TrendAnalysis {
  topic: string;
  sentiment: number;
  volume: number;
  sources: string[];
  keywords: string[];
  viralPotential: number;
}

interface TokenMetadata {
  name: string;
  symbol: string;
  description: string;
  initialSupply: string;
  tokenomics: {
    burn: number;
    reflection: number;
    liquidity: number;
  };
  socialMedia: {
    twitter: string;
    telegram: string;
  };
}

export async function analyzeTrends(): Promise<TrendAnalysis[]> {
  try {
    // Step 1: Get trend data from social media analysis
    const trendResponse = await axios.post(
      `${MISTRAL_API_URL}/chat/completions`,
      {
        model: 'mistral-tiny',
        messages: [
          {
            role: 'system',
            content: `You are an AI expert in crypto trend analysis. Analyze current meme trends and provide structured data.
                     Focus on viral potential, sentiment, and community engagement.
                     Format: JSON array of trend objects with topic, sentiment (0-1), volume, sources, keywords.`
          },
          {
            role: 'user',
            content: 'Analyze current meme coin trends, viral topics, and community sentiment. Provide detailed analysis.'
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${MISTRAL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiSuggestions = trendResponse.data.choices[0].message.content;
    return processTrendData(aiSuggestions);
  } catch (error) {
    console.error('Error analyzing trends:', error);
    return getMockTrendData(); // Fallback to mock data
  }
}

function processTrendData(aiResponse: string): TrendAnalysis[] {
  try {
    // Parse AI response and structure the data
    return getMockTrendData(); // Temporary mock data
  } catch (error) {
    console.error('Error processing trend data:', error);
    return getMockTrendData();
  }
}

function getMockTrendData(): TrendAnalysis[] {
  return [
    {
      topic: "PEPE",
      sentiment: 0.85,
      volume: 1200000,
      sources: ["twitter", "telegram", "reddit"],
      keywords: ["frog", "meme", "viral", "green"],
      viralPotential: 0.9
    },
    {
      topic: "DOGE",
      sentiment: 0.75,
      volume: 850000,
      sources: ["twitter", "news", "reddit"],
      keywords: ["elon", "dog", "moon", "crypto"],
      viralPotential: 0.8
    }
  ];
}

export async function generateTokenMetadata(trend: TrendAnalysis): Promise<TokenMetadata> {
  try {
    // Step 2: Generate token metadata based on trend analysis
    const response = await axios.post(
      `${MISTRAL_API_URL}/chat/completions`,
      {
        model: 'mistral-tiny',
        messages: [
          {
            role: 'system',
            content: `You are an AI expert in token creation and tokenomics.
                     Generate creative token metadata based on trend analysis.
                     Include: name, symbol, description, supply, tokenomics, social media templates.`
          },
          {
            role: 'user',
            content: `Generate token metadata for a meme coin based on this trend:
                     Topic: ${trend.topic}
                     Keywords: ${trend.keywords.join(', ')}
                     Sentiment: ${trend.sentiment}
                     Viral Potential: ${trend.viralPotential}`
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${MISTRAL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiSuggestions = response.data.choices[0].message.content;
    return processTokenMetadata(aiSuggestions, trend);
  } catch (error) {
    console.error('Error generating token metadata:', error);
    return getDefaultTokenMetadata(trend);
  }
}

function processTokenMetadata(aiResponse: string, trend: TrendAnalysis): TokenMetadata {
  try {
    // Process AI response and structure the metadata
    return getDefaultTokenMetadata(trend);
  } catch (error) {
    console.error('Error processing token metadata:', error);
    return getDefaultTokenMetadata(trend);
  }
}

function getDefaultTokenMetadata(trend: TrendAnalysis): TokenMetadata {
  const name = `${trend.topic}AI`;
  const symbol = `${trend.topic.substring(0, 3)}AI`;
  
  return {
    name,
    symbol,
    description: `${name} - The AI-powered memecoin based on ${trend.topic} trends. 
                 Built with advanced tokenomics and community-driven features.`,
    initialSupply: "1000000000",
    tokenomics: {
      burn: 2,
      reflection: 1,
      liquidity: 3
    },
    socialMedia: {
      twitter: generateTwitterAnnouncement(name, symbol),
      telegram: generateTelegramAnnouncement(name, symbol)
    }
  };
}

function generateTwitterAnnouncement(name: string, symbol: string): string {
  return `🚀 Introducing ${name} ($${symbol})!\n
          💫 The next evolution in memecoins\n
          🔥 1B supply | 2% burn | 1% reflection | 3% liquidity\n
          🌐 Join us now!\n
          #${symbol} #Crypto #MemeCoin #Polygon`;
}

function generateTelegramAnnouncement(name: string, symbol: string): string {
  return `🎉 ${name} ($${symbol}) - JUST LAUNCHED! 🚀\n\n
          💎 The most innovative memecoin on Polygon\n
          ✨ Powered by AI & Community\n\n
          Tokenomics:\n
          - Total Supply: 1,000,000,000 ${symbol}\n
          - 2% Burn\n
          - 1% Reflection\n
          - 3% Liquidity\n\n
          Join our community now! 🌟`;
}