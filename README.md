# Project 3: Decentralized Voting Contract part 2

This project implements a decentralized voting system using a smart contract on the Sepolia blockchain. The contract allows voters to participate in a vote by casting their vote directly, delegating their vote to another voter, or checking the results.

### The Contract is Already Deployed but to deploy it again run.
(The repo's default contract Address is )
CONTRACT_ADDRESS_BALLOT="0x00468977368D271E390a675aEA0C2B12CE502710"
CONTRACT_ADDRESS_ERC20="0x5494Fc6dc6B3d4b589A8b0d4C01973311AF6F81A"

```shell
npx ts-node --files ./scripts/TestVotes.ts
```
To deploy new contract instances

## Try running some of the following tasks:

### Checking Winner

```shell
npx hardhat run ./scripts/ViewWinner.ts
``` 

### Voting
Vote for Proposal 1:
```shell
npx ts-node --files ./scripts/DelegateandVote.ts 0
```
Vote for Proposal 2:
```shell
npx ts-node --files ./scripts/DelegateandVote 1
```
Vote for Proposal 3:
```shell
npx ts-node --files ./scripts/DelegateandVote 2
```