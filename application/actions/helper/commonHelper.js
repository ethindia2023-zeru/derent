import { getContractAddress } from "@/helpers/contractFactory/ContractAddresses";
import { RentalContract } from "@/helpers/contractFactory/contractFactory";
import { ChainIdsToNetwork } from "@/helpers/network/ChainIds";

export const commonActionSetup = async signer => {
  const { chainId } = await signer.getNetwork();
  const chainName = ChainIdsToNetwork(chainId);

  const rentalAddress = getContractAddress("Rental", chainName);
  const signerOriginal = await signer.getSigner();
  const rental_contract = RentalContract(signerOriginal, rentalAddress);

  console.log(rentalAddress, rental_contract, chainId, chainName, "signerOriginal: ", signerOriginal);
  return rental_contract;
};
