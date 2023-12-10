import { devChain, okxX1, scrollSepolia } from "@/dev/devChain";
import {
  scrollTestnet,
  arbitrum,
  mainnet,
  arbitrumGoerli,
  filecoin,
  filecoinCalibration,
  base,
  baseGoerli,
  zetachainAthensTestnet,
  celoAlfajores,
} from "wagmi/chains";

export const GetSupportedChainsForWagmi = () => {
  console.log("process.env.NEXT_PUBLIC_ISPRODUCTION: ", process.env.NEXT_PUBLIC_ISPRODUCTION);
  if (process.env.NEXT_PUBLIC_ISPRODUCTION == "true") {
    return [arbitrumGoerli, baseGoerli, okxX1, scrollSepolia, celoAlfajores];
  } else {
    return [devChain, arbitrumGoerli, baseGoerli, okxX1, scrollSepolia, celoAlfajores];
  }
};
