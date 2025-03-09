import { ethers } from 'ethers';
import tokenABI from '../contracts/Token.json';

export async function deployToken(metadata: any) {
  try {
    if (!window.ethereum) {
      throw new Error('MetaMask not installed');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Deploy token contract
    const factory = new ethers.ContractFactory(
      tokenABI.abi,
      tokenABI.bytecode,
      signer
    );

    // Ensure proper string formatting for name and symbol
    const name = String(metadata.name).slice(0, 32); // Max 32 chars
    const symbol = String(metadata.symbol).toUpperCase().slice(0, 8); // Max 8 chars
    const initialSupply = ethers.parseUnits(String(metadata.initialSupply || '1000000'), 18);

    console.log('Deploying token with params:', { name, symbol, initialSupply });

    const contract = await factory.deploy(
      name,
      symbol,
      initialSupply,
      {
        gasLimit: 3000000 // Set a reasonable gas limit
      }
    );

    const receipt = await contract.waitForDeployment();
    const address = await contract.getAddress();

    console.log('Token deployed at:', address);
    return address;
  } catch (error: any) {
    console.error('Error deploying token:', error);
    if (error.code === 'ACTION_REJECTED') {
      throw new Error('Transaction rejected. Please confirm the transaction in your wallet.');
    } else if (error.code === 'INSUFFICIENT_FUNDS') {
      throw new Error('Insufficient funds for gas. Please make sure you have enough MATIC.');
    } else if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
      throw new Error('Error estimating gas. Please try again with different parameters.');
    } else {
      throw new Error('Failed to deploy token. Please check your connection and try again.');
    }
  }
}