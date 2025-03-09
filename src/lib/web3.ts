import { http, createConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

export const config = createConfig({
  chains: [polygonMumbai],
  connectors: [
    injected(),
    walletConnect({
      projectId: 'YOUR_PROJECT_ID',
    }),
  ],
  transports: {
    [polygonMumbai.id]: http(),
  },
});