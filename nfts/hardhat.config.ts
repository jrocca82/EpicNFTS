import { config as dotenvConfig } from "dotenv";
dotenvConfig();
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const defaultKey =
  "0000000000000000000000000000000000000000000000000000000000000001";
const defaultRpcUrl = "https://localhost:8545";

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: process.env.ALCHEMY_API_KEY_URL,
      accounts: [process.env.GOERLI_PRIVATE_KEY || defaultKey],
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || defaultRpcUrl,
      accounts: [process.env.PRIVATE_KEY || defaultKey]
    },
  },
  etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY,
  }
};

export default config;
