/* eslint-disable */
import React, { useEffect } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import Contract from "../truffle/abis/NFT.json";

const loadContract = async () => {
  try {
    //THIS ALLOWS YOU TALK TO BLOCKCHAIN
    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions: {}, // required
    });
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    const netId = await web3.eth.net.getId();
    //THIS WILL LOAD YOUR CONTRACT FROM BLOCKCHAIN
    const contract = new web3.eth.Contract(
      Contract.abi,
      Contract.networks[netId].address
    );

    // GET THE AMOUNT OF NFTs MINTED
    const totalSupply = await contract.methods.totalSupply().call();
    console.log(`totalSupply ${totalSupply}`);

    /*
    UNCOMMENT THIS BLOCK ONCE YOU HAVE MINTED AN NFT

        // THE TOKEN ID YOU WANT TO QUERY
        const tokenID = 1;

        // GET THE TOKEN URI
        // THE URI IS THE LINK TO WHERE YOUR JSON DATA LIVES
        const uri = await contract.methods.tokenURI(tokenID).call();
        console.log(uri);

        // GET THE OWNER OF A SPECIFIC TOKEN
        const owner = await contract.methods.ownerOf(tokenID).call();
        console.log(owner);

        // CHECK IF A SPECIFIC TOKEN IS SOLD
        const sold = await contract.methods.sold(tokenID).call();
        console.log(sold);
        
        // GET PRICE OF A SPECIFIC TOKEN
        const price = await contract.methods.price(tokenID).call();
        console.log(price);
    */
  } catch (e) {
    console.log("error = ", e);
  }
};

const Home = () => {
  useEffect(() => {
    loadContract();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "justify",
        width: "500px",
        border: "8px hotpink solid",
        boxShadow: "0 0 12px rgba(0,0,0,0.5)",
        borderRadius: "20px",
        margin: "100px auto",
        fontSize: "20px",
        padding: "20px",
      }}
    >
      <p>NFT React Boilerplate</p>
      <p>
        Once you have compiled and migrated the contract with Truffle you will
        able to talk to your contract using the commands in the loadWeb3
        function.
        <br />
        <br />
        <br />
        If you try to load this page before migrating your contract / Or your
        wallet is on the wrong network, you will see an error in the console.
      </p>
    </div>
  );
};

export default Home;
