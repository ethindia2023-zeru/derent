import { commonActionSetup } from "./helper/commonHelper";

export const getDueDate = async (signer, propertyId) => {
  try {
    const rental_contract = commonActionSetup(signer);

    const data = rental_contract.getDueDate(propertyId);
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
