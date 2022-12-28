/* eslint-disable no-undef */
const NFT = artifacts.require("NFT");

module.exports = async function () {
  const nft = await NFT.deployed();

  // This is where the metadata file lives on IPFS
  const IPFS_CID = "[YOUR_IPFS_CID_HERE]";
  //This is the cost in WEI that your NFT will be
  const COST_OF_NFT = "100000000000000000";

  try {
    await nft.mint(`https://ipfs.io/ipfs/${IPFS_CID}`, COST_OF_NFT);
    console.log("minted your NFT");
  } catch (e) {
    console.log("Failed to mint ", e);
  }

  return;
};
