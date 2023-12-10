export const devChain = {
  id: 31337,
  name: "hardhat",
  network: "hardhat",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] },
    public: { http: ["http://127.0.0.1:8545"] },
  },
};

export const okxX1 = {
  id: 195,
  name: "X1",
  network: "x1",
  nativeCurrency: {
    decimals: 18,
    name: "OKB",
    symbol: "OKB",
  },
  rpcUrls: {
    default: { http: ["https://x1testrpc.okx.com"] },
    public: { http: ["https://x1testrpc.okx.com"] },
  },
};

export const scrollSepolia = {
  id: 534351,
  name: "Scroll-Sepolia",
  network: "scroll-sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["https://sepolia-rpc.scroll.io"] },
    public: { http: ["https://sepolia-rpc.scroll.io"] },
  },
};
