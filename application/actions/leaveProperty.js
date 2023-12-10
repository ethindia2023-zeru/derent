import { commonActionSetup } from "./helper/commonHelper";

export const leaveProperty = async (signer, propertyId) => {
  try {
    console.log("paySecurityDeposit: ", propertyId, "signer: ", signer);
    const rental_contract = await commonActionSetup(signer);

    const data = await rental_contract.leaveProperty(propertyId);
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
