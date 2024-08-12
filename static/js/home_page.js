document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    }

    // Get all floating images
    const images = document.querySelectorAll('.floating-images img');

    images.forEach(img => {
        const rect = img.getBoundingClientRect();
        const imgX = rect.left + rect.width / 2;
        const imgY = rect.top + rect.height / 2;
        const distance = Math.sqrt(Math.pow(e.clientX - imgX, 2) + Math.pow(e.clientY - imgY, 2));

        // Adjust the radius as needed
        const radius = 50; // Adjust the radius based on the bubble size

        if (distance < radius) {
            img.classList.add('active');
        } else {
            img.classList.remove('active');
        }
    });
});

// Handle scroll effect for scrolling texts
const scrollText = document.getElementById('scrollText');
const scrollText2 = document.getElementById('scrollText2');

window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

    // Move .scrolling-text from left to right
    const translateXText = scrollPos * 340 - 100; // Adjust values as needed
    scrollText.style.transform = `translateX(${translateXText}%)`;

    // Move .scrolling-text2 from right to left
    const translateXText2 = -scrollPos * 250 + 100; // Adjust values as needed
    scrollText2.style.transform = `translateX(${translateXText2}%)`;
});

document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const imgDisplay = document.getElementById('uploadedImage');
    const imgDisplayBox = document.querySelector('.image-display-box');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imgDisplay.src = e.target.result;
            imgDisplay.style.display = 'block';

            imgDisplay.onload = function() {
                const colorThief = new ColorThief();
                const dominantColor = colorThief.getColor(imgDisplay);
                imgDisplayBox.style.borderColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
                
                // Adjust the display box size
                if (imgDisplay.naturalWidth > imgDisplay.naturalHeight) {
                    imgDisplayBox.style.width = '400px';
                    imgDisplayBox.style.height = '250px';
                } else {
                    imgDisplayBox.style.width = '250px';
                    imgDisplayBox.style.height = '400px';
                }
            };
        };
        reader.readAsDataURL(file);
    }
});


// You may also add JavaScript to process the uploaded image and get the OCR results
// Once you have the OCR result, update the result container
function updateResult(resultText) {
    document.getElementById('resultText').innerText = resultText;
}

document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(this);

    fetch('/upload-endpoint', { // Replace with your actual endpoint
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const imgDisplayBox = document.getElementById('imageDisplayBox');
            imgDisplayBox.innerHTML = `<img src="${data.imageUrl}" alt="Uploaded Image">`;
            document.getElementById('translatedTextContent').innerText = data.translatedText;
        } else {
            alert('Failed to process image');
        }
    })
    .catch(error => console.error('Error:', error));
});