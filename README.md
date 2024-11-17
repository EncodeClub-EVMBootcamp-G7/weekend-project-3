<<<<<<< HEAD
# Project 3: Decentralized Voting Contract part 2
=======
# Project 3: Tokenized Ballot Contract
>>>>>>> refs/remotes/origin/main

This project implements a tokenized voting system using Solidity smart contracts and TypeScript scripts. It consists of two main contracts: MyToken, an ERC20 token with voting capabilities (inheriting from OpenZeppelin's ERC20Votes), and a Ballot contract that manages the voting process. Users can mint tokens, delegate voting power, and cast votes on different proposals. The voting power is determined by the number of tokens held at a specific block number, and users can split their voting power across multiple proposals. The project includes scripts for deploying contracts, minting tokens, self-delegating voting power, transferring tokens, casting votes, and viewing voting results. This implementation ensures a democratic and transparent voting system where voting power is directly tied to token ownership.

<<<<<<< HEAD
### The Contract is Already Deployed but to deploy it again run.
(The repo's default contract Address is )
CONTRACT_ADDRESS_BALLOT="0x00468977368D271E390a675aEA0C2B12CE502710"
CONTRACT_ADDRESS_ERC20="0x5494Fc6dc6B3d4b589A8b0d4C01973311AF6F81A"

```shell
npx ts-node --files ./scripts/TestVotes.ts
=======
### The Contracts are Already Deployed but to deploy themagain run.
(The repo's default Contracts Address are 0x42c75444c0b6a9cc21346feba1dd0bfdd009389b for MyToken and 0x3bbf09a480751b111a893a7bb05d09f082869cbe for TokenizedBallot)

```shell
npx hardhat run ./scripts/DeployContract.ts --network sepolia
>>>>>>> refs/remotes/origin/main
```
To deploy new contract instances

## Try running some of the following tasks:

<<<<<<< HEAD
### Checking Winner

```shell
npx hardhat run ./scripts/ViewWinner.ts
``` 

=======
>>>>>>> refs/remotes/origin/main
### Voting

```shell
<<<<<<< HEAD
npx ts-node --files ./scripts/DelegateandVote.ts 0
=======
npx  hardhat run ./scripts/Vote.ts --network sepolia
>>>>>>> refs/remotes/origin/main
```
change the `proposalIndex` to the one you want to vote on

### Transfer

```shell
<<<<<<< HEAD
npx ts-node --files ./scripts/DelegateandVote 1
=======
npx  hardhat run ./scripts/Transfer.ts --network sepolia
>>>>>>> refs/remotes/origin/main
```
change `addressTo` to the address you want to transfer to

### Self Delegate 

```shell
<<<<<<< HEAD
npx ts-node --files ./scripts/DelegateandVote 2
=======
npx  hardhat run ./scripts/SelfDelegate.ts --network sepolia
```
This script is need when `MyToken` is received in order to delegate the vote to the receiver

Note: This script doesn't need to be run multiple times. Only neccesary after first receiving `MyToken`


### Check the Winner

```shell
npx hardhat run ./scripts/ViewWinner.ts --network sepolia
>>>>>>> refs/remotes/origin/main
```