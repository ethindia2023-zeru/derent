import { RentalContract } from "@/helpers/contractFactory/contractFactory";
import { ChainIdsToNetwork } from "@/helpers/network/ChainIds";
export const commonActionSetup = async signer => {
  const { chainId } = await signer.getNetwork();
  const chainName = ChainIdsToNetwork(chainId);
  const rental_contract = RentalContract(signer, chainName);

  return rental_contract;
};
