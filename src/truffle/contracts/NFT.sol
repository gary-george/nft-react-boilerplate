// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721, Ownable {
  address payable public _owner;
  mapping(uint256 => bool) public sold;
  mapping(uint256 => uint256) public price;

  event Purchase(address owner, uint256 price, uint256 id, string uri);

  constructor() ERC721("NFT EXAMPLE", "EXMPLE") {
    _owner = msg.sender;
  }

  function mint(string memory _tokenURI, uint256 _price)
    public
    onlyOwner
    returns (bool)
  {
    uint256 _tokenId = totalSupply() + 1;
    price[_tokenId] = _price;

    _mint(address(this), _tokenId);
    _setTokenURI(_tokenId, _tokenURI);

    return true;
  }

  function buy(uint256 _id) external payable {
    _validate(_id);
    _trade(_id);

    emit Purchase(msg.sender, price[_id], _id, tokenURI(_id));
  }

  function _validate(uint256 _id) internal {
    require(_exists(_id), "Error, wrong Token id");
    require(!sold[_id], "Error, Token is sold");
    require(msg.value >= price[_id], "Error, Token costs more");
  }

  function _trade(uint256 _id) internal {
    _transfer(address(this), msg.sender, _id);
    _owner.transfer(msg.value);
    sold[_id] = true;
  }
}
