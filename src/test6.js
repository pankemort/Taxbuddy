const tesseract = require("node-tesseract-ocr");
const Jimp = require("jimp");

// Replace with your image file path
const imageFilePath = "1.png";

// Define regions of interest (ROIs) - Format: { left, top, width, height }
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
  // Add more ROIs as needed
];

// Sort ROIs based on left coordinate (x-axis)
const sortedRois = rois.sort((a, b) => a.left - b.left);

// Process each ROI in sorted order
sortedRois.forEach(async (roi, index) => {
  try {
    // Load the original image using Jimp
    const originalImage = await Jimp.read(imageFilePath);

    // Clone the image and crop to the specified ROI
    const croppedImage = originalImage.clone().crop(roi.left, roi.top, roi.width, roi.height);

    // Convert the cropped image to a buffer
    const croppedBuffer = await croppedImage.getBufferAsync(Jimp.MIME_PNG);

    // Perform OCR on the cropped image buffer
    const text = await tesseract.recognize(croppedBuffer, {
      lang: "eng",
      oem: 3,
      psm: 12,  // Assume a single uniform block of text
      binary: "/usr/bin/tesseract",
    });

    console.log(`Text for ROI ${index + 1}:`, text);
  } catch (error) {
    console.error(`Error processing ROI ${index + 1}:`, error.message);
  }
});
