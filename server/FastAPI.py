from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from extractText import extract_text_from_image
import logging

app = FastAPI()

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Add the frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.post("/extract-text/")
async def extract_text(file: UploadFile = File(...)):
    #Endpoint to extract text from an uploaded image file.
    logging.info(f"Received file: {file.filename}")

    # Validate file type
    if not file.filename.endswith(('.png', '.jpg', '.jpeg')):
        raise HTTPException(status_code=400, detail="Unsupported file type. Please upload a PNG or JPG image.")

    try:
        # Read the uploaded file
        file_bytes = await file.read()
        logger.info(f"Received file: {file.filename}, size: {len(file_bytes)} bytes")

        # Call the function to extract text from the image
        extracted_text = extract_text_from_image(file_bytes)
        if not extracted_text.strip():
            raise ValueError("No text detected in the image.")
        logging.info("Text extraction successful")
        return {"text": extracted_text}


    except ValueError as ve:
        logger.error(f"ValueError: {str(ve)}")
        raise HTTPException(status_code=400, detail=str(ve))

    except Exception as e:
        logger.error(f"Error processing file: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while processing the image.")