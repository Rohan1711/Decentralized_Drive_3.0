// const axios = require('axios')
// const FormData = require('form-data')
// const fs = require('fs')
// const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwYjE2NzdlZS00MmFkLTQ4OTQtOTNkNS01ODNmZDQ5NGY3ODYiLCJlbWFpbCI6InJvaGFua2FrYXJlQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyOGQwNDFlMjhmODQxODZhMjBhMyIsInNjb3BlZEtleVNlY3JldCI6ImI2M2IyNjhlNDM1NzYxZjU4NTlmMGU1NjBiNGEyNWYyOTk2N2Y4YjBmZTQ3MmJhYjU5NzM4ZWJlMTE3ZDIyZWMiLCJpYXQiOjE3MDM1MTkxOTd9.Xuuq_oO46NoupjnpAdhuVI_5BD-FeY14bzLEeLD8aec'


// const pinFileToIPFS = async () => {
//   const formData = new FormData();
//   const src = "path/to/file.png";
  
//   const file = fs.createReadStream(src)
//   formData.append('file', file)
  
//   const pinataMetadata = JSON.stringify({
//     name: 'File name',
//   });
//   formData.append('pinataMetadata', pinataMetadata);
  
//   const pinataOptions = JSON.stringify({
//     cidVersion: 0,
//   })
//   formData.append('pinataOptions', pinataOptions);

//   try{
//     const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
//       maxBodyLength: "Infinity",
//       headers: {
//         'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
//         'Authorization': `Bearer ${JWT}`
//       }
//     });
//     console.log(res.data);
//   } catch (error) {
//     console.log(error);
//   }
// }

// pinFileToIPFS()


import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
// const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwYjE2NzdlZS00MmFkLTQ4OTQtOTNkNS01ODNmZDQ5NGY3ODYiLCJlbWFpbCI6InJvaGFua2FrYXJlQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyOGQwNDFlMjhmODQxODZhMjBhMyIsInNjb3BlZEtleVNlY3JldCI6ImI2M2IyNjhlNDM1NzYxZjU4NTlmMGU1NjBiNGEyNWYyOTk2N2Y4YjBmZTQ3MmJhYjU5NzM4ZWJlMTE3ZDIyZWMiLCJpYXQiOjE3MDM1MTkxOTd9.Xuuq_oO46NoupjnpAdhuVI_5BD-FeY14bzLEeLD8aec';
const FormData = require('form-data');
const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      // try{
      //   const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", FormData, {
      //     maxBodyLength: "Infinity",
      //     headers: {
      //       'Content-Type': `multipart/form-data; boundary=${FormData._boundary}`,
      //       Authorization: JWT
      //     }
      //   });
      //   console.log(res.data);
      // } catch (error) {
      //   console.log(error);
      // }

      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `351637f08c574c0ee31c`,
            pinata_secret_api_key: `4eb6e199ed5124ac44732b3508fd88ffd776fae46646d6b7dc8fc1da783b9847`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        contract.add(account,ImgHash);
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
  
};
export default FileUpload;