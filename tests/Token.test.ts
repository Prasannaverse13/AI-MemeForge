import { expect } from 'chai';
import { ethers } from 'ethers';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { deployToken } from '../src/lib/contracts';

describe('Token Contract', () => {
  async function deployTokenFixture() {
    const name = 'Test Token';
    const symbol = 'TEST';
    const initialSupply = ethers.parseUnits('1000000', 18);
    
    const tokenAddress = await deployToken({
      name,
      symbol,
      initialSupply: initialSupply.toString()
    });
    
    return { tokenAddress, name, symbol, initialSupply };
  }

  it('Should deploy with correct initial values', async () => {
    const { tokenAddress, name, symbol, initialSupply } = await loadFixture(deployTokenFixture);
    
    const Token = await ethers.getContractAt('Token', tokenAddress);
    
    expect(await Token.name()).to.equal(name);
    expect(await Token.symbol()).to.equal(symbol);
    expect(await Token.totalSupply()).to.equal(initialSupply);
  });

  it('Should allow transfers between accounts', async () => {
    const { tokenAddress } = await loadFixture(deployTokenFixture);
    const Token = await ethers.getContractAt('Token', tokenAddress);
    const [owner, recipient] = await ethers.getSigners();
    
    const transferAmount = ethers.parseUnits('1000', 18);
    await Token.transfer(recipient.address, transferAmount);
    
    expect(await Token.balanceOf(recipient.address)).to.equal(transferAmount);
  });

  it('Should handle approvals correctly', async () => {
    const { tokenAddress } = await loadFixture(deployTokenFixture);
    const Token = await ethers.getContractAt('Token', tokenAddress);
    const [owner, spender] = await ethers.getSigners();
    
    const approvalAmount = ethers.parseUnits('5000', 18);
    await Token.approve(spender.address, approvalAmount);
    
    expect(await Token.allowance(owner.address, spender.address)).to.equal(approvalAmount);
  });
});