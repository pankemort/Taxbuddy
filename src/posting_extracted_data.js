// const tesseract = require("node-tesseract-ocr");
// const Jimp = require("jimp");
// const axios = require("axios");
import Tesseract from "tesseract.js";
import Jimp from "jimp";

// import { Axios } from "axios";

const imageFilePath = "1.png";

const data = {
  text_roi_1: "employerNameAddress",
  text_roi_21: 'employeeName',
  text_roi_22: 'employeeAddress',
  text_roi_3: 'assesmentYr',
  text_roi_4: 'formName',
  text_roi_5: 'part',
  text_roi_6: 'panDeductor',
  text_roi_7: 'TanDeductor',
  text_roi_8: 'employeePan',
  text_roi_9: 'citTds',
  text_roi_101: 'empPeriodFrom',
  text_roi_102: 'empPeriodTo',
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

// Placeholder for your Bearer Token
const YOUR_BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YThjNzFhYmE0NGY2NWUyYzE3OGRmNCIsIm5hbWUiOiJTYWNoaW4iLCJpYXQiOjE3MDY0NDM5OTV9.oq72NtGJCRz0Lo8BGXYE4odOp3nO88rrEE-ez1MBCwQ';

// Define an async function to encapsulate the asynchronous operations
const processROI = async (roi, index,img) => {
  try {
    // const originalImage = await Jimp.read(imageFilePath);
    // const originalImage = await Jimp.read(Buffer.from(img));
    console.log(img);
    // const imageBuffer = await imageObjectToBuffer(imageObject);
    // const img_buffer = await img.arrayBuffer();
    const originalImage = await Jimp.read(img);
    const croppedImage = originalImage.clone().crop(roi.left, roi.top, roi.width, roi.height);
    // await croppedImage.writeAsync(`cropped_roi_${index + 1}.png`);
    const croppedBuffer = await croppedImage.getBufferAsync(Jimp.MIME_PNG);
    const text = await Tesseract.recognize(croppedBuffer, {
      lang: "eng",
      oem: 3,
      psm: 12,
      binary: "/usr/bin/tesseract",
    });

    console.log(`Text for ROI ${index + 1}:`, text);
    return text;
  } catch (error) {
    console.error(`Error processing ROI ${index + 1}:`, error.message);
    return null;
  }
};

// Define an async function to process all ROIs
const processROIs = async (imgpath) => {
  const texts = await Promise.all(rois.map((roi, index) => processROI(roi, index,imgpath)));
  return texts;
};

// Call the async function to process all ROIs
// processROIs()
//   .then((extractedData) => {
//     // Define the URL for the POST request
//     // const REGISTER_URL = 'https://project-taxbuddy.onrender.com/addData';
//     const REGISTER_URL = 'http://localhost:3000/addData';

//     // Create an object with the extracted text data
//     const extractedDataObject = rois.reduce((acc, _, index) => {

//       // format form no and part
//       if(index == 3 || index == 4){
//         // remove the \n \f from the string
//         const result = extractedData[index].slice(0,-2)
//         acc[data[`text_roi_${index + 1}`]] = result
//         return acc;
//       }
//       // seperate name and address
//       else if(index == 1){
//         const text = extractedData[index].split("\n").filter(line=>line.trim() !== '');
//         const name = text[1];
//         const address = text.slice(2).join(" ");
//         acc[data[`text_roi_${index+1}1`]] = name;
//         acc[data[`text_roi_${index+1}2`]] = address;
//         return acc;

//       }
//       // seprating from to date
//       else if (index == 9){
//         var text = extractedData[index].split("\n").filter(line=>line.trim() !== '');
//         // text = text.slice(4)
        
        
//         console.log("-------------------------------\n\n"+text+  "\n\n---------------------------");
//         // text = text.split("From To ").slice(1)
//         // text = text.join(" ")
//         const from = text[4]
//         const to = text[5]
//         acc[data[`text_roi_${index+1}1`]] = from;
//         acc[data[`text_roi_${index+1}2`]] = to;
//         return acc;

//       }
//       // else if (index == 10){
//       //  return acc[`text_roi_${index+1}`] = ""
//       // }
//       else{
//         const text = extractedData[index];

//         // Split the text by newline and filter out empty strings
//         var lines = text.split('\n').filter(line => line.trim() !== '');
//         lines = lines.slice(1) 

//         const result = lines.join(" ")
//         console.log(result);
//         // acc[`text_roi_${index + 1}`] = extractedData[index];
//         acc[data[`text_roi_${index + 1}`]] = result
//         return acc;

//       }
//     }, {});
//     delete extractedDataObject.text_roi_11
//     console.log(extractedDataObject)
//     // Extract the text from the data object
//     // Send a POST request using axios with headers
//     axios.post(
//       REGISTER_URL,
//       extractedDataObject,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${YOUR_BEARER_TOKEN}`,
//         },
//       }
//     )
//       .then((response) => {
//         console.log("Completed 1");
//         console.log(response.data);
//         console.log("Completed 2");
//         console.log(response.accessToken);
//         console.log("Completed 3");
//         console.log(response);
//         console.log("Completed 4");
//         setSuccess(true);
//       })
//       .catch((error) => {
//         console.error('Error sending POST request:', error.message);
//         if (error.response) {
//           console.error('Response Status:', error.response.status);
//           console.error('Response Headers:', error.response.headers);
//           console.error('Response Data:', error.response.data);
//         }
//       });
      
//   })
//   .catch((error) => {
//     console.error('Error processing ROIs:', error.message);
//   });
export {processROI,data,rois};