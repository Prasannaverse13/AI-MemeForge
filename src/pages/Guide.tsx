import { BookOpen, Rocket, TrendingUp, FlaskRound as Flask, LineChart, Settings } from 'lucide-react';

export function Guide() {
  const sections = [
    {
      icon: TrendingUp,
      title: "Analyzing Trends",
      description: "Our AI-powered trend analysis system monitors meme coin markets in real-time. View current trends, market caps, and trading volumes to identify potential opportunities.",
      steps: [
        "Navigate to the Trends page",
        "View live market data updated every 5 minutes",
        "Analyze price movements and trading volumes",
        "Identify trending meme coins"
      ]
    },
    {
      icon: Flask,
      title: "Creating Tokens",
      description: "Create your own meme tokens with our streamlined token creation process. Deploy ERC-20 tokens directly to the Polygon Mumbai testnet.",
      steps: [
        "Connect your wallet",
        "Fill in token details (name, symbol, supply)",
        "Review gas fees and settings",
        "Deploy your token"
      ]
    },
    {
      icon: LineChart,
      title: "Portfolio Management",
      description: "Track your created tokens and monitor their performance in real-time. View holder statistics and trading activity.",
      steps: [
        "Connect your wallet to view your portfolio",
        "Monitor token performance",
        "Track holder statistics",
        "View transaction history"
      ]
    },
    {
      icon: Settings,
      title: "Configuring Settings",
      description: "Customize your experience by configuring network settings, gas preferences, and trading parameters.",
      steps: [
        "Set your preferred RPC endpoint",
        "Configure default gas prices",
        "Adjust slippage tolerance",
        "Save your preferences"
      ]
    }
  ];

  return (
    <div className="py-8">
      <div className="flex items-center mb-8">
        <BookOpen className="w-8 h-8 text-purple-500 mr-3" />
        <h1 className="text-3xl font-bold">User Guide</h1>
      </div>

      <div className="prose prose-invert max-w-none">
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 mb-8">
          <h2 className="flex items-center text-2xl font-semibold mb-4">
            <Rocket className="w-6 h-6 text-purple-500 mr-2" />
            Getting Started
          </h2>
          <p className="text-gray-300">
            Welcome to AI MemeForge! This platform combines AI-powered trend analysis with
            blockchain technology to help you create and manage meme tokens. Follow this
            guide to understand how to use each feature effectively.
          </p>
        </div>

        <div className="grid gap-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <h2 className="flex items-center text-2xl font-semibold mb-4">
                  <Icon className="w-6 h-6 text-purple-500 mr-2" />
                  {section.title}
                </h2>
                <p className="text-gray-300 mb-4">{section.description}</p>
                <h3 className="text-lg font-medium mb-2">Steps:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  {section.steps.map((step, index) => (
                    <li key={index} className="pl-2">{step}</li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}