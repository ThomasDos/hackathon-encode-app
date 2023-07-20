# DEMETER

### Streamline Your Treasury Management: Introducing our Discord Bot

### and Sponsor Web App!

## Context

Demeter, a Discord bot, has been an integral part of the DeFi France community for the past two years.

Members earn reputation points every two weeks based on their activity, which can be used for voting, moderating, giveaways, and more within the community.

DeFi France organizes monthly meetups where the expenses, including venue and food costs, are financed by sponsors.

Our sponsors face payment challenges due to multiple different blockchains, but our integrated solution streamlines and simplifies the process.

## Motivation

Currently, the community treasury operates as a multisig. Spending money requires a proposal voting, and later, if approved, multiple members' signatures.
We wanted to automate this process for increased efficiency. Once a proposal is approved, Demeter, the Discord bot, would autonomously execute the transaction, sending the tokens directly to the designated recipient.
To grant sponsors greater flexibility, we aim to enable them to contribute any token from any blockchain of their choice.

## Bridge the sponsoring funds

Using Wormhole Token Bridge, we created a webapp to help sponsors send any token from any chain to the treasury Smart Account.

We optimize fund redemption by centralizing all funds into one secure wallet for efficient management.

### Attesting a token (optional)

If the ERC20 token has not been previously transferred to the target chain, we initiate the creation of its wrapped equivalent to enable seamless attestation.

Attest on the source chain and retrieve the sequence.
20-30 minute waiting period to ensure block finality as per the blockchain protocol.
To retrieve the VAA through an off-chain check, send the sequence via an HTTP request to Wormhole relayers and obtain the required proof.
Using the SDK method, we call the bridge contract on the target chain with the obtained proof, effectively deploying the wrapped token contract.

### Sending a token

The sponsor can send any token
Approve the token.
Transfer it.
Now, the association can retrieve a sequence based on the sponsor tx.
Obtain a proof from Wormhole validators via a HTTP request by sending the sequence.
Switch network and call a function on the target chain with the proof to redeem the wrapped token.

### Using Wormhole connect

Wormhole Connect: Bridging Listed Tokens between Chains
Connect your wallet.
Choose the original chain.
Choose the desired asset to send.
Connect second wallet and choose the target chain
Send your tokens.

### Redeem Your Token on the Target Chain

Retrieve VAA on Original Chain: Obtain the Validator Aggregator Address (VAA) by providing the receipt and sequence through the transaction hash on the original chain.
Connect Wallet to Target Chain: Ensure that your connected wallet is active on the target chain where you intend to redeem the tokens.
Claim Your Tokens: Utilize the obtained VAA and initiate the claim process to securely redeem your tokens on the target chain.
Efficient Cross-Chain Redemption: Wormhole facilitates a seamless process for redeeming tokens between chains, ensuring a smooth user experience.
Streamlined Treasury Management: Centralize and manage the redeemed funds in a secure wallet for efficient treasury management.

## Discord Bot

### New Discord commands

[/treasury deploy] Deploys a treasury Smart Account using Biconomy sdk
[/treasury print] Displays the treasury assets
[/proposal start-treasury] Creates a proposal for spending treasury’s assets
/treasury deploy
/treasury print

#### /proposal start-treasury example

Write a message to describe the proposal, and once done, copy the message link. Then, use the command and fill in the parameters.

Demeter will launch a proposal and let members vote

When the end date is reached, Demeter will automatically close the proposal and calculate the reputation points in favor and against for further processing. If approved, the assets will be send using 1RPC, the privacy preserving RPC.

We can see on Polyscan that the Smart Account, which is a Smart Contract, sent the MATIC!
https://mumbai.polygonscan.com/tx/0x9155d863c0a3cf0f0d70f1e84b3036b2c46e1f8feadd72499ac510298dfb9cce

## What’s next?

Integrate Wormhole in the Discord bot to be able to send any token to any chain

Create Biconomy Smart Accounts for each Discord member and mint reputation onchain

Integrate Biconomy in the sponsors webapp to allow easy on-ramp to non crypto-natives

Improve the UX / UI of the web App to make everything more intuive (selection of chains, tokens, transactions history, etc...)

## Links

Join the Discord server to test it yourself! https://discord.gg/8d2zN3yZ
Visit the sponsors webapp at https://hackathon-encode-app-rose.vercel.app/
The bot repo: https://github.com/ootsun/demeter-discord-bot/tree/wormhole-hackathon
(make sure to stay on “wormhole-hackathon” branch)
The webapp repo: https://github.com/ThomasDos/hackathon-encode-app
