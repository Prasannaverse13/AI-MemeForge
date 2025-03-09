import { LineChart, ArrowUp, ArrowDown } from 'lucide-react';
import { useAccount } from 'wagmi';
import { Navigate } from 'react-router-dom';

export function Portfolio() {
  const { isConnected } = useAccount();

  // Redirect to home if wallet is not connected
  if (!isConnected) {
    return <Navigate to="/" replace />;
  }

  const mockTokens = [
    { name: 'DANK', price: '0.00023', change: 15.2, marketCap: '125K', holders: 450 },
    { name: 'MOON', price: '0.00012', change: -8.5, marketCap: '85K', holders: 320 },
  ];

  return (
    <div className="py-8">
      <div className="flex items-center mb-8">
        <LineChart className="w-8 h-8 text-green-500 mr-3" />
        <h1 className="text-3xl font-bold">Portfolio</h1>
      </div>

      <div className="grid gap-6">
        {mockTokens.map((token) => (
          <div key={token.name} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-green-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{token.name}</h3>
              <div className={`flex items-center ${token.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {token.change >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                <span className="ml-1">{Math.abs(token.change)}%</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Price</p>
                <p className="text-lg">${token.price}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Market Cap</p>
                <p className="text-lg">${token.marketCap}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Holders</p>
                <p className="text-lg">{token.holders}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}