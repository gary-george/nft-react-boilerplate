require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const privateKeys = process.env.PRIVATE_KEYS || "";

module.exports = {
  networks: {
    ganache_gui: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    ganache_cli: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    kovan: {
      provider: function () {
        return new HDWalletProvider(
          privateKeys.split(","),
          `https://kovan.infura.io/v3/${process.env.INFURA_ID}`
        );
      },
      gas: 5000000,
      gasPrice: 5000000000, // 5 gwei
      network_id: 42,
      skipDryRun: true,
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          privateKeys.split(","),
          `https://rinkeby.infura.io/v3/${process.env.INFURA_ID}`
        );
      },
      gas: 5000000,
      gasPrice: 5000000000, // 5 gwei
      network_id: 4,
      skipDryRun: true,
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(
          privateKeys.split(","),
          `https://ropsten.infura.io/v3/${process.env.INFURA_ID}`
        );
      },
      gas: 5000000,
      gasPrice: 5000000000, // 5 gwei
      network_id: 3,
      skipDryRun: true,
    },
    main: {
      provider: function () {
        return new HDWalletProvider(
          privateKeys.split(","),
          `https://main.infura.io/v3/${process.env.INFURA_ID}`
        );
      },
      gas: 5000000,
      gasPrice: 5000000000, // 5 gwei
      network_id: 1,
    },
    polygon: {
      provider: () =>
        new HDWalletProvider(
          privateKeys.split(","),
          `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_ID}`
        ),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    polygonMainNet: {
      provider: () =>
        new HDWalletProvider(
          privateKeys.split(","),
          `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_ID}`
        ),
      network_id: 137,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      chainId: 137,
    },
  },
  contracts_directory: "./src/truffle/contracts/",
  contracts_build_directory: "./src/truffle/abis/",
  migrations_directory: "./src/truffle/migrations/",
  test_directory: "./src/truffle/test/",
  compilers: {
    solc: {
      version: ">=0.6.0 <0.8.0",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
