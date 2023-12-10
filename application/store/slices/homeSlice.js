import { getContractAddress } from "@/helpers/contractFactory/ContractAddresses";
import { RentalContract } from "@/helpers/contractFactory/contractFactory";
import { ChainIdsToNetwork } from "@/helpers/network/ChainIds";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const commonSetupForContract = async pro => {
  const { chainId } = await pro.getNetwork();
  const chainName = ChainIdsToNetwork(chainId);

  const rentalAddress = getContractAddress("Rental", chainName);
  console.log("address-------:", rentalAddress);
  const rental_contract = RentalContract(pro, rentalAddress);

  console.log("Niceeee:", chainId, chainName, rentalAddress);
  return rental_contract;
};

export const loadPropertyListing = createAsyncThunk("home/loadPropertyListing", async props => {
  const { pro } = props;
  const rental_contract = await commonSetupForContract(pro);

  try {
    const propertyListingOriginal = await rental_contract.getAllPropertyListings();
    const propertyListingsTemp = [];
    console.log("propertyListingOriginal: ", propertyListingOriginal);

    for (let i = 1; i <= propertyListingOriginal.length; i++) {
      const propertyListing = propertyListingOriginal[i];
      if (propertyListing) {
        if (propertyListing.propertyName) {
          propertyListingsTemp.push({
            propertyName: propertyListing.propertyName,
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
            waitingPeriodSecurityDeposit: propertyListing.waitingPeriodSecurityDeposit.toString(),
          });
        }
      }
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

export const loadAuctionStarted = createAsyncThunk("home/loadAuctionStarted", async props => {
  const { pro } = props;
  const rental_contract = await commonSetupForContract(pro);

  try {
    const auctionStarted = await rental_contract.getIsAuction();
    console.log("auctionStarted: ", auctionStarted);

    return {
      auctionStarted: auctionStarted,
    };
  } catch (err) {
    console.log(err);
  }
  return {
    auctionStarted: "",
  };
});

const initialState = {
  propertyListing: null,
  auctionStarted: false,
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
      })
      /////////////////////////////////////////////////////////////////////////////////////////////////

      .addCase(loadAuctionStarted.pending, state => {})
      .addCase(loadAuctionStarted.fulfilled, (state, action) => {
        state.auctionStarted = action.payload.auctionStarted;
      })
      .addCase(loadAuctionStarted.rejected, (state, { error }) => {
        console.log(error);
      });
    /////////////////////////////////////////////////////////////////////////////////////////////////
  },
});

export const { setInitialPropertyListingsLoaded } = homeSlice.actions;

export default homeSlice.reducer;
