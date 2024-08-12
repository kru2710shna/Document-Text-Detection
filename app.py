from flask import Flask, render_template , redirect, request, jsonify
from PIL import Image
import pytesseract


app = Flask(__name__)
@app.route('/', methods=['GET', 'POST'])
def home():
    extracted_text = None
    if request.method == 'POST':
        print("Form submitted!")
        if 'file' not in request.files:
            print("No file part")
            return redirect(request.url)

        file = request.files['file']
        print(f"File received: {file.filename}")
        if file.filename == '':
            print("No selected file")
            return redirect(request.url)
        if file:
            image_path = 'static/Uploads/' + file.filename
            print(f"Saving file to: {image_path}")
            file.save(image_path)
            extracted_text = perform_OCR(image_path)
            print(f"Extracted Text: {extracted_text}")

    return render_template('home_page.html', extracted_text=extracted_text)


@app.route('/upload-endpoint', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify(success=False, error="No image uploaded"), 400

    image = request.files['image']
    image_path = 'static/Uploads/' + image.filename
    image.save(image_path)

    img = Image.open(image_path)
    extracted_text = pytesseract.image_to_string(img)

    return jsonify(success=True, translatedText=extracted_text, imageUrl=image_path)


@app.route('/about')
def about():
    return render_template('about.html')   

def perform_OCR(image_path):
    image = Image.open(image_path)
    extracted_text = pytesseract.image_to_string(image)
    return extracted_text

if __name__ == '__main__':
    app.run(debug=True)