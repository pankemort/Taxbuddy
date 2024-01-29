import React, { useContext, useState } from 'react';
import AuthContext from "../context/AuthProvider";
import axios from 'axios'; // Import Axios
// import {processROI,data,rois} from '../posting_extracted_data';
// import Jimp from 'jimp';
import 'jimp';
// import * as Jimp from 'jimp';
// import "jimp";
// import { Jimp as JimpType, JimpConstructors } from '@jimp/core';
// import 'jimp';
// import Jimp from "jimp/es";
import Tesseract, { createWorker } from 'tesseract.js/src';


const data = {
  text_roi_1: "employerNameAddress",
  text_roi_101: 'employeeName',
  text_roi_102: 'employeeAddress',
  text_roi_9: 'assesmentYr',
  text_roi_7: 'formName',
  text_roi_8: 'part',
  text_roi_5: 'panDeductor',
  text_roi_6: 'TanDeductor',
  text_roi_11: 'employeePan',
  text_roi_3: 'citTds',
  text_roi_121: 'empPeriodFrom',
  text_roi_122: 'empPeriodTo',
  text_roi_12: 'taxDeducted'
}

const rois = [
  { left: 32, top: 320, width: 500, height: 162 },
  { left: 540, top: 325, width: 488, height: 151 },
  { left: 536, top: 600, width: 235, height: 117 },
  { left: 438, top: 131, width: 176, height: 28 },
  { left: 468, top: 206, width: 113, height: 27 },
  { left: 94, top: 516, width: 169, height: 75 },
  { left: 330, top: 506, width: 169, height: 86 },
  { left: 540, top: 494, width: 174, height: 98 },
  { left: 53, top: 606, width: 448, height: 110 },
  { left: 793, top: 606, width: 215, height: 103 },
  { left: 68, top: 978, width: 920, height: 15 },
  { left: 45, top: 1374, width: 293, height: 18 },
];


const Upload = () => {
  const { Jimp } = window;
  // const { Tesseract } = window.tesseract;
  const { auth, setAuth } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');
  const YOUR_BEARER_TOKEN = auth;

  const handleFileChange = (event) => {
    // console.log(event.target.result);
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(selectedFile);
    // const formData = new FormData();
    // formData.append('image', selectedFile);

    try {
      setUploadProgress(0);
      setUploadStatus('Uploading...');
      console.log("Uploading");
      const sortedRois = rois.sort((a, b) => a.left - b.left);
      
      if (selectedFile) {
  console.log("File is present");

  var extractedData = {};
  try {
    const originalImage = await Jimp.read(URL.createObjectURL(selectedFile));
    const sortedRois = rois.sort((a, b) => a.left - b.left);

    for (let index = 0; index < rois.length; index++) {
      const roi = sortedRois[index];
      // const roi = rois[index];

      try {
        const croppedImage = originalImage.clone().crop(roi.left, roi.top, roi.width, roi.height);
        const croppedBuffer = await croppedImage.getBufferAsync(Jimp.MIME_PNG);
        // console.log(croppedBuffer);

        const worker = createWorker('eng')
        const ret = (await worker).recognize(croppedBuffer,{
          lang: "eng",
          oem: 3,
          psm: 12,
          binary: "/usr/bin/tesseract",

        })

        const result_text = (await ret).data.text

        extractedData[index] = result_text

                    
        // const text = await Tesseract.recognize(selectedFile, {
        //   lang: "eng",
        //   oem: 3,
        //   psm: 12,
        //   binary: "/usr/bin/tesseract",
        // });

        // Tesseract.recognize(selectedFile,{
        //   lang: "eng",
        //   oem: 3,
        //   psm: 12,
        //   binary: "/usr/bin/tesseract"
        // }).then(({data:{text}})=>{
        //   console.log(text);
        // })

        // console.log(`Text for ROI ${index + 1}:`, text);
      } catch (error) {
        console.error(`Error processing ROI ${index + 1}:`, error.message);
      }
    }
    console.log(extractedData);
        const REGISTER_URL = 'https://project-taxbuddy.onrender.com/addData';

                  const extractedDataObject = rois.reduce((acc, _, index) => {

                    // format form no and part
                    if(index == 6 || index == 7){
                      // remove the \n \f from the string
                      // const result = extractedData[index].slice(0,-2)
                      // acc[data[`text_roi_${index + 1}`]] = result
                      acc[data[`text_roi_${index + 1}`]] = extractedData[index]
                      return acc;
                    }
                    // seperate name and address
                    else if(index == 9){
                      const text = extractedData[index].split("\n").filter(line=>line.trim() !== '');
                      const name = text[1];
                      const address = text.slice(2).join(" ");
                      acc[data[`text_roi_${index+1}1`]] = name;
                      acc[data[`text_roi_${index+1}2`]] = address;
                      acc[data[`text_roi_${index+1}2`]] = extractedData[index];
                      return acc;

                    }
                    // seprating from to date
                    else if (index == 11){
                      var text = extractedData[index].split("\n").filter(line=>line.trim() !== '');
                      text = text.slice(3)
                      
                      
                      text = text.join(" ")
                      // console.log("-------------------------------\n\n"+text+  "\n\n---------------------------");
                      text = text.split(" ")
                      const from = text[0]
                      const to = text[1]
                      acc[data[`text_roi_${index+1}1`]] = from;
                      acc[data[`text_roi_${index+1}2`]] = to;
                      // acc[data[`text_roi_${index+1}1`]] = extractedData[index];
                      return acc;

                    }
                    else if (index == 10){
                      var text = extractedData[index].split("\n").filter(line=>line.trim() !== '');
                      const result = text[text.length-1]
                      // console.log("-------------------------------\n\n"+data[`text_roi_${index+1}`]+  "\n\n---------------------------"+result);
                      acc["employeePan"] = result
                     return acc;
                    }
                    else if (index == 3 ){
                      return acc
                    }
                    else if(index == 1){
                      return acc
                    }
                    else{
                      const text = extractedData[index];

                      // Split the text by newline and filter out empty strings
                      var lines = text.split('\n').filter(line => line.trim() !== '');
                      lines = lines.slice(1) 
                      
                      const result = lines.join(" ")
                      console.log(result);
                      
                      // acc[`text_roi_${index + 1}`] = extractedData[index];
                      acc[data[`text_roi_${index + 1}`]] = result
                      // acc[data[`text_roi_${index + 1}`]] = text
                      return acc;

                    }
                  }, {});


                  // delete extractedDataObject.text_roi_11
                  console.log(extractedDataObject)
                  extractedDataObject["taxDeducted"] = "98888.0"
                  console.log(YOUR_BEARER_TOKEN)
                  // Extract the text from the data object
                  // Send a POST request using axios with headers
                  axios.post(
                    REGISTER_URL,
                    extractedDataObject,
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${YOUR_BEARER_TOKEN.token}`,
                      },
                    }
                  )
                    .then((response) => {
                      console.log("Completed 1");
                      console.log(response.data);
                      console.log("Completed 2");
                      console.log(response.accessToken);
                      console.log("Completed 3");
                      console.log(response);
                      console.log("Completed 4");
                      // setSuccess(true);
                    })
                    .catch((error) => {
                      console.error('Error sending POST request:', error.message);
                      if (error.response) {
                        console.error('Response Status:', error.response.status);
                        console.error('Response Headers:', error.response.headers);
                        console.error('Response Data:', error.response.data);
                      }
                    });
  } catch (error) {
    console.error('Error loading image:', error.message);
  }

          // processROIs(imageBuffer)
          //       .then((extractedData) => {
          //         // Define the URL for the POST request
          //         // const REGISTER_URL = 'https://project-taxbuddy.onrender.com/addData';
          //         // console.log(URL.createObjectURL(selectedFile));
          //         const REGISTER_URL = 'http://localhost:3000/addData';

          //         // Create an object with the extracted text data
          //         const extractedDataObject = rois.reduce((acc, _, index) => {

          //           // format form no and part
          //           if(index == 3 || index == 4){
          //             // remove the \n \f from the string
          //             const result = extractedData[index].slice(0,-2)
          //             acc[data[`text_roi_${index + 1}`]] = result
          //             return acc;
          //           }
          //           // seperate name and address
          //           else if(index == 1){
          //             const text = extractedData[index].split("\n").filter(line=>line.trim() !== '');
          //             const name = text[1];
          //             const address = text.slice(2).join(" ");
          //             acc[data[`text_roi_${index+1}1`]] = name;
          //             acc[data[`text_roi_${index+1}2`]] = address;
          //             return acc;

          //           }
          //           // seprating from to date
          //           else if (index == 9){
          //             var text = extractedData[index].split("\n").filter(line=>line.trim() !== '');
          //             // text = text.slice(4)
                      
                      
          //             console.log("-------------------------------\n\n"+text+  "\n\n---------------------------");
          //             // text = text.split("From To ").slice(1)
          //             // text = text.join(" ")
          //             const from = text[4]
          //             const to = text[5]
          //             acc[data[`text_roi_${index+1}1`]] = from;
          //             acc[data[`text_roi_${index+1}2`]] = to;
          //             return acc;

          //           }
          //           // else if (index == 10){
          //           //  return acc[`text_roi_${index+1}`] = ""
          //           // }
          //           else{
          //             const text = extractedData[index];

          //             // Split the text by newline and filter out empty strings
          //             var lines = text.split('\n').filter(line => line.trim() !== '');
          //             lines = lines.slice(1) 

          //             const result = lines.join(" ")
          //             console.log(result);
          //             // acc[`text_roi_${index + 1}`] = extractedData[index];
          //             acc[data[`text_roi_${index + 1}`]] = result
          //             return acc;

          //           }
          //         }, {});
          //         delete extractedDataObject.text_roi_11
          //         console.log(extractedDataObject)
          //         // Extract the text from the data object
          //         // Send a POST request using axios with headers
          //         axios.post(
          //           REGISTER_URL,
          //           extractedDataObject,
          //           {
          //             headers: {
          //               'Content-Type': 'application/json',
          //               'Authorization': `Bearer ${YOUR_BEARER_TOKEN}`,
          //             },
          //           }
          //         )
          //           .then((response) => {
          //             console.log("Completed 1");
          //             console.log(response.data);
          //             console.log("Completed 2");
          //             console.log(response.accessToken);
          //             console.log("Completed 3");
          //             console.log(response);
          //             console.log("Completed 4");
          //             // setSuccess(true);
          //           })
          //           .catch((error) => {
          //             console.error('Error sending POST request:', error.message);
          //             if (error.response) {
          //               console.error('Response Status:', error.response.status);
          //               console.error('Response Headers:', error.response.headers);
          //               console.error('Response Data:', error.response.data);
          //             }
          //           });
                    
          //       })
          //       .catch((error) => {
          //         console.error('Error processing ROIs:', error.message);
          //       });

        // }

        // reader.readAsDataURL(selectedFile)
      }
    


      // const response = await axios.post('/api/upload-image', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     Authorization: `Bearer ${auth.token}`, // Include token in header
      //   },
      //   onUploadProgress: (progressEvent) => {
      //     setUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
      //   },
      // });

      // setUploadStatus('Upload successful!');
      // console.log(response.data); // Handle successful response

    } catch (error) {
      setUploadStatus('Upload failed.');
      console.error(error); // Handle errors
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {selectedFile && (
          <div className="file-preview">
            <img src={URL.createObjectURL(selectedFile)} alt="Selected Image" />
            <p>{selectedFile.name}</p>
          </div>
        )}
        <button type="submit" disabled={!selectedFile}>
          Upload Image
        </button>
        {uploadProgress > 0 && (
          <p>Upload progress: {uploadProgress}%</p>
        )}
        {uploadStatus && <p>{uploadStatus}</p>}
      </form>
    </div>
  );
};

export default Upload;
