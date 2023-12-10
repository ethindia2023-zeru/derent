import deployed_contracts_address from "@/contractConfig/deployedAddresses.json";

export const getContractAddress = (contractName, chainName) => {
  return deployed_contracts_address[contractName][chainName].address;
};
