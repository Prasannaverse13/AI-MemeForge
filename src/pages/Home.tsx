import { Rocket, TrendingUp as Trending, FlaskRound as Flask } from 'lucide-react';

export function Home() {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
          AI-Powered Token Creator & Trend Analyzer
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Create, deploy, and analyze meme tokens automatically using advanced AI technology
          and blockchain integration.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
          <Trending className="w-12 h-12 text-purple-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Trend Analysis</h3>
          <p className="text-gray-400">
            Real-time analysis of social media trends and blockchain activity to identify
            potential opportunities.
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
          <Flask className="w-12 h-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Token Generation</h3>
          <p className="text-gray-400">
            AI-powered token creation with automatic smart contract deployment and
            liquidity pool setup.
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
          <Rocket className="w-12 h-12 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Launch & Track</h3>
          <p className="text-gray-400">
            Automated token listing on DEX with real-time tracking and portfolio
            management.
          </p>
        </div>
      </div>
    </div>
  );
}