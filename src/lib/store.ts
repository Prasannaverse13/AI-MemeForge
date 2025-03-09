import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Settings {
  rpcUrl: string;
  gasPrice: number;
  slippage: number;
}

interface SettingsStore {
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: {
        rpcUrl: 'https://rpc-mumbai.maticvigil.com',
        gasPrice: 50,
        slippage: 0.5,
      },
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: 'ai-memeforge-settings',
    }
  )
);