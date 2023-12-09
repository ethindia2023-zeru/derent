import { getContractAddress } from "@/helpers/contractFactory/ContractAddresses";
import { RentalContract } from "@/helpers/contractFactory/contractFactory";
import { ChainIdsToNetwork } from "@/helpers/network/ChainIds";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadPropertyListing = createAsyncThunk("home/loadPropertyListing", async props => {
  const { pro } = props;
  const { chainId } = await pro.getNetwork();
  const chainName = ChainIdsToNetwork(chainId);

  const rentalAddress = getContractAddress("Rental", chainName);
  const rental_contract = RentalContract(pro, rentalAddress);

  console.log(chainId, chainName, rentalAddress);

  try {
    const propertyListing = await rental_contract.getAllPropertyListings();
    const propertyListingsTemp = [];

    for (let i = 0; i < propertyListing.length; i++) {
      const propertyListing = propertyListing[i];
      propertyListingsTemp.push({
        advance: parseFloat(propertyListing.advance.toString()),
        bid: parseFloat(propertyListing.bid.toString()),
        highestBidderTenant: propertyListing.highestBidderTenant,
        isAuction: propertyListing.isAuction,
        isConfirmedByOwner: propertyListing.isConfirmedByOwner,
        isConfirmedByTenant: propertyListing.isConfirmedByTenant,
        isConfirmedOccupation: propertyListing.isConfirmedOccupation,
        isReserved: propertyListing.isReserved,
        owner: propertyListing.owner,
        propertyId: parseFloat(propertyListing.propertyId.toString()),
        propertyListingStatus: propertyListing.propertyListingStatus,
        propertyLocation: propertyListing.propertyLocation,
        rent: parseFloat(propertyListing.rent.toString()),
        rentPaid: propertyListing.rentPaid,
        rentPaidTimestamp: parseFloat(propertyListing.rentPaidTimestamp.toString()),
        securityDeposit: parseFloat(propertyListing.securityDeposit.toString()),
        securityDepositClaimedStatus: propertyListing.securityDepositClaimedStatus,
        securityDepositTimestamp: parseFloat(propertyListing.securityDepositTimestamp.toString()),
        tenant: propertyListing.tenant,
        waitingPeriodSecurityDeposit: propertyListing.waitingPeriodSecurityDeposit,
      });
    }

    console.log("propertyListingsTemp: ", propertyListingsTemp);
    return {
      propertyListing: propertyListingsTemp,
    };
  } catch (err) {
    console.log(err);
  }
  return {
    propertyListing: [],
  };
});

const initialState = {
  propertyListing: null,
  initialPropertyListingsLoaded: false,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setInitialPropertyListingsLoaded: (state, action) => {
      state.initialPropertyListingsLoaded = action.payload.initialPropertyListingsLoaded;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadPropertyListing.pending, state => {})
      .addCase(loadPropertyListing.fulfilled, (state, action) => {
        state.propertyListing = action.payload.propertyListing;
      })
      .addCase(loadPropertyListing.rejected, (state, { error }) => {
        console.log(error);
      });
    /////////////////////////////////////////////////////////////////////////////////////////////////
  },
});

export const { setInitialPropertyListingsLoaded } = homeSlice.actions;

export default homeSlice.reducer;
