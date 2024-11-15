import { viem } from "hardhat";
import { parseEther, formatEther, createWalletClient, toHex, getContract } from "viem";
import { sepolia } from "viem/chains";
import { createPublicClient, http } from "viem";
import * as dotenv from "dotenv";
import { privateKeyToAccount } from "viem/accounts";
import {abi} from "../artifacts/contracts/TokenizedBalot.sol/Ballot.json"
dotenv.config();

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
  
    const TokenizedBallot =  getContract({
      address: process.env.CONTRACT_ADDRESS_BALLOT as any,
      abi: abi,
      client: { public: publicClient, wallet: deployer },
    });
  
   
    console.log(`Ballot deployed at ${TokenizedBallot.address}`);
  
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
  