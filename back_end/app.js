const express = require('express');
const multer = require('multer');
const cv = require('opencv4js');

const app = express();

const upload = multer({ dest: 'uploads/' }); // Specify a directory for uploaded images

app.post('/extract-sudoku', upload.single('image'), async (req, res) => {
    try {
      // Load the uploaded image
      const image = await cv.imreadAsync(req.file.path);
  
      // Preprocess the image (e.g., grayscale conversion, thresholding)
      const processedImage = await cv.cvtColorAsync(image, cv.COLOR_BGR2GRAY);
      const thresholdedImage = await cv.thresholdAsync(processedImage, 0, 255, cv.THRESH_BINARY);
  
      // Detect contours (potential Sudoku cells)
      const contours = await cv.findContoursAsync(thresholdedImage, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
  
      // Extract and parse Sudoku cells
      const sudokuBoard = extractSudokuBoard(contours);
  
      // Return the extracted 2D array
      res.json(sudokuBoard);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error extracting Sudoku board');
    }
  });

  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
  