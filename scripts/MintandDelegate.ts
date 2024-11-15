import { viem } from "hardhat";
import {
  parseEther,
  formatEther,
  createWalletClient,
  toHex,
  getContract,
} from "viem";
import { sepolia } from "viem/chains";
import { createPublicClient, http } from "viem";
import * as dotenv from "dotenv";
import { privateKeyToAccount } from "viem/accounts";
import { abi } from "../artifacts/contracts/MyERC20Votes.sol/MyToken.json";
import {
  abi as abi2,
  bytecode as bytecode2,
} from "../artifacts/contracts/TokenizedBalot.sol/Ballot.json";
dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";
const MINT_VALUE = parseEther("10");
async function main() {
  const account = privateKeyToAccount(`0x${deployerPrivateKey}`);
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });
  const deployer = createWalletClient({
    account,
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });
  const proposals = ["arg1", "arg2", "arg3"];
  const tokenContract = getContract({
    address: process.env.CONTRACT_ADDRESS_ERC20 as any,
    abi: abi,
    client: { public: publicClient, wallet: deployer },
  });
  console.log(`MyToken deployed at ${tokenContract.address}`);

  // Mint tokens to acc1
  const mintTx = await tokenContract.write.mint([
    deployer.account.address,
    MINT_VALUE,
  ]);
  await publicClient.waitForTransactionReceipt({ hash: mintTx });
  console.log(
    `Minted ${formatEther(MINT_VALUE)} tokens to account ${
      deployer.account.address
    }`
  );

  // Check token balance
  const balanceBN = await tokenContract.read.balanceOf([
    deployer.account.address,
  ]);

  console.log(
    `Account ${
      deployer.account.address
    } has ${balanceBN!.toString()} decimal units of MyToken\n`
  );

  const votes = await tokenContract.read.getVotes([deployer.account.address]);
  console.log(
    `Account ${
      deployer.account.address
    } has ${votes!.toString()} units of voting power before self delegating\n`
  );


  const TokenizedBallot = getContract({
    address: process.env.CONTRACT_ADDRESS_BALLOT as any,
    abi: abi2,
    client: { public: publicClient, wallet: deployer },
  });

  console.log(`Ballot deployed at ${TokenizedBallot.address}`);

  // Delegate voting power
  const delegateTx = await tokenContract.write.delegate([
    "0x5D5A100689B1702294f13983a3131d1d1B68D12D",
  ]);
  await publicClient.waitForTransactionReceipt({ hash: delegateTx });
  console.log(`Delegated voting power to ${deployer.account.address}`);
}
main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
