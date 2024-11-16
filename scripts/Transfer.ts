import { viem } from "hardhat";
import { parseEther, formatEther, toHex } from "viem";

const contractAddress = process.env.CONTRACT_ADDRESS_ERC20 || "";
const contractName = "MyToken";

const accountTo = "0x19F9bC5c623aba77B18f5834598A1356c6ee5c27";

async function main() {
    const publicClient = await viem.getPublicClient();
    const [deployer] = await viem.getWalletClients();

    const tokenContract = await viem.getContractAt(
        contractName as string,
        contractAddress as `0x${string}`,
        { client: { wallet: deployer } }
    );

    const transferValue = parseEther("1");
    const transferTx = await tokenContract.write.transfer(
        [accountTo, transferValue],
        {
            account: deployer.account,
        }
    );
    await publicClient.waitForTransactionReceipt({ hash: transferTx });

    const votes1AfterTransfer = await tokenContract.read.getVotes([
        deployer.account.address,
    ]) as bigint;
    console.log(
        `Account ${deployer.account.address
        } has ${votes1AfterTransfer.toString()} units of voting power after transferring ${transferValue.toString()} decimal units of MyToken\n`
    );
    
    const votes2AfterTransfer = await tokenContract.read.getVotes([
        accountTo,
    ]) as bigint;
    console.log(
        `Account ${accountTo
        } has ${votes2AfterTransfer.toString()} units of voting power after receiving a transfer of ${transferValue.toString()} decimal units of MyToken\n`
    );
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});

