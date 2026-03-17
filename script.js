// PUT YOUR REAL WHATSAPP NUMBER HERE (Country Code + Number, no + or spaces)
const WHATSAPP_NUMBER = "1234567890"; 

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Menu Logic ---
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const mobileNav = document.getElementById('mobile-nav');
    
    menuIcon.addEventListener('click', () => mobileNav.classList.add('active'));
    closeIcon.addEventListener('click', () => mobileNav.classList.remove('active'));
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileNav.classList.remove('active'));
    });

    // --- 2. Frosted Glass Header on Scroll ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 3. Scroll Fade-In Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Animates when 15% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    // --- 4. Order Form Submission ---
    document.getElementById('orderForm').addEventListener('submit', function(e) {
        e.preventDefault(); 
        const name = document.getElementById('name').value;
        const contact = document.getElementById('contact').value;
        const product = document.getElementById('product').value;
        const message = document.getElementById('message').value;

        let waMessage = `*New Inquiry from Petal & Resin*%0A%0A*Name:* ${name}%0A*Contact:* ${contact}%0A`;
        if(product) waMessage += `*Product:* ${product}%0A`;
        if(message) waMessage += `*Message:* ${message}%0A`;

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`, '_blank');
    });

    // --- 5. Auto-Play Slider ---
    // Start sliding every 3 seconds
    setInterval(() => {
        moveSlide(1); 
    }, 3000); 

    // Initial calculation and screen resize handling
    updateCarousel();
    window.addEventListener('resize', updateCarousel);
});

// --- Image Slider (Carousel) Functions ---
let currentSlideIndex = 0;

function moveSlide(direction) {
    const cards = document.querySelectorAll('.card');
    if (cards.length === 0) return;

    let visibleCards = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    const maxIndex = cards.length - visibleCards;

    currentSlideIndex += direction;

    if (currentSlideIndex > maxIndex) {
        currentSlideIndex = 0; // Loop to start
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = maxIndex; // Loop to end
    }

    updateCarousel();
}

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const cards = document.querySelectorAll('.card');
    if(cards.length === 0) return;
    
    const cardWidth = cards[0].offsetWidth;
    track.style.transform = `translateX(-${currentSlideIndex * cardWidth}px)`;
}

// --- Form Pre-fill & Scroll ---
function selectProduct(productName) {
    const productInput = document.getElementById('product');
    productInput.value = productName;
    
    productInput.style.backgroundColor = "#fae8ea"; // Soft rose flash
    setTimeout(() => {
        productInput.style.backgroundColor = "#fcfcfc"; 
    }, 1000);

    document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
}

function directWhatsApp() {
    const defaultMessage = "Hello Petal & Resin, I would like to inquire about your handcrafted art.";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultMessage)}`, '_blank');
}
