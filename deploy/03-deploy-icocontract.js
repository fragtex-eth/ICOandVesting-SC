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

  let BUSDAddress = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
  let DAIAddress = "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3";
  let USDTAddress = "0x55d398326f99059ff775485246999027b3197955";

  VestingAddress = Vesting.address;

  const arguments = [
    TokenAddress,
    VestingAddress,
    USDTAddress,
    DAIAddress,
    BUSDAddress,
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

module.exports.tags = ["all", "ico", "real"];
