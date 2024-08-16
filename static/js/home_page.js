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

document.addEventListener('DOMContentLoaded', function() {
    const imageInput = document.getElementById('imageInput');
    const newImageButton = document.getElementById('newImageButton');
    const translatedTextContent = document.getElementById('translatedTextContent');

    if (!imageInput || !newImageButton || !translatedTextContent) {
        console.error("Required elements not found.");
        return;
    }

    imageInput.addEventListener('change', function(event) {
        handleImageUpload(event);
    });

    function handleImageUpload(event) {
        const file = event.target.files[0];
    
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
    
            // Display the selected image in the image-display-box
            const imageDisplayBox = document.getElementById('imageDisplayBox');
            const imgElement = document.createElement('img');
            imgElement.src = URL.createObjectURL(file);
            imgElement.alt = "Uploaded Image";
            imgElement.id = "uploadedImage";
            imgElement.style.maxWidth = "100%";
            imgElement.style.maxHeight = "300px";
            imageDisplayBox.innerHTML = '';  // Clear previous image if any
            imageDisplayBox.appendChild(imgElement);
    
            console.log("Image ready to be sent for OCR processing.");
        } else {
            console.error("No file selected.");
        }
    }

    newImageButton.addEventListener('click', function() {
        // Clear the extracted text content
        translatedTextContent.innerHTML = '';

        // Clear the uploaded image
        const imageDisplayBox = document.getElementById('imageDisplayBox');
        imageDisplayBox.innerHTML = '';

        // Reload the page to start a new session
        window.location.reload();
    });
});