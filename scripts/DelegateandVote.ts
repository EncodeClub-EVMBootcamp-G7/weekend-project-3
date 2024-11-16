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
const proposal = process.argv.slice(2)[0];
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
    deployer.account.address,
  ]);

  await publicClient.waitForTransactionReceipt({ hash: delegateTx });
  console.log(`Delegated voting power to ${deployer.account.address}`);

  //vote for proposal 1 
  const voteTx = await TokenizedBallot.write.vote([BigInt(proposal), parseEther("1")], {
    account: deployer.account,
  });
  await publicClient.waitForTransactionReceipt({ hash: voteTx });
  console.log(`Voted for proposal ${proposal} with 0.5 tokens`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
