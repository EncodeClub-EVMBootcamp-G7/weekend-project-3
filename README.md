# Project 2: Decentralized Voting Contract

This project implements a decentralized voting system using a smart contract on the Sepolia blockchain. The contract allows voters to participate in a vote by casting their vote directly, delegating their vote to another voter, or checking the results.

### The Contract is Already Deployed but to deploy it again run.
(The repo's default contract Address is 0xcb883c97860e0B367bB1b3c6C4bC5CedFd1c35D6)

```shell
npx ts-node --files ./scripts/DeployWithViem.ts "arg1" "arg2" "arg3"
```
## Try running some of the following tasks:

### Checking Proposals

```shell
npx ts-node --files ./scripts/CheckProposals.ts
npx hardhat run ./scripts/CheckProposals.ts
```
Both commands are the same 

### Give Right to Vote

```shell
npx ts-node --files ./scripts/GiveRightToVote.ts {address}
```
replace {address} by the address you want to give the right to

### Delegate 

```shell
npx ts-node --files ./scripts/Delegate.ts {address}
```
replace {address} by the address you want to Delegate

### Voting
Vote for Proposal 1:
```shell
npx ts-node --files ./scripts/CastVote.ts 0
```
Vote for Proposal 2:
```shell
npx ts-node --files ./scripts/CastVote.ts 1
```
Vote for Proposal 3:
```shell
npx ts-node --files ./scripts/CastVote.ts 2
```

### Check the Winner

```shell
npx hardhat run ./scripts/CheckWinner.ts
```