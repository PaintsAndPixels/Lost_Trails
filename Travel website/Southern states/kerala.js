//togggle navigation menu for mobile
function togglenav(){
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
}
let images = document.querySelectorAll('.slider-img');
let currentImageIndex = 0;

function changeImage() {
    // Remove opacity from all images
    images.forEach((img, index) => {
        img.style.opacity = 0;
    });
    // Set opacity for the current image
    images[currentImageIndex].style.opacity = 1;
    // Move to the next image
    currentImageIndex = (currentImageIndex + 1) % images.length;
}

// Initial call to display the first image
changeImage();

// Change image every 4 seconds
setInterval(changeImage, 4000);