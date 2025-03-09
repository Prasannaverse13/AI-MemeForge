import { useState } from 'react';
import { FlaskRound as Flask, Rocket, Loader2 } from 'lucide-react';
import { useAccount } from 'wagmi';
import { analyzeTrends, generateTokenMetadata } from '../lib/ai';
import { deployToken } from '../lib/contracts';

export function Create() {
  const { isConnected } = useAccount();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    supply: '1000000',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Basic validation
      if (!formData.name || !formData.symbol || !formData.supply) {
        throw new Error('Please fill in all required fields');
      }

      if (formData.symbol.length > 8) {
        throw new Error('Token symbol must be 8 characters or less');
      }

      if (formData.name.length > 32) {
        throw new Error('Token name must be 32 characters or less');
      }

      if (parseInt(formData.supply) <= 0) {
        throw new Error('Initial supply must be greater than 0');
      }

      // Deploy token
      const tokenAddress = await deployToken({
        name: formData.name,
        symbol: formData.symbol,
        initialSupply: formData.supply,
        description: formData.description
      });

      setSuccess(`Token deployed successfully! Contract address: ${tokenAddress}`);
      
      // Reset form
      setFormData({
        name: '',
        symbol: '',
        supply: '1000000',
        description: '',
      });
    } catch (err: any) {
      console.error('Error creating token:', err);
      setError(err.message || 'Failed to create token. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <div className="flex items-center mb-8">
        <Flask className="w-8 h-8 text-blue-500 mr-3" />
        <h1 className="text-3xl font-bold">Create Token</h1>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
        {error && (
          <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-100">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-100">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Token Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter token name (max 32 characters)"
              required
              maxLength={32}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Token Symbol *
            </label>
            <input
              type="text"
              value={formData.symbol}
              onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter token symbol (max 8 characters)"
              required
              maxLength={8}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Initial Supply *
            </label>
            <input
              type="number"
              value={formData.supply}
              onChange={(e) => setFormData({ ...formData, supply: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter initial supply"
              required
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter token description"
              rows={4}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !isConnected}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Rocket className="w-5 h-5" />
            )}
            {loading ? 'Creating Token...' : 'Create Token'}
          </button>
        </form>
      </div>
    </div>
  );
}