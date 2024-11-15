import { viem } from "hardhat";
import { parseEther, formatEther, createWalletClient, toHex } from "viem";
import { sepolia } from "viem/chains";
import { createPublicClient, http } from "viem";
import * as dotenv from "dotenv";
import { privateKeyToAccount } from "viem/accounts";
import {
  abi,
  bytecode,
} from "../artifacts/contracts/MyERC20Votes.sol/MyToken.json";
import {
  abi as abi2,
  bytecode as bytecode2,
} from "../artifacts/contracts/TokenizedBalot.sol/Ballot.json";
import { getContract } from "viem";
dotenv.config();
const MINT_VALUE = parseEther("10"); // Mint 10 tokens for clarity

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";

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

  // Deploy MyToken contract
  const hash1 = await deployer.deployContract({
    abi: abi,
    bytecode: bytecode as `0x${string}`, // Ensure bytecode is of type string and includes "0x"
  });
  console.log("Transaction hash:", hash1);
  const receipt1 = await publicClient.waitForTransactionReceipt({
    hash: hash1,
  });
  const tokenContract = getContract({
    address: receipt1.contractAddress!,
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

  const blockN = Number(await publicClient.getBlockNumber()) + 4;
  // Deploy Ballot contract

  const hash2 = await deployer.deployContract({
    abi: abi2,
    bytecode: bytecode2 as `0x${string}`,
    args: [
      proposals.map((prop) => toHex(prop, { size: 32 })), // Convert each proposal to bytes32
      tokenContract.address, // Token contract address
      BigInt(blockN), // Target block number, use BigInt for large numbers
    ],
  });
  const receipt2 = await publicClient.waitForTransactionReceipt({
    hash: hash2,
  });

  const TokenizedBallot =  getContract({
    address: receipt2.contractAddress!,
    abi: abi2,
    client: { public: publicClient, wallet: deployer },
  });

  /*const TokenizedBallot = await viem.deployContract("Ballot", [
    proposals.map((prop) => toHex(prop, { size: 32 })), // Convert each proposal to bytes32
    tokenContract.address, // Token contract address
    BigInt(blockN), // Target block number, use BigInt for large numbers
  ]);*/
  console.log(`Ballot deployed at ${TokenizedBallot.address}`);

  // Delegate voting power
  const delegateTx = await tokenContract.write.delegate([
    deployer.account.address,
  ]);
  await publicClient.waitForTransactionReceipt({ hash: delegateTx });
  console.log(`Delegated voting power to ${deployer.account.address}`);

  // Check remaining votes for deployer
  const VotesAfter = await tokenContract.read.getVotes([
    deployer.account.address,
  ]);
  console.log(
    `Votes After delegation ${deployer.account.address}: ${formatEther(
      VotesAfter
    )} tokens`
  );

  const VotePower = await TokenizedBallot.read.getVotePower([
    deployer.account.address,
  ]);
  console.log(
    `Vote Power After delegation ${deployer.account.address}: ${formatEther(
      VotePower
    )} tokens`
  );
  // Cast a vote on proposal 0 with 0.5 tokens
  const voteTx = await TokenizedBallot.write.vote([1n, parseEther("0.5")], {
    account: deployer.account,
  });
  await publicClient.waitForTransactionReceipt({ hash: voteTx });
  console.log(`Voted for proposal 0 with 0.5 tokens`);

  // Query the winning proposal
  const winningProposal = await TokenizedBallot.read.winningProposal();
  console.log(`Current winning proposal is: Proposal ${winningProposal}`);

  // Retrieve the winner's name
  const winnerName = await TokenizedBallot.read.winnerName();
  console.log(`Current winner is: ${winnerName}`);

  // Query vote count for each proposal
  for (let i = 0n; i < BigInt(proposals.length); i++) {
    const proposal = await TokenizedBallot.read.proposals([i]);
    console.log(
      `Proposal ${i}: ${proposals[Number(i)]} has ${proposal[1]} votes`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
