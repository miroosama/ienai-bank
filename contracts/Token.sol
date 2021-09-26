// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
  address public minter;

  event MinterChanged(address indexed from, address to);

  constructor() payable ERC20('ienai token', 'INI ') {
    minter = msg.sender;
  }

  function passMinterRole(address ienaiBank) public returns (bool) {
    require(msg.sender == minter, 'Error, msg.sender does not have minter role');
    minter = ienaiBank;

    emit MinterChanged(msg.sender, ienaiBank);
    return true;
  }

  function mint(address account, uint256 amount) public {
    require(msg.sender == minter, 'Error, msg.sender does not have minter role');
    _mint(account, amount);
  }
}
