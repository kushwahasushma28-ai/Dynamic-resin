// 1. Sticky Navigation Bar & Logo color change
const navbar = document.getElementById('navbar');
const logoIcon = document.querySelector('.logo-icon');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        logoIcon.style.color = '#8D4B53'; // Maintain Dark Rose on scroll
    } else {
        navbar.classList.remove('scrolled');
        logoIcon.style.color = '#fff'; // White logo over hero
    }
});

// Set initial color (if loaded not at top)
if (window.scrollY < 50) {
    logoIcon.style.color = '#fff';
}

// 2. Intersection Observer for Smooth Scroll Animations
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// 3. Optimized Custom Luxury Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows mouse exactly
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with a smooth animation 'trail'
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 400, fill: "forwards" });
});

// Interaction logic: Enlarge and change cursor color on links/buttons
const interactables = document.querySelectorAll('a, .btn, .gallery-item');

interactables.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '65px';
        cursorOutline.style.height = '65px';
        // Champagne Gold background when hovering
        cursorOutline.style.backgroundColor = 'rgba(197, 168, 128, 0.15)'; 
        cursorOutline.style.borderColor = '#C5A880';
    });
    link.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '45px';
        cursorOutline.style.height = '45px';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorOutline.style.borderColor = '#8D4B53'; // Back to Dark Rose
    });
});
