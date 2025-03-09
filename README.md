# AI MemeForge 🚀

AI MemeForge is a cutting-edge platform that combines AI-powered trend analysis with blockchain technology to help users create and manage meme tokens on the Polygon network. Built with Vyper smart contracts and modern web technologies, it provides a seamless experience for token creation and management.

## 🌟 Features

- **AI-Powered Trend Analysis**: Real-time analysis of meme coin trends using advanced AI
- **Smart Contract Integration**: Secure token creation using Vyper smart contracts
- **Polygon Integration**: Seamless deployment to Polygon Mumbai testnet
- **Portfolio Management**: Track and manage your created tokens
- **User-Friendly Interface**: Beautiful, responsive UI built with React and Tailwind CSS

## 🛠 Technology Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Vite for development and building
- wagmi & viem for Web3 integration
- React Query for data management
- Zustand for state management

### Smart Contracts
- Vyper for smart contract development
- Moccasin for testing and deployment
- Custom compilation script for Vyper contracts
- ERC20 token implementation

### Blockchain
- Polygon Mumbai testnet
- ethers.js for contract interaction
- WalletConnect for wallet integration

### AI Integration
- Mistral AI API for trend analysis
- CoinGecko API for market data

## 📁 Project Structure

```
ai-memeforge/
├── contracts/               # Vyper smart contracts
│   └── Token.vy            # ERC20 token implementation
├── scripts/                # Utility scripts
│   └── compile-vyper.js    # Vyper compilation script
├── tests/                  # Contract tests
│   └── Token.test.ts       # Token contract tests
├── src/
│   ├── components/         # React components
│   ├── lib/               # Utility functions
│   │   ├── ai.ts          # AI integration
│   │   ├── contracts.ts   # Smart contract interaction
│   │   └── web3.ts        # Web3 configuration
│   └── pages/             # Application pages
```

## 🔑 Key Files

### Vyper Contract (`contracts/Token.vy`)
- ERC20 token implementation in Vyper
- Standard ERC20 interface implementation
- Transfer and approval functionality
- Minting and burning capabilities

### Moccasin Configuration (`moccasin.config.json`)
- Network configuration for Polygon Mumbai
- Vyper compiler settings
- Test configuration
- Coverage and gas reporting settings

### AI Integration (`src/lib/ai.ts`)
- Mistral AI API integration
- Market trend analysis
- Token metadata generation
- Social media template generation

### Contract Tests (`tests/Token.test.ts`)
- Comprehensive test suite using Moccasin
- Deployment tests
- Transfer functionality tests
- Approval mechanism tests

### Polygon Integration (`src/lib/contracts.ts`)
- Smart contract deployment
- Transaction management
- Gas optimization
- Error handling

## 🚀 Getting Started

1. **Prerequisites**
   ```bash
   # Install Vyper
   pip install vyper==0.3.7

   # Install Node.js dependencies
   npm install

   # Install Moccasin
   pip install moccasin-cli
   ```

2. **Configure Moccasin**
   ```bash
   # Set up environment variables
   echo "MNEMONIC=your_wallet_mnemonic" > .env
   ```

3. **Compile and Test**
   ```bash
   # Compile Vyper contracts
   npm run compile:vyper

   # Run tests
   moccasin test
   ```

4. **Start Development**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

1. **Environment Variables**
   ```
   VITE_MISTRAL_API_KEY=your_mistral_api_key
   VITE_WALLET_CONNECT_PROJECT_ID=your_project_id
   MNEMONIC=your_wallet_mnemonic
   ```

2. **Moccasin Settings**
   - Configure networks in `moccasin.config.json`
   - Set compiler version
   - Configure test settings
   - Enable coverage reporting

## 🧪 Testing with Moccasin

Moccasin provides a robust testing framework for Vyper contracts:

1. **Run Tests**
   ```bash
   moccasin test
   ```

2. **Coverage Report**
   ```bash
   moccasin coverage
   ```

3. **Gas Report**
   ```bash
   moccasin test --gas
   ```

## 🤖 AI Features

The AI integration (`src/lib/ai.ts`) provides:
- Real-time trend analysis
- Market sentiment analysis
- Token metadata generation
- Trading volume predictions
- Social media content generation

## 🔗 Polygon Integration

The platform uses Polygon Mumbai testnet for:
- Token deployment
- Transaction processing
- Contract interaction
- Gas optimization

## 🔒 Security

- Row Level Security (RLS) for data protection
- Secure wallet integration
- Protected API endpoints
- Input validation and sanitization
- Comprehensive contract testing

## 📚 Additional Resources

- [Vyper Documentation](https://docs.vyperlang.org/)
- [Moccasin Documentation](https://cyfrin.github.io/moccasin/)
- [Polygon Documentation](https://wiki.polygon.technology/)
- [Mistral AI Documentation](https://docs.mistral.ai/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.