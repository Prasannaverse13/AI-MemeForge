import { Link, useLocation } from 'react-router-dom';
import { Rocket, TrendingUp, FlaskRound as Flask, LineChart, Settings, HelpCircle } from 'lucide-react';
import { WalletConnect } from './WalletConnect';
import { cn } from '../lib/utils';

export function Navigation() {
  const location = useLocation();

  const navItems = [
    { icon: TrendingUp, label: 'Trends', path: '/trends' },
    { icon: Flask, label: 'Create', path: '/create' },
    { icon: LineChart, label: 'Portfolio', path: '/portfolio' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Guide', path: '/guide' },
  ];

  return (
    <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Rocket className="w-8 h-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold">AI MemeForge</span>
            </Link>
            <div className="hidden md:flex ml-10 space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      location.pathname === item.path
                        ? "text-white bg-gray-800"
                        : "text-gray-300 hover:text-white hover:bg-gray-700"
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <WalletConnect />
        </div>
      </div>
    </nav>
  );
}