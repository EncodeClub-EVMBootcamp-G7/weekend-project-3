import { viem } from "hardhat";
import { parseEther, formatEther } from "viem";
import * as dotenv from "dotenv";

dotenv.config();

const contractAddressBallot = process.env.CONTRACT_ADDRESS_BALLOT as `0x${string}` || "";
const contractName = "Ballot" as string;

async function main() {
    const publicClient = await viem.getPublicClient();
    const [deployer] = await viem.getWalletClients();

    // const proposals = ["arg1", "arg2", "arg3"];
  
    const TokenizedBallot =  await viem.getContractAt(
      contractName,
      contractAddressBallot,
      { client: { wallet: deployer } }
    );
    console.log(`Ballot deployed at ${TokenizedBallot.address}`);
  
    const VotePower = await TokenizedBallot.read.getVotePower([
      deployer.account.address,
    ]);
    console.log(
      `Vote Power After delegation ${deployer.account.address}: ${formatEther(VotePower as bigint)} tokens`
    );
    // Cast a vote on proposal 0 with 0.5 tokens
    const proposalIndex = 0;
    const voteTx = await TokenizedBallot.write.vote([proposalIndex, parseEther("1")], {
      account: deployer.account,
    });
    await publicClient.waitForTransactionReceipt({ hash: voteTx });
    console.log(`Voted for proposal ${proposalIndex} with 1 tokens`);
  
    // Query the winning proposal
    // const winningProposal = await TokenizedBallot.read.winningProposal();
    // console.log(`Current winning proposal is: Proposal ${winningProposal}`);
  
    // // Retrieve the winner's name
    // const winnerName = await TokenizedBallot.read.winnerName();
    // console.log(`Current winner is: ${winnerName}`);
  
    // // Query vote count for each proposal
    // for (let i = 0n; i < BigInt(proposals.length); i++) {
    //   const proposal = await TokenizedBallot.read.proposals([i]);
    //   console.log(
    //     `Proposal ${i}: ${proposals[Number(i)]} has ${proposal[1]} votes`
    //   );
    // }
  }
  
  main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
  