import { RentalContract } from "@/helpers/contractFactory/contractFactory";
import { ChainIdsToNetwork } from "@/helpers/network/ChainIds";

export const addListing = async (
  signer,
  advance,
  securityDeposit,
  rent,
  waitingPeriodSecurityDeposit,
  isAuction,
  location,
) => {
  try {
    const { chainId } = await signer.getNetwork();
    const chainName = ChainIdsToNetwork(chainId);

    console.log(chainId, chainName);

    const rental_contract = RentalContract(signer);
    const data = rental_contract.addListing(
      advance,
      securityDeposit,
      rent,
      waitingPeriodSecurityDeposit,
      isAuction,
      location,
    );
    const txResult = await data.wait();
    console.log(txResult);
    if (txResult) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error: ", error);
    return false;
  }
};
