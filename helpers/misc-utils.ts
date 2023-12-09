import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { Wallet, ContractTransaction } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export const getDb = () => low(new FileSync("./deployed-contracts.json"));

export let DRE: HardhatRuntimeEnvironment;

export const setDRE = (_DRE: HardhatRuntimeEnvironment) => {
  DRE = _DRE;
};

export const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

export const waitForTx = async (tx: ContractTransaction) => await tx.wait(1);
