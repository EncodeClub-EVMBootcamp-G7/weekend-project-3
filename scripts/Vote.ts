import { viem } from "hardhat";
import { parseEther, formatEther } from "viem";
import * as dotenv from "dotenv";
import { forma } from "viem/chains";

dotenv.config();

const contractAddressBallot = process.env.CONTRACT_ADDRESS_BALLOT as `0x${string}` || "";
const contractName = "Ballot" as string;

async function main() {
  const publicClient = await viem.getPublicClient();
  const [deployer] = await viem.getWalletClients();

  // const proposals = ["arg1", "arg2", "arg3"];

  const TokenizedBallot = await viem.getContractAt(
    contractName,
    contractAddressBallot,
    { client: { wallet: deployer } }
  );
  console.log(`Ballot deployed at ${TokenizedBallot.address}`);

  const VotePower = await TokenizedBallot.read.getVotePower([
    deployer.account.address,
  ]);
  console.log(
    `Total Vote Power of ${deployer.account.address}: ${formatEther(VotePower as bigint)} tokens`
  );

  // Cast a vote on proposal
  const proposalIndex = 0;
  const voteAmount = parseEther("1");
  const voteTx = await TokenizedBallot.write.vote([proposalIndex, voteAmount], {
    account: deployer.account,
  });
  await publicClient.waitForTransactionReceipt({ hash: voteTx });
  console.log(`Voted for proposal ${proposalIndex} with 1 tokens`);

  //Query the remaining vote power
  const remainingVotePower = await TokenizedBallot.read.remainingVotePower([
    deployer.account.address,
  ]);
  console.log(
    `Remaining Vote Power ${deployer.account.address}: ${formatEther(remainingVotePower as bigint - voteAmount)} tokens`
  );

  // Query the winning proposal
  const winningProposal = await TokenizedBallot.read.winningProposal();
  console.log(`Current winning proposal is: Proposal ${winningProposal}`);

}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
