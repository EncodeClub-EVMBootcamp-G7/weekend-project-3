import { viem } from "hardhat";
import {
  parseEther,
  formatEther,
} from "viem";
import * as dotenv from "dotenv";

dotenv.config();
<<<<<<< HEAD:scripts/DelegateandVote.ts
const proposal = process.argv.slice(2)[0];
const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";
=======

const contractAddress = process.env.CONTRACT_ADDRESS_ERC20 || "";
const contractName = "MyToken";

>>>>>>> refs/remotes/origin/main:scripts/MintandDelegate.ts
const MINT_VALUE = parseEther("10");

async function main() {
  const publicClient = await viem.getPublicClient();
  const [deployer] = await viem.getWalletClients();

  // const proposals = ["arg1", "arg2", "arg3"];

  const tokenContract = await viem.getContractAt(
    contractName as string,
    contractAddress as `0x${string}`,
    { client: { wallet: deployer } }
  );
  console.log(`MyToken deployed at ${tokenContract.address}`);

<<<<<<< HEAD:scripts/DelegateandVote.ts
  const votes = await tokenContract.read.getVotes([deployer.account.address]);
=======
  // Mint tokens to acc1
  const mintTx = await tokenContract.write.mint([
    deployer.account.address,
    MINT_VALUE,
  ]);
  await publicClient.waitForTransactionReceipt({ hash: mintTx });
  console.log(
    `Minted ${formatEther(MINT_VALUE)
    } tokens to account ${deployer.account.address}`
  );

  // Check token balance
  const balanceBN = await tokenContract.read.balanceOf([
    deployer.account.address,
  ]) as bigint;

  console.log(
    `Account ${deployer.account.address
    } has ${formatEther(balanceBN)} units of MyToken\n`
  );

  const votesBefore = await tokenContract.read.getVotes([deployer.account.address]) as bigint;
>>>>>>> refs/remotes/origin/main:scripts/MintandDelegate.ts
  console.log(
    `Account ${deployer.account.address
    } has ${formatEther(votesBefore)} units of voting power before self delegating\n`
  );

<<<<<<< HEAD:scripts/DelegateandVote.ts
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

=======
  // Delegate voting power
  const delegateTx = await tokenContract.write.delegate([deployer.account.address], {
    account: deployer.account,
  });
  await publicClient.waitForTransactionReceipt({ hash: delegateTx });
  const votesAfter = await tokenContract.read.getVotes([deployer.account.address]) as bigint;
  console.log(
    `Account ${deployer.account.address
    } has ${formatEther(votesAfter)} units of voting power after self delegating\n`
  );
}


>>>>>>> refs/remotes/origin/main:scripts/MintandDelegate.ts
main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
