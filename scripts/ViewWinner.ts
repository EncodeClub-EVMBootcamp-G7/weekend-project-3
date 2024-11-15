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

  const TokenizedBallot = await getContract({
    address: contractAddress!,
    abi: abi2,
    client: { public: publicClient, wallet: deployer },
  });


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
