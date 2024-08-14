from flask import Flask, render_template, redirect, request, url_for, flash, send_from_directory
from PIL import Image
import pytesseract
from io import BytesIO
import os
from dotenv import load_dotenv

app = Flask(__name__)
load_dotenv()

app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.secret_key = os.getenv('SECRET_KEY', 'default_secret_key')

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

@app.route('/', methods=['GET', 'POST'])
def home():
    extracted_text = None
    image_url = None

    if request.method == 'POST':
        file = request.files.get('image')
        if not file:
            flash('No file part. Please upload an image.')
            return redirect(request.url)

        if file.filename == '':
            flash('No selected file. Please select an image to upload.')
            return redirect(request.url)

        if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
            flash('Invalid image file format. Please upload a valid image.')
            return redirect(request.url)

        try:
            # Open image file using BytesIO
            image = Image.open(BytesIO(file.read()))
            extracted_text = perform_OCR(image)
            
            # Save the image
            image_filename = file.filename
            image.save(os.path.join(app.config['UPLOAD_FOLDER'], image_filename))
            image_url = url_for('uploaded_file', filename=image_filename)
            
        except Exception as e:
            flash(f'An error occurred while processing the file: {e}')
            print(f"Error: {e}")
            return redirect(request.url)

    print(f"Image URL: {image_url}")  # For debugging

    return render_template('home_page.html', extracted_text=extracted_text, image_url=image_url)

def perform_OCR(image):
    try:
        extracted_text = pytesseract.image_to_string(image)
    except Exception as e:
        extracted_text = f"Error processing image: {e}"
    return extracted_text

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)
