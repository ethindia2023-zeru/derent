import { commonActionSetup } from "./helper/commonHelper";

export const payRent = async (signer, propertyId, rent) => {
  try {
    console.log("paySecurityDeposit: ", propertyId, "signer: ", signer, "rent: ", rent);
    const rental_contract = await commonActionSetup(signer);

    const data = await rental_contract.payRent(propertyId, { value: rent?.toString() });
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
