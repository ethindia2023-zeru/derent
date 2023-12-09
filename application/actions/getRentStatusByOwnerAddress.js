import { commonActionSetup } from "./helper/commonHelper";

export const getRentStatusByOwnerAddress = async (signer, owner) => {
  try {
    const rental_contract = commonActionSetup(signer);

    const data = rental_contract.getRentStatusByOwnerAddress(owner);
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
