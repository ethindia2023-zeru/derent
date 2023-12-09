import { getDb, DRE, waitForTx } from "./misc-utils";
import { Contract, Signer, utils, ethers, BigNumberish } from "ethers";

export const registerContractInJsonDb = async (contractId: string, contractInstance: Contract) => {
  const currentNetwork = DRE.network.name;
  console.log("current network:", currentNetwork);

  await getDb()
    .set(`${contractId}.${currentNetwork}`, {
      address: contractInstance.address,
      deployer: contractInstance.deployTransaction.from,
    })
    .write();
};

export const getEthersSigners = async (): Promise<Signer[]> => {
  const ethersSigners = await Promise.all(await DRE.ethers.getSigners());

  return ethersSigners;
};

export const getFirstSigner = async () => (await getEthersSigners())[0];

export const deployContract = async <ContractType extends Contract>(
  contractName: string,
  args: any[],
): Promise<ContractType> => {
  const contract = (await (await DRE.ethers.getContractFactory(contractName))
    .connect(await getFirstSigner())
    .deploy(...args)) as ContractType;
  await waitForTx(contract.deployTransaction);
  await registerContractInJsonDb(contractName, contract);
  return contract;
};
