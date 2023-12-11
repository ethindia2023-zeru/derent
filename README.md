# Decentralized Renting Platform

## Introduction

Welcome to our Decentralized Renting Platform, a revolutionary solution for seamless and secure property transactions.

## Features

- _Decentralization:_ Utilizing chains like Arbitrum, Base, Scroll, Celo, and OKX X1 for robust and secure operations.
- _Chainlink Automation:_ Auction unoccupied properties automatically for efficiency.
- _Push Protocol:_ Enable cross-chain notifications for property discovery and updates.

## Setup

Follow these steps to set up the project locally:

1. Clone the repository.
   git clone https://github.com/ethindia2023-zeru/derent.git
2. Install dependencies.
   npm i
3. Configure .env variables using .env.example file.

## Usage

1. Deploy smart contracts on supported chains.
   Arbitrum : npm run deploy-goerli
   Base : npm run deploy-base
   Scroll : npm run deploy-scroll
   Celo : npm run deploy-celo
   OKX x1 : npm run deploy-x1

   before this below command update the path inside that to point towards artifacts and deployed contracts address files
   `./copyDepConAndArt.sh`

2. Integrate Chainlink for automated property calls.
   Start here:
   https://docs.chain.link/chainlink-automation/overview/getting-started

3. Leverage Push Protocol for notifications.
   Currently only integrated for Arbitrum goerli

4. Run the application.
   cd application
   npm i
   npm run dev
   open localhost:3000 in the browser

## Deployment Address in Each Chain

1. Arbitrum : 0x8d90D89f7cc0DF940D8B7C7F4701Df08349E9f2E
2. Base : 0x137BfEb4A4f42a5B6c15fc8819bCb7c7954Eb9D4
3. Scroll : 0xf70b04F2ac9e8A88AdB552C30700544FD4494bBD
4. Celo : 0x8E6571c29526405FA4Cd3D1b4a6be513F2057a22
5. OKX x1 : 0xf70b04F2ac9e8A88AdB552C30700544FD4494bBD

## Technologies

- Nextjs
- Solidity
- Chainlink Automation
- Push Protocol Notification

## Future Development

Consider these potential enhancements:

- Integration with DAO structure.
- Enhanced user interface and experience.
- Smart contract optimizations for cost efficiency.

## License

This project is open-source under MIT.

## Contact

For inquiries or collaboration opportunities, contact us at 3litedev@gmail.com

---
