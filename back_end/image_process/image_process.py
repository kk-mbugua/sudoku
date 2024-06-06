import cv2
import numpy as np


def load_image(image_path):
  """Loads an image from the specified path."""
  try:
    image = cv2.imread(image_path)
    if image is None:
      raise Exception("Failed to load image!")
    return image
  except Exception as e:
    print(f"Error loading image: {e}")
    return None

def grayscale(image):
  """Converts an image to grayscale."""
  return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

def show_image(image, window_name="Image"):
  """Displays an image in a window."""
  cv2.imshow(window_name, image)
  cv2.waitKey(0)  # Wait for a key press to close the window
  cv2.destroyAllWindows()

def get_image_dimensions(image):
  """Returns the height and width of an image."""
  if image is not None:
    return image.shape[:2]  # Get height and width from the first two elements of the shape
  else:
    return (0, 0)

def analyze_colors(image):
  """Analyzes the color distribution in an image (basic example)."""
  if image is not None:
    # Convert image to HSV color space for better color analysis
    hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    # Calculate color histograms (distribution of colors)
    # ... (more complex color analysis can be done here)
    print("Image has a variety of colors!")
  else:
    print("No image to analyze colors for!")


def detect_sudoku_grid(gray_image):
  # Apply thresholding to create a binary image
  thresh = cv2.adaptiveThreshold(gray_image, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 11, 2)

  # Find contours in the binary image
  contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

  # Find the largest contour with an aspect ratio close to 1:1
  sudoku_grid = None
  for cnt in contours:
    approx = cv2.approxPolyDP(cnt, 0.01 * cv2.arcLength(cnt, True), True)
    if len(approx) == 4:  # Check if it has 4 corners (rectangle)
      x, y, w, h = cv2.boundingRect(cnt)
      aspect_ratio = abs(w / h)
      if (sudoku_grid is None or w * h > sudoku_grid[2]) and 0.8 < aspect_ratio < 1.2:
        sudoku_grid = (x, y, w, h)

  return sudoku_grid

  # ... rest of your code

  if image is not None:
    # ... (Convert to grayscale)
    gray_image = grayscale(image)

    # Detect the Sudoku grid using thresholding and contours
    sudoku_grid = detect_sudoku_grid(gray_image)

    if sudoku_grid is not None:
      x, y, w, h = sudoku_grid
      # Draw a rectangle around the detected grid
      cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
      show_image(image, "Sudoku Grid Detected")
    else:
      print("Sudoku grid not found in the image!")



if __name__ == "__main__":
    # Replace 'path/to/your/image.jpg' with the actual path to your image
    image_path = '/Users/work/Desktop/image3.jpeg'

    # Load the image
    image = load_image(image_path)

    # Check if image loaded successfully
    if image is not None:
    # Convert to grayscale (optional)
        gray_image = grayscale(image)

        # Get image dimensions
        height, width = get_image_dimensions(image)
        print(f"Image dimensions: {height}x{width}")

        # Analyze colors (basic example)
        analyze_colors(image)

        # Display the original and grayscale images (optional)
        show_image(image, "Original Image")
        show_image(gray_image, "Grayscale Image")

        sudoku_grid = detect_sudoku_grid(gray_image)

        if sudoku_grid is not None:
          x, y, w, h = sudoku_grid
          # Draw a rectangle around the detected grid
          cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
          show_image(image, "Sudoku Grid Detected")
        else:
          # TODO: handle the error
          print("No Sudoku grid detected")

