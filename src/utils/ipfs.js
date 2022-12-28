/* eslint-disable */
const { create } = require("ipfs-http-client");

const projectId = "YOUR_INFURA_IPFS_PROJECT_ID";
const projectSecret = "YOUR_INFURA_IPFS_PROJECT_SECRET";

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

// THIS FUNCTION REQURIES A BASE64 IMAGE TO BE PASSED IN. ( BETTER TO SEND AN IMAGE BUFFER IN PRODUCTION )
const uploadFileToIPFS = async (file) => {
  try {
    //1 ADD IMAGE File to IPFS
    const url = await client.add(file);
    const uploadedImageUrl = `https://ipfs.io/ipfs/${url?.path}`;

    //2 ADD Metadata File to IPFS
    const metadata = {
      name: "Boilerplate example name",
      description: "Boilerplate example description",
      image: uploadedImageUrl,
    };
    const metadataRes = await client.add(JSON.stringify(metadata));
    const metaDataUrl = `https://ipfs.io/ipfs/${metadataRes?.path}`;

    //3 Return image & metadata URLs and also the CID for each
    const ipfsData = {
      uploadedImageUrl,
      metaDataUrl,
      metaDataHashCID: metadataRes?.path,
      imageHashCID: url?.path,
    };

    console.log(ipfsData);
    return ipfsData;
  } catch (e) {
    console.log("error uploading to IPFS", e);
  }
};

//*
// This block allows us to call the IPFS function with a base64 string ... to demostrate manually how it works
(async () => {
  const YOUR_BASE_64 = "";
  const exampleBase64 = `data:image/jpeg;base64,${YOUR_BASE_64}`;

  await uploadFileToIPFS(exampleBase64);
})();
// */
