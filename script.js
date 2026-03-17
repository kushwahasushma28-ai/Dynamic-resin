// PUT YOUR REAL WHATSAPP NUMBER HERE (Country Code + Number, no + or spaces)
const WHATSAPP_NUMBER = "1234567890"; 

// --- Auto-Play Timer Variables ---
let currentSlideIndex = 0;
let autoPlayTimer; 

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

    // --- 2. Header Opacity/Blur on Scroll ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 3. Scroll Animations ---
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section, .slide-in-left, .slide-in-right').forEach(section => {
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

    // --- 5. Auto-Play Slider with Hover/Touch Pause ---
    const carouselContainer = document.getElementById('carouselContainer');
    
    // Start sliding initially
    startAutoPlay();
    updateCarousel();
    window.addEventListener('resize', updateCarousel);

    // Pause when mouse enters or finger touches
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('touchstart', stopAutoPlay);

    // Resume when mouse leaves or finger is removed
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
    carouselContainer.addEventListener('touchend', startAutoPlay);

    // --- 6. Make Gallery Images Clickable for Lightbox ---
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        const img = card.querySelector('img');
        img.addEventListener('click', () => {
            openLightbox(index);
        });
    });
});

// --- Image Slider Functions ---
function startAutoPlay() {
    // Clear any existing timer first to prevent duplicates
    stopAutoPlay();
    autoPlayTimer = setInterval(() => {
        moveSlide(1); 
    }, 3000); // Slides every 3 seconds
}

function stopAutoPlay() {
    clearInterval(autoPlayTimer);
}

function moveSlide(direction) {
    const cards = document.querySelectorAll('.card');
    if (cards.length === 0) return;

    let visibleCards = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    const maxIndex = cards.length - visibleCards;

    currentSlideIndex += direction;

    if (currentSlideIndex > maxIndex) {
        currentSlideIndex = 0; 
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = maxIndex; 
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

// --- FULLSCREEN LIGHTBOX FUNCTIONS ---
let currentLightboxIndex = 0;

function openLightbox(index) {
    stopAutoPlay(); // Pause the background slider
    currentLightboxIndex = index;
    
    const cardsList = document.querySelectorAll('.card');
    if(cardsList.length === 0) return;
    
    const targetCard = cardsList[currentLightboxIndex];
    const imgSrc = targetCard.querySelector('img').src;
    const imgAlt = targetCard.querySelector('img').alt;

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    lightbox.style.display = "block";
    lightboxImg.src = imgSrc;
    lightboxCaption.innerHTML = imgAlt;
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = "none";
    startAutoPlay(); // Resume the background slider when closed
}

function changeLightboxImage(direction) {
    const cardsList = document.querySelectorAll('.card');
    currentLightboxIndex += direction;
    
    // Loop around the lightbox images
    if (currentLightboxIndex >= cardsList.length) {
        currentLightboxIndex = 0;
    } else if (currentLightboxIndex < 0) {
        currentLightboxIndex = cardsList.length - 1;
    }
    
    const targetCard = cardsList[currentLightboxIndex];
    document.getElementById('lightbox-img').src = targetCard.querySelector('img').src;
    document.getElementById('lightbox-caption').innerHTML = targetCard.querySelector('img').alt;
}

// --- Form Pre-fill & Scroll ---
function selectProduct(productName) {
    const productInput = document.getElementById('product');
    productInput.value = productName;
    productInput.style.backgroundColor = "#fae8ea"; 
    setTimeout(() => { productInput.style.backgroundColor = "#fcfcfc"; }, 1000);
    document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
}

function directWhatsApp() {
    const defaultMessage = "Hello Petal & Resin, I would like to inquire about your handcrafted art.";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultMessage)}`, '_blank');
        }
