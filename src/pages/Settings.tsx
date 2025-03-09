import { useState } from 'react';
import { Settings as SettingsIcon, Save, AlertCircle } from 'lucide-react';
import { useSettingsStore } from '../lib/store';

export function Settings() {
  const { settings, updateSettings } = useSettingsStore();
  const [formData, setFormData] = useState({
    rpcUrl: settings.rpcUrl || 'https://rpc-mumbai.maticvigil.com',
    gasPrice: settings.gasPrice || 50,
    slippage: settings.slippage || 0.5,
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="py-8">
      <div className="flex items-center mb-8">
        <SettingsIcon className="w-8 h-8 text-purple-500 mr-3" />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
          <div className="mb-6 p-4 bg-blue-500/20 border border-blue-500 rounded-lg text-blue-100 flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm">
              These settings affect how your transactions are processed on the Polygon Mumbai testnet.
              Make sure to configure them according to your needs.
            </p>
          </div>

          {saved && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-100">
              Settings saved successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Polygon Mumbai RPC URL
              </label>
              <input
                type="text"
                value={formData.rpcUrl}
                onChange={(e) => setFormData({ ...formData, rpcUrl: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter RPC URL"
              />
              <p className="mt-1 text-sm text-gray-400">RPC endpoint for connecting to Polygon Mumbai testnet</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Default Gas Price (GWEI)
              </label>
              <input
                type="number"
                value={formData.gasPrice}
                onChange={(e) => setFormData({ ...formData, gasPrice: Number(e.target.value) })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="1"
                step="1"
                placeholder="Enter gas price in GWEI"
              />
              <p className="mt-1 text-sm text-gray-400">Default gas price for transactions (1 GWEI = 10⁻⁹ MATIC)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Default Slippage (%)
              </label>
              <input
                type="number"
                value={formData.slippage}
                onChange={(e) => setFormData({ ...formData, slippage: Number(e.target.value) })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="0.1"
                max="100"
                step="0.1"
                placeholder="Enter slippage percentage"
              />
              <p className="mt-1 text-sm text-gray-400">Default slippage tolerance for trades (0.1% - 100%)</p>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              <Save className="w-5 h-5" />
              Save Settings
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}