# Project 3: Decentralized Voting Contract part 2

This project implements a tokenized voting system using Solidity smart contracts and TypeScript scripts. It consists of two main contracts: MyToken, an ERC20 token with voting capabilities (inheriting from OpenZeppelin's ERC20Votes), and a Ballot contract that manages the voting process. Users can mint tokens, delegate voting power, and cast votes on different proposals. The voting power is determined by the number of tokens held at a specific block number, and users can split their voting power across multiple proposals. The project includes scripts for deploying contracts, minting tokens, self-delegating voting power, transferring tokens, casting votes, and viewing voting results. This implementation ensures a democratic and transparent voting system where voting power is directly tied to token ownership.

### The Contract is Already Deployed but to deploy it again run.
(The repo's default contract Address is )
CONTRACT_ADDRESS_BALLOT="0x00468977368D271E390a675aEA0C2B12CE502710"
CONTRACT_ADDRESS_ERC20="0x5494Fc6dc6B3d4b589A8b0d4C01973311AF6F81A"

```shell
npx ts-node --files ./scripts/TestVotes.ts
```
To deploy new contract instances

## Try running some of the following tasks:

### Voting

```shell
npx ts-node --files ./scripts/DelegateandVote.ts 0
```
change the `proposalIndex` to the one you want to vote on

### Transfer

```shell
npx ts-node --files ./scripts/DelegateandVote 1
```
change `addressTo` to the address you want to transfer to

### Self Delegate 

```shell
npx ts-node --files ./scripts/DelegateandVote 2
```