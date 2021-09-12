const NFT = artifacts.require("NFT");

module.exports = async function () {
  const nft = await NFT.deployed();

  try {
    await nft.mint(
      "____REPLACE_THIS_WITH_YOUR_METADATA_URL____",
      "100000000000000000"
    );
    console.log("minted your NFT");
  } catch (e) {
    console.log("Failed to mint ", e);
  }

  return;
};
