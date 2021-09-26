// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './Token.sol';

contract IenaiBank {
  uint secondsPerYear = 31668017;
  uint totalSupply = 1e16;
  Token private token;

  mapping(address => uint) public etherBalanceOf;
  mapping(address => uint) public depositStart;
  mapping(address => bool) public isDeposited;

  event Deposit(address indexed user, uint etherAmount, uint timeStart);
  event Withdraw(address indexed user, uint etherAmount, uint depositTime, uint interest);


  constructor(Token _token) {
    token = _token;
  }

  function deposit() payable public {
    require(isDeposited[msg.sender] == false, 'Cancelled, Deposit already active');
    // @TODO: Set deposit minimum?
    etherBalanceOf[msg.sender] = etherBalanceOf[msg.sender] + msg.value;
    depositStart[msg.sender] = depositStart[msg.sender] + block.timestamp;
    isDeposited[msg.sender] = true;
    emit Deposit(msg.sender, msg.value, block.timestamp);
  }

  function withdraw() public payable {
    require(isDeposited[msg.sender] == true, 'No withstanding deposit');
    uint userBalance = etherBalanceOf[msg.sender];
    // send principal ether back
    uint depositTime = block.timestamp - depositStart[msg.sender];
    // Calc interest
    uint interestPerSecond = secondsPerYear * (etherBalanceOf[msg.sender] / totalSupply);
    uint interest = interestPerSecond * depositTime;

    // send dep and token profit
    payable(msg.sender).transfer(userBalance);
    token.mint(msg.sender, interest);

    depositStart[msg.sender] = 0;
    etherBalanceOf[msg.sender] = 0;
    isDeposited[msg.sender] = false;

    emit Withdraw(msg.sender, userBalance, depositTime, interest);
  }
}
