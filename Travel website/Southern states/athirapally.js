// Smooth Scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Lightbox Modal
const lightboxLinks = document.querySelectorAll('.lightbox');
const modal = document.getElementById('lightbox-modal');
const modalImg = document.getElementById('lightbox-img');
const captionText = document.getElementById('caption');

// Open Lightbox on image click
lightboxLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        modal.style.display = "block";
        modalImg.src = this.href;
        captionText.innerHTML = this.querySelector('img').alt;
    });
});

// Close Modal
function closeModal() {
    modal.style.display = "none";
}

// Close Modal when clicking outside the image
modal.addEventListener('click', function (event) {
    if (event.target !== modalImg) {
        closeModal();
    }
});

// Toggle Mobile Nav Menu
function toggleNav() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
}
// search famous food
function searchFood() {
    const input = document.getElementById('food-search').value.toLowerCase();
    const foodItems = document.querySelectorAll('.gallery .description');

    foodItems.forEach(item => {
        if (item.innerText.toLowerCase().includes(input)) {
            item.parentElement.style.display = '';
        } else {
            item.parentElement.style.display = 'none';
        }
    });
}