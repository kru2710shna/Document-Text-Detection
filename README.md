# Document-Text-Detection

### Current Version: 0.0.1

### Parent Company: IdontKnow

### Product: IdontknowDocument

### Deployment Platform: Render 

### Project Overview

The **Document-Text-Detection** project is a sophisticated application designed to detect and extract text from documents and images using advanced machine learning and deep learning algorithms. This project is focused on ensuring user privacy while providing accurate and efficient text extraction services.

### Technologies Used

- **Programming Language**: Python
- **Data Analysis**: NumPy, Matplotlib
- **Exploratory Data Analysis (EDA)**: Performed to understand image characteristics and text distribution.
- **Machine Learning & Deep Learning**: Implemented using Scikit-learn, OpenCV, and Tesseract.
- **Model Evaluation**: Scikit-learn metrics
- **Backend**: Flask
- **Deployment**: Render with Gunicorn as WSGI server
- **Text Detection Tools**: OpenCV, Pillow, Tesseract
- **Website Development**: HTML, CSS, JavaScript

### Project Workflow

1. **Data Collection**: Acquired various document and image datasets for training and testing.
2. **Data Cleaning and Preprocessing**:
   - **Image Formatting**: Adjusted image sizes and formats for consistency.
   - **Noise Reduction**: Applied filters to reduce image noise.
   - **Contour and Bounding Box Development**: Used dynamic bounding boxes to isolate text regions.
   - **Shadow and Ink Wrapping**: Processed images to handle ink wrapping and shadow effects.
   - **Image Combination**: Merged multiple images when necessary.
   - **Binarization**: Converted images to binary format for better text recognition.
3. **Model Building**: Employed deep learning algorithms to develop models capable of recognizing and extracting text from images.
4. **Model Evaluation**: Assessed model performance using appropriate metrics to ensure high accuracy.
5. **Deployment**: The model was deployed on Google Cloud Platform using Flask for the backend and Gunicorn as the WSGI server.

### Features

- **User Privacy Protection**: Ensures that all shared images and documents remain confidential and are not stored permanently.
- **Text Extraction**: Converts uploaded images or documents into text, which is then displayed to the user.
- **Technology Stack**:
  - **Flask**: Backend framework for handling HTTP requests and rendering the UI.
  - **Gunicorn**: WSGI server for running Flask applications.
  - **Tesseract**: OCR tool used for text detection.
  - **OpenCV & Pillow**: Used for image processing tasks.

### Installation

To set up the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/Document-Text-Detection.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Document-Text-Detection
    ```
3. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4. Run the application:
    ```bash
    flask run
    ```
5. Access the application locally:
    ```bash
    http://localhost:5000
    ```

### Requirements

Below is the list of dependencies required to run the project:

```plaintext
Flask==3.0.3
Flask-Cors==4.0.1
fonttools==4.53.0
gunicorn==22.0.0
pytesseract==0.3.13
Jinja2==3.1.4
matplotlib==3.7.5
numpy==1.24.4
pip==24.0
setuptools==70.3.0
wheel==0.43.0
python-dotenv==1.0.0
