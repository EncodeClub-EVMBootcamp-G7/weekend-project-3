import { viem } from "hardhat";
<<<<<<< HEAD
import { parseEther, formatEther, createWalletClient, toHex } from "viem";
import { sepolia } from "viem/chains";
import { createPublicClient, http } from "viem";
import * as dotenv from "dotenv";
import { privateKeyToAccount } from "viem/accounts";
import {
  abi as abi,
} from "../artifacts/contracts/TokenizedBalot.sol/Ballot.json";
import { getContract } from "viem";
dotenv.config();
const MINT_VALUE = parseEther("10"); // Mint 10 tokens for clarity
=======
import { parseEther, formatEther, hexToString } from "viem";
>>>>>>> refs/remotes/origin/main

import * as dotenv from "dotenv";

dotenv.config();

const contractAddress = process.env.CONTRACT_ADDRESS_BALLOT as `0x${string}` || "";
const contractName = "Ballot" as string;

async function main() {
  const [deployer] = await viem.getWalletClients();
  const TokenizedBallot = await viem.getContractAt(
    contractName,
    contractAddress,
    { client: { wallet: deployer } }
  );

  const proposals = ["arg1", "arg2", "arg3"];

<<<<<<< HEAD
  const TokenizedBallot =  getContract({
    address: process.env.CONTRACT_ADDRESS_BALLOT as any,
    abi: abi,
    client: { public: publicClient, wallet: deployer },
  });


=======
>>>>>>> refs/remotes/origin/main
  // Query the winning proposal
  const winningProposal = await TokenizedBallot.read.winningProposal();
  console.log(`Current winning proposal is: Proposal ${winningProposal}`);

  // Retrieve the winner's name
  const winnerNamehex = await TokenizedBallot.read.winnerName() as `0x${string}`;
  const winnerName = hexToString(winnerNamehex).replace(/\0+$/, '');  
  console.log(`Current winner is: ${winnerName}`);

  // Query vote count for each proposal
  for (let i = 0n; i < BigInt(proposals.length); i++) {
    const proposal = await TokenizedBallot.read.proposals([i]) as bigint;
    console.log(
      `Proposal ${i}: ${proposals[Number(i)]} has ${formatEther(proposal)} votes`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
