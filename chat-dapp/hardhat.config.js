// hardhat.config.js
require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.19',
  networks: {
    theblockchaincoders: {
      url: 'http://localhost:8545',
      chainId: 9292, // Your blockchain's chain ID
      accounts: ['0xprivate_key'],
    },
  },
  paths: {
    artifacts: './artifacts',
    sources: './contracts',
    cache: './cache',
    tests: './test',
  },
}
