import { getContractAddress } from "@/helpers/contractFactory/ContractAddresses";
import { RentalContract } from "@/helpers/contractFactory/contractFactory";
import { ChainIdsToNetwork } from "@/helpers/network/ChainIds";

export const commonActionSetup = async signer => {
  const { chainId } = await signer.getNetwork();
  const chainName = ChainIdsToNetwork(chainId);

  const rentalAddress = getContractAddress("Rental", chainName);
  const rental_contract = RentalContract(signer, rentalAddress);

  return rental_contract;
};
