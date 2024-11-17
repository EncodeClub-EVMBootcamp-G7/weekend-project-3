import { viem } from "hardhat";
import { parseEther, formatEther, hexToString } from "viem";

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
