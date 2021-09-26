// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './Token.sol';

contract IenaiBank {

  Token private token;

  mapping(address => uint) public etherBalanceOf;

  constructor(Token _token) {
    token = _token;
  }

  function deposit() payable public {

  }

  function withdraw() public {

  }
}
