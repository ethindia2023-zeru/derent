import { commonActionSetup } from "./helper/commonHelper";

export const paySecurityDeposit = async (signer, propertyId, securityDeposit) => {
  try {
    console.log("paySecurityDeposit: ", propertyId, "signer: ", signer, "securityDeposit: ", securityDeposit);
    const rental_contract = await commonActionSetup(signer);

    const data = await rental_contract.paySecurityDeposit(propertyId, { value: securityDeposit?.toString() });
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
