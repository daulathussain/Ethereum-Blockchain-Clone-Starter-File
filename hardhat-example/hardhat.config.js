require('@nomicfoundation/hardhat-toolbox')

module.exports = {
  solidity: '0.8.20',
  networks: {
    theblockchaincoders: {
      url: 'http://localhost:8545',
      chainId: 9292, // Your blockchain's chain ID
      accounts: ['0xprivate-key'],
    },
  },
}
