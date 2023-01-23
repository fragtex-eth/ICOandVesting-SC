const { ethers, network, upgrades } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  let Token, TokenAddress;

  Token = await ethers.getContract("Token");
  TokenAddress = Token.address;

  const arguments = [TokenAddress];

  const token = await deploy("Vesting", {
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
  //   await verify(token.address, args);
  // }
  // log("----------------------------");
};

module.exports.tags = ["all", "vesting", "real", "test"];
