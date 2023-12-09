import { getContractAddress } from "@/helpers/contractFactory/ContractAddresses";
import { RentalContract } from "@/helpers/contractFactory/contractFactory";
import { ChainIdsToNetwork } from "@/helpers/network/ChainIds";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadPropertyListing = createAsyncThunk("home/loadPropertyListing", async props => {
  const { pro } = props;
  const { chainId } = await pro.getNetwork();
  const chainName = ChainIdsToNetwork(chainId);

  const rentalAddress = getContractAddress("Rental", chainName);
  console.log("address-------:", rentalAddress);
  const rental_contract = RentalContract(pro, rentalAddress);

  console.log("Niceeee:", chainId, chainName, rentalAddress);

  // try {
  const propertyListings = await rental_contract.getAllPropertyListings();
  console.log("Helloo:", propertyListings);
  return {
    propertyListings,
  };
  // } catch (err) {
  //   console.log(err);
  // }
});

const initialState = {
  propertyListings: null,
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
        state.propertyListings = action.payload.propertyListings;
      })
      .addCase(loadPropertyListing.rejected, (state, { error }) => {
        console.log(error);
      });
    /////////////////////////////////////////////////////////////////////////////////////////////////
  },
});

export const { setInitialPropertyListingsLoaded } = homeSlice.actions;

export default homeSlice.reducer;
