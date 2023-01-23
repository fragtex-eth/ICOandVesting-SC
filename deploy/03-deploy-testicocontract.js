const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  let USCToken, USCTokenAddress, Token, TokenAddress, Vesting, VestingAddress;

  Token = await ethers.getContract("Token");
  TokenAddress = Token.address;
  Vesting = await ethers.getContract("Vesting");
  USDC = await ethers.getContract("BEP20USDT");

  VestingAddress = Vesting.address;

  const arguments = [
    TokenAddress,
    VestingAddress,
    USDC.address,
    USDC.address,
    USDC.address,
  ];

  const token = await deploy("ICO", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: network.config.waitConfirmations || 1,
  });

  // if (
  //   !developmentChains.includes(network.name) &&
  //   process.env.ETHERSCAN_API_KEY
  // ) {
  //   log("Verifying...");
  //   await verify(.address, args);
  // }
  // log("----------------------------");
};

module.exports.tags = ["all", "ico", "test"];
