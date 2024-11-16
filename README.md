# Project 3: Tokenized Ballot Contract

This project implements a tokenized voting system using Solidity smart contracts and TypeScript scripts. It consists of two main contracts: MyToken, an ERC20 token with voting capabilities (inheriting from OpenZeppelin's ERC20Votes), and a Ballot contract that manages the voting process. Users can mint tokens, delegate voting power, and cast votes on different proposals. The voting power is determined by the number of tokens held at a specific block number, and users can split their voting power across multiple proposals. The project includes scripts for deploying contracts, minting tokens, self-delegating voting power, transferring tokens, casting votes, and viewing voting results. This implementation ensures a democratic and transparent voting system where voting power is directly tied to token ownership.

### The Contracts are Already Deployed but to deploy themagain run.
(The repo's default Contracts Address are 0x42c75444c0b6a9cc21346feba1dd0bfdd009389b for MyToken and 0x3bbf09a480751b111a893a7bb05d09f082869cbe for TokenizedBallot)

```shell
npx hardhat run ./scripts/DeployContract.ts --network sepolia
```
## Try running some of the following tasks:

### Voting

```shell
npx  hardhat run ./scripts/Vote.ts --network sepolia
```
change the `proposalIndex` to the one you want to vote on

### Transfer

```shell
npx  hardhat run ./scripts/Transfer.ts --network sepolia
```
change `addressTo` to the address you want to transfer to

### Self Delegate 

```shell
npx  hardhat run ./scripts/SelfDelegate.ts --network sepolia
```
This script is need when `MyToken` is received in order to delegate the vote to the receiver

Note: This script doesn't need to be run multiple times. Only neccesary after first receiving `MyToken`


### Check the Winner

```shell
npx hardhat run ./scripts/ViewWinner.ts --network sepolia
```