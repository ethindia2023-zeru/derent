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
  eNetworks,
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
  arbitrum_goerli: 421613,
  scroll_testnet: 534351,
  mantle_testnet: 5001,
  base_testnet: 84531,
  celo_alfajores: 44787,
  x1_testnet: 195,
};

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const ALCHEMY_KEY = process.env.ALCHEMY_KEY || "";

const DEFAULT_BLOCK_GAS_LIMIT = 9000000000;
const DEFAULT_GAS_MUL = 5;
const HARDFORK = "istanbul";
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY || "";
const MNEMONIC_PATH = "m/44'/60'/0'/0";
const MNEMONIC = process.env.MNEMONIC || "";
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
  [eEthereumNetwork.coverage]: "http://localhost:8555",
  [eEthereumNetwork.hardhat]: "http://localhost:8545",
  [eArbitrumNetwork.goerli]: "https://goerli-rollup.arbitrum.io/rpc",
  [eArbitrumNetwork.mainnet]: `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`,
};

const getCommonNetworkConfig = (networkName: eNetworks, networkId: number) => ({
  url: RPC[networkName],
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

const RPC: { [key: string]: string } = {
  arbitrum_goerli: "https://goerli-rollup.arbitrum.io/rpc",
  scroll_testnet: "https://sepolia-rpc.scroll.io",
  mantle_testnet: "https://rpc.testnet.mantle.xyz",
  base_testnet: "https://goerli.base.org",
  celo_alfajores: "https://alfajores-forno.celo-testnet.org",
  x1_testnet: "https://x1testrpc.okx.com",
};

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
      //forking: buildForkConfig(),
    },
    coverage: {
      url: "http://127.0.0.1:8545",
      blockGasLimit: DEFAULT_BLOCK_GAS_LIMIT,
      gas: 10000000,
      gasPrice: 20000000000,
      allowUnlimitedContractSize: true,
      chainId: 31337,
      timeout: 400000000,
      //forking: buildForkConfig(),
      hardfork: "london",
    },
    arbitrumGoerli: getCommonNetworkConfig(eNetworks.arbitrum_goerli, chainIds.arbitrum_goerli),
    scroll_testnet: getCommonNetworkConfig(eNetworks.scroll_testnet, chainIds.scroll_testnet),
    mantle_testnet: getCommonNetworkConfig(eNetworks.mantle_testnet, chainIds.mantle_testnet),
    base_testnet: getCommonNetworkConfig(eNetworks.base_testnet, chainIds.base_testnet),
    celo_alfajores: getCommonNetworkConfig(eNetworks.celo_alfajores, chainIds.celo_alfajores),
    x1_testnet: getCommonNetworkConfig(eNetworks.x1_testnet, chainIds.x1_testnet),
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
