export const ChainIdsToNetwork = number => {
  let chainids = {
    42: "kovan",
    3: "ropsten",
    1: "main",
    137: "matic",
    80001: "mumbai",
    100: "xdai",
    43114: "avalanche",
    43113: "fuji",
    1337: "coverage",
    31337: "coverage",
    97: "testbsc",
    421613: "arbitrumGoerli",
    195: "x1_testnet",
    84531: "base_testnet",
  };
  return chainids[number];
};
