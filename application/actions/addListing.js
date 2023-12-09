import { commonActionSetup } from "./helper/commonHelper";

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
    const rental_contract = commonActionSetup(signer);

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
