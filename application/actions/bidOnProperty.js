import { commonActionSetup } from "./helper/commonHelper";

export const bidOnProperty = async (signer, propertyId, newBid) => {
  try {
    console.log("paySecurityDeposit: ", propertyId, "signer: ", signer, "newBid: ", newBid);
    const rental_contract = await commonActionSetup(signer);

    const data = await rental_contract.bidOnProperty(propertyId, newBid);
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
