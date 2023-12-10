import { commonActionSetup } from "./helper/commonHelper";

export const addListing = async (
  signer,
  propertyName,
  address,
  advance,
  securityDeposit,
  rent,
  waitingPeriodSecurityDeposit,
  isAuction,
) => {
  console.log(
    "addListing: ",
    signer,
    propertyName,
    address,
    advance,
    securityDeposit,
    rent,
    waitingPeriodSecurityDeposit,
    isAuction,
  );
  try {
    const rental_contract = await commonActionSetup(signer);

    const data = await rental_contract.addListing(
      advance,
      securityDeposit,
      rent,
      waitingPeriodSecurityDeposit,
      isAuction,
      address,
      propertyName,
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
