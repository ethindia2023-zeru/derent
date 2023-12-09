import { HardhatUserConfig } from "hardhat/config";
import { HardhatNetworkForkingUserConfig, NetworkUserConfig } from "hardhat/types";
import "@nomicfoundation/hardhat-toolbox";
import {
  eAvalancheNetwork,
  eEthereumNetwork,
  ePolygonNetwork,
  eBinanceNetwork,
  eXDaiNetwork,
  iParamsPerNetwork,
  eArbitrumNetwork,
  eNetwork,
} from "./helpers/types";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";
import { accounts } from "./test-wallets.js";

dotenvConfig({ path: resolve(__dirname, "./.env") });

const chainIds = {
  ganache: 1337,
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
};

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const ALCHEMY_KEY = process.env.ALCHEMY_KEY || "";

const SKIP_LOAD = process.env.SKIP_LOAD === "true";
const DEFAULT_BLOCK_GAS_LIMIT = 9000000000;
const DEFAULT_GAS_MUL = 5;
const HARDFORK = "istanbul";
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY || "";
const MNEMONIC_PATH = "m/44'/60'/0'/0";
const MNEMONIC = process.env.MNEMONIC || "";
const UNLIMITED_BYTECODE_SIZE = process.env.UNLIMITED_BYTECODE_SIZE === "true";
const FORK = process.env.FORK;
const INFURA_KEY = "";

function createTestnetConfig(network: keyof typeof chainIds): NetworkUserConfig {
  const url: string = "https://" + network + ".infura.io/v3/" + INFURA_API_KEY;
  return {
    accounts: {
      count: 10,
      initialIndex: 0,
      mnemonic: MNEMONIC,
      path: "m/44'/60'/0'/0",
    },
    chainId: chainIds[network],
    url,
  };
}

export const NETWORKS_RPC_URL: iParamsPerNetwork<string> = {
  [eEthereumNetwork.kovan]: ALCHEMY_KEY
    ? `https://eth-kovan.alchemyapi.io/v2/${ALCHEMY_KEY}`
    : `https://kovan.infura.io/v3/${INFURA_KEY}`,
  [eEthereumNetwork.ropsten]: ALCHEMY_KEY
    ? `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_KEY}`
    : `https://ropsten.infura.io/v3/${INFURA_KEY}`,
  [eEthereumNetwork.main]: ALCHEMY_KEY
    ? `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`
    : `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [eEthereumNetwork.coverage]: "http://localhost:8555",
  [eEthereumNetwork.hardhat]: "http://localhost:8545",
  [eEthereumNetwork.buidlerevm]: "http://localhost:8545",
  [eEthereumNetwork.tenderly]: `https://rpc.tenderly.co/fork/`,
  [ePolygonNetwork.mumbai]: "https://rpc-mumbai.maticvigil.com",
  [ePolygonNetwork.matic]:
    // 'https://rpc-mainnet.maticvigil.com/v1/e616b9ddc7598ffae92629f8145614d55094c722',
    "https://polygon-mainnet.g.alchemy.com/v2/6NUmfWDZw6lC3RPAphj0p_2vm7ElOn2U",
  // [ePolygonNetwork.matic]: 'https://rpc-mainnet.matic.network',
  [eBinanceNetwork.testbsc]: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  [eXDaiNetwork.xdai]: "https://rpc.xdaichain.com/",
  [eAvalancheNetwork.avalanche]: "https://api.avax.network/ext/bc/C/rpc",
  [eAvalancheNetwork.fuji]: "https://api.avax-test.network/ext/bc/C/rpc",
  [eArbitrumNetwork.goerli]: "https://goerli-rollup.arbitrum.io/rpc",
  [eArbitrumNetwork.mainnet]: `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`,
};
const GWEI = 1000 * 1000 * 1000;
const NETWORKS_DEFAULT_GAS: iParamsPerNetwork<number> = {
  [eEthereumNetwork.kovan]: 3 * GWEI,
  [eEthereumNetwork.ropsten]: 65 * GWEI,
  [eEthereumNetwork.main]: 65 * GWEI,
  [eEthereumNetwork.coverage]: 65 * GWEI,
  [eEthereumNetwork.hardhat]: 65 * GWEI,
  [eEthereumNetwork.buidlerevm]: 65 * GWEI,
  [eEthereumNetwork.tenderly]: 1 * GWEI,
  [eBinanceNetwork.testbsc]: 20 * GWEI,
  [ePolygonNetwork.mumbai]: 35 * GWEI,
  [ePolygonNetwork.matic]: 35 * GWEI,
  [eXDaiNetwork.xdai]: 1 * GWEI,
  [eAvalancheNetwork.avalanche]: 225 * GWEI,
  [eAvalancheNetwork.fuji]: 85 * GWEI,
  [eArbitrumNetwork.goerli]: 1 * GWEI,
};

const getCommonNetworkConfig = (networkName: eNetwork, networkId: number) => ({
  url: "https://goerli-rollup.arbitrum.io/rpc",
  hardfork: HARDFORK,
  blockGasLimit: DEFAULT_BLOCK_GAS_LIMIT,
  gasMultiplier: DEFAULT_GAS_MUL,
  //gasPrice: NETWORKS_DEFAULT_GAS[networkName],
  chainId: networkId,
  accounts: {
    mnemonic: MNEMONIC,
    path: MNEMONIC_PATH,
    initialIndex: 0,
    count: 20,
  },
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

export const buildForkConfig = (): HardhatNetworkForkingUserConfig | undefined => {
  let forkMode;
  if (FORK) {
    forkMode = {
      url: "https://goerli-rollup.arbitrum.io/rpc",
    };
  }

  return forkMode;
};

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      hardfork: "london",
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      accounts: accounts.map(({ secretKey, balance }: { secretKey: string; balance: string }) => ({
        privateKey: secretKey,
        balance,
      })),
      chainId: chainIds.hardhat,
      forking: buildForkConfig(),
    },
    mainnet: createTestnetConfig("mainnet"),
    goerli: createTestnetConfig("goerli"),
    kovan: createTestnetConfig("kovan"),
    rinkeby: createTestnetConfig("rinkeby"),
    ropsten: createTestnetConfig("ropsten"),
    arbitrumGoerli: getCommonNetworkConfig(eArbitrumNetwork.goerli, 421613),
  },
  solidity: {
    compilers: [
      {
        version: "0.8.17",
      },
    ],
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 100,
    enabled: process.env.REPORT_GAS == "true" ?? false,
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};

export default config;
