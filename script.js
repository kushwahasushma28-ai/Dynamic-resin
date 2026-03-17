const WHATSAPP_NUMBER = "1234567890"; // Put your actual WhatsApp number here

// Carousel Variables
let currentSlideIndex = 0;
let autoPlayInterval;

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Logic ---
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const mobileNav = document.getElementById('mobile-nav');
    const navLinks = mobileNav.querySelectorAll('a');

    menuIcon.addEventListener('click', () => mobileNav.classList.add('active'));
    closeIcon.addEventListener('click', () => mobileNav.classList.remove('active'));
    navLinks.forEach(link => link.addEventListener('click', () => mobileNav.classList.remove('active')));

    // --- Order Form Logic ---
    document.getElementById('orderForm').addEventListener('submit', function(e) {
        e.preventDefault(); 
        const name = document.getElementById('name').value;
        const contact = document.getElementById('contact').value;
        const product = document.getElementById('product').value;
        const message = document.getElementById('message').value;

        let waMessage = `*New Inquiry from Petal & Resin Website*%0A%0A*Name:* ${name}%0A*Contact:* ${contact}%0A`;
        if(product) waMessage += `*Product:* ${product}%0A`;
        if(message) waMessage += `*Message:* ${message}%0A`;

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`, '_blank');
    });

    // --- Auto-Play Carousel Initialization ---
    startAutoPlay();
    // Re-calculate carousel sizing if the user rotates their phone or resizes browser
    window.addEventListener('resize', updateCarousel);

    // --- NEW: Pause on Hover / Touch Logic ---
    const carouselContainer = document.getElementById('carouselContainer');
    if (carouselContainer) {
        // Desktop: Pause when mouse enters, resume when mouse leaves
        carouselContainer.addEventListener('mouseenter', pauseAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
        
        // Mobile: Pause when touching the screen, resume when finger is lifted
        carouselContainer.addEventListener('touchstart', pauseAutoPlay);
        carouselContainer.addEventListener('touchend', startAutoPlay);
    }
});

// --- Image Slider (Carousel) Logic ---
function moveSlide(direction) {
    const track = document.getElementById('carouselTrack');
    const cards = document.querySelectorAll('.card');
    if (cards.length === 0) return;
    
    // Determine how many cards are visible based on screen size
    let visibleCards = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    
    // Calculate the maximum number of times we can slide
    const maxIndex = cards.length - visibleCards;

    currentSlideIndex += direction;

    // Loop back to start or end if we go out of bounds
    if (currentSlideIndex > maxIndex) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = maxIndex;
    }

    updateCarousel();
    
    // Reset the auto-play timer so it doesn't double-slide right after user clicks an arrow
    startAutoPlay(); 
}

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const cards = document.querySelectorAll('.card');
    if(cards.length === 0 || !track) return;
    
    // Calculate width of one card to know how far to slide
    const cardWidth = cards[0].offsetWidth;
    
    // Apply the sliding effect
    track.style.transform = `translateX(-${currentSlideIndex * cardWidth}px)`;
}

// Start or restart the automatic sliding
function startAutoPlay() {
    // Clear any existing timer first to prevent duplicates
    pauseAutoPlay(); 
    // Slide every 3000 milliseconds (3 seconds)
    autoPlayInterval = setInterval(() => {
        moveSlide(1);
    }, 3000);
}

// Pause the automatic sliding
function pauseAutoPlay() {
    clearInterval(autoPlayInterval);
}

// --- Pre-fill Form Logic ---
function selectProduct(productName) {
    const productInput = document.getElementById('product');
    productInput.value = productName;
    productInput.style.backgroundColor = "#fae8ea"; // Soft rose flash
    setTimeout(() => productInput.style.backgroundColor = "#fcfcfc", 1000);
    document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
}

// --- Direct WhatsApp Link ---
function directWhatsApp() {
    const defaultMessage = "Hello Petal & Resin, I would like to inquire about your handcrafted art.";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultMessage)}`, '_blank');
}
