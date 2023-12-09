import { commonActionSetup } from "./helper/commonHelper";

export const payAdvance = async (signer, propertyId, advance) => {
  try {
    console.log("paySecurityDeposit: ", propertyId, "signer: ", signer, "advance: ", advance);
    const rental_contract = await commonActionSetup(signer);

    const data = await rental_contract.confirmOccupation(propertyId, { value: advance?.toString() });
    console.log("data: ", data);
    const txResult = await data.wait();
    console.log("txResult: ", txResult);
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
