/* eslint-disable */
const { create } = require("ipfs-http-client");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  path: "api/v0",
});

// THIS FUNCTION MUST BE CALLED WITH YOUR IMAGE 'FILE' BEING PASSED IN AS AN ARGUMENT
// I SUGGEST PASSING IN A BLOB OF THE FILE OR A DATA URI OBJECT OF AN IMAGE
export const uploadFileToIPFS = async (file) => {
  try {
    //1 ADD File to IPFS
    const url = await client.add(file);
    const uploadedImageUrl = `https://ipfs.infura.io/ipfs/${url?.path}`;

    //2 ADD Metadata to IPFS
    const metadata = {
      name: "example name",
      description: "example description",
      image: uploadedImageUrl,
    };
    const metadataRes = await client.add(JSON.stringify(metadata));
    const metaDataUrl = `https://ipfs.infura.io/ipfs/${metadataRes?.path}`;

    // IF YOU WISH TO PIN YOUR FILE HERE IS THE COMMAND
    // YOU WILL NEED TO ADD AN AUTH HEADER TO YOUR REQUEST IN ORDER TO PIN USING INFURA
    // AT TIME OF WRITING THIS (Sept 2021) THERE IS A BUG FOR USING PIN COMMAND FROM THE FRONT END
    //await client.pin.add(metadataRes?.path);

    //3 return image & metadata URLs and also the CID for each
    return {
      uploadedImageUrl,
      metaDataUrl,
      metaDataHashCID: metadataRes?.path,
      imageHashCID: url?.path,
    };
  } catch (e) {
    console.log("error uplaoding to IPFS", e);
  }
};
