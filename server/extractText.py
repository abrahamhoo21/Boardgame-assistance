import pytesseract as tess
from PIL import Image, ImageOps, ImageEnhance
import io
from fastapi import HTTPException
import logging


# Define the Tesseract path
tess.pytesseract.tesseract_cmd = r'C:\Users\abrah\AppData\Local\Programs\Tesseract-OCR\tesseract.exe'

def preprocess_image(image: Image.Image) -> Image.Image:
    """
    Preprocess the image for better OCR accuracy.
    - Convert to grayscale
    - Resize the image
    - Enhance contrast
    """
    # Convert image to grayscale
    image = ImageOps.grayscale(image)

    # Resize for better OCR
    image = image.resize((image.width * 2, image.height * 2))

    # Enhance contrast
    enhancer = ImageEnhance.Contrast(image)
    image = enhancer.enhance(2)  # Increase contrast

    return image

def extract_text_from_image(image_data: bytes) -> str:
    """
    Extracts text from an image using Tesseract OCR.
    Args: image_data (bytes): Raw binary data of the image.
    Returns:str: The extracted text from the image.

    """
    if not image_data:
        raise HTTPException(status_code=400, detail="No image data provided.")

    try:
        # Convert bytes to a PIL Image object
        image = Image.open(io.BytesIO(image_data))

        # Preprocess the image
        processed_image = preprocess_image(image)

        # Perform OCR using pytesseract
        text = tess.pytesseract.image_to_string(image)

        if not text.strip():
            raise ValueError("No text detected in the image.")

        logging.info("Text extraction successful")
        return text

    except Exception as e:
        logging.error(f"Error during text extraction: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")