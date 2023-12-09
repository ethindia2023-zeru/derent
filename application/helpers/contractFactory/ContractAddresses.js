import deployed_contracts_address from "@/contractConfig/deployed-contracts.json";

export const getContractAddress = (contractName, chainName) => {
  return deployed_contracts_address[contractName][chainName].address;
};
