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

// Scrolling text effect
const scrollText = document.getElementById('scrollText');
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const translateX = scrollPos * -200 + 100; // Move text right to left
    scrollText.style.transform = `translateX(${translateX}%)`;
});

// Highlight text on hover
document.querySelectorAll('nav a, .scrolling-text, .author-text').forEach(element => {
    element.addEventListener('mouseover', () => {
        element.style.color = 'white';
    });
    element.addEventListener('mouseout', () => {
        element.style.color = '#cccccc';
    });
});

document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const imgDisplay = document.getElementById('selectedImage');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imgDisplay.src = e.target.result;
            imgDisplay.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});


// You may also add JavaScript to process the uploaded image and get the OCR results
// Once you have the OCR result, update the result container
function updateResult(resultText) {
    document.getElementById('resultText').innerText = resultText;
}