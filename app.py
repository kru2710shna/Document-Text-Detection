from flask import Flask, render_template, request, redirect, url_for, flash , send_from_directory
from PIL import Image
import pytesseract
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Change this to a real secret key

# Ensure the upload folder exists
UPLOAD_FOLDER = 'static/uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def home():
    return render_template('home_page.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        flash('No file part.')
        return redirect(request.url)

    file = request.files['file']

    if file.filename == '':
        flash('No selected file.')
        return redirect(request.url)

    if file:
        # Save the uploaded image
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(image_path)
        
        try:
            # Perform OCR using Tesseract
            extracted_text = perform_ocr(image_path)
            return render_template('home_page.html', extracted_text=extracted_text, image_path=url_for('uploaded_file', filename=file.filename))
        except Exception as e:
            flash(f'An error occurred: {e}')
            return redirect(request.url)

def perform_ocr(image_path):
    try:
        # Open the image using Pillow
        image = Image.open(image_path)
        # Perform OCR using pytesseract
        extracted_text = pytesseract.image_to_string(image)
    except Exception as e:
        extracted_text = f"Error processing image: {e}"
    return extracted_text

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)