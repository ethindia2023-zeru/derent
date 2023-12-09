import { commonActionSetup } from "./helper/commonHelper";

export const claimRent = async (signer, propertyId) => {
  try {
    const rental_contract = commonActionSetup(signer);

    const data = rental_contract.claimRent(propertyId);
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
