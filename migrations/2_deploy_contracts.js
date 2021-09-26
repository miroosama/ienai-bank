const Token = artifacts.require('Token');
const IenaiBank = artifacts.require('IenaiBank');


module.exports = async function(deployer) {
  await deployer.deploy(Token);

  // assign token to const to get address
  const token = await Token.deployed();

  // pass token address for bank contract for future minting
  await deployer.deploy(IenaiBank, token.address);

  // assign ienaiBank contract to const to get address
  const ienaiBank = await IenaiBank.deployed();

  // change token's owner/minter from deployer to bank contract
  await token.passMinterRole(ienaiBank.address);
};
