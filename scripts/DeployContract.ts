import { viem } from "hardhat";
import { parseEther, formatEther, toHex } from "viem";


async function main() {
  const publicClient = await viem.getPublicClient();
  const [deployer] = await viem.getWalletClients();
  const proposals = ["arg1", "arg2", "arg3"];

  // Deploy Token contract
  const tokenContract = await viem.deployContract("MyToken");
  console.log(`Token contract deployed at ${tokenContract.address}\n`);

  // Mint tokens
  const MINT_VALUE = parseEther("10");
  const mintTx = await tokenContract.write.mint([deployer.account.address, MINT_VALUE]);
  await publicClient.waitForTransactionReceipt({ hash: mintTx });
  const balanceBN = await tokenContract.read.balanceOf([deployer.account.address]) as bigint;
  console.log(`Minted ${formatEther(balanceBN)} units of MyToken to account ${deployer.account.address}\n`);

  const votesBefore = await tokenContract.read.getVotes([deployer.account.address]) as bigint;
  console.log(
    `Account ${
      deployer.account.address
    } has ${formatEther(votesBefore)} units of voting power before self delegating\n`
  );

  // Delegate tokens
  const delegateTx = await tokenContract.write.delegate([deployer.account.address]);
  await publicClient.waitForTransactionReceipt({ hash: delegateTx });

  const votesAfter = await tokenContract.read.getVotes([deployer.account.address]) as bigint;
  console.log(
    `Account ${
      deployer.account.address
    } has ${formatEther(votesAfter)} units of voting power after self delegating\n`
  );

  // Get target block number
  const targetBlockNumber = (await publicClient.getBlockNumber()) + 1n;

  // Deploy Ballot contract
  const TokenizedBallot = await viem.deployContract("Ballot", [
    proposals.map((prop) => toHex(prop, { size: 32 })),
    tokenContract.address,
    targetBlockNumber,
  ]);
  console.log(`Ballot deployed at ${TokenizedBallot.address}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

