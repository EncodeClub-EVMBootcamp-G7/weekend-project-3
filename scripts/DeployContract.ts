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
  console.log(`Minted ${formatEther(MINT_VALUE)} units of MyToken to account ${deployer.account.address}\n`);

  // Delegate tokens
  const delegateTx = await tokenContract.write.delegate([deployer.account.address]);
  await publicClient.waitForTransactionReceipt({ hash: delegateTx });
  console.log(`Delegated ${formatEther(MINT_VALUE)} units of voting power to account ${deployer.account.address}\n`);

  // Get target block number
  const targetBlockNumber = (await publicClient.getBlockNumber()) + 1n;

  // Deploy Ballot contract
  const TokenizedBallot = await viem.deployContract("Ballot", [
    proposals.map((prop) => toHex(prop, { size: 32 })),
    tokenContract.address,
    targetBlockNumber,
  ]);
  console.log(`Ballot deployed at ${TokenizedBallot.address}`);

  // const mintTx = await contract.write.mint([deployer.account.address, MINT_VALUE]);
  // await publicClient.waitForTransactionReceipt({ hash: mintTx });
  // console.log(
  //   `Minted ${MINT_VALUE.toString()} decimal units to account ${
  //     deployer.account.address
  //   }\n`
  // );
  // const balanceBN = await contract.read.balanceOf([deployer.account.address]);
  // console.log(
  //   `Account ${
  //     deployer.account.address
  //   } has ${balanceBN.toString()} decimal units of MyToken\n`
  // );

  // const votes = await contract.read.getVotes([deployer.account.address]);
  // console.log(
  //   `Account ${
  //     deployer.account.address
  //   } has ${votes.toString()} units of voting power before self delegating\n`
  // );
  // const delegateTx = await contract.write.delegate([acc1.account.address], {
  //   account: acc1.account,
  // });
  // await publicClient.waitForTransactionReceipt({ hash: delegateTx });
  // const votesAfter = await contract.read.getVotes([acc1.account.address]);
  // console.log(
  //   `Account ${
  //     acc1.account.address
  //   } has ${votesAfter.toString()} units of voting power after self delegating\n`
  // );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

