// 1. Sticky Navigation & Logo color logic
const navbar = document.getElementById('navbar');
const logoIcon = document.querySelector('.logo-icon');
const menuBars = document.querySelectorAll('.bar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        logoIcon.style.color = '#8D4B53'; 
    } else {
        navbar.classList.remove('scrolled');
        logoIcon.style.color = '#fff'; 
    }
});

if (window.scrollY < 50) {
    logoIcon.style.color = '#fff';
}

// 2. Mobile Hamburger Menu Logic
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

// Toggle menu on click
mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('is-active');
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenu.classList.remove('is-active');
        navLinks.classList.remove('active');
    });
});

// 3. Intersection Observer for Smooth Scroll Animations
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

// 4. Custom Luxury Cursor Logic (Only active on Desktop via CSS rules)
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Only run cursor logic if the cursor elements are visible (i.e., not on mobile)
if (window.innerWidth > 768) {
    window.addEventListener('mousemove', function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 400, fill: "forwards" });
    });

    const interactables = document.querySelectorAll('a, .btn, .gallery-item, .menu-toggle');

    interactables.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '65px';
            cursorOutline.style.height = '65px';
            cursorOutline.style.backgroundColor = 'rgba(197, 168, 128, 0.15)'; 
            cursorOutline.style.borderColor = '#C5A880';
        });
        element.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '45px';
            cursorOutline.style.height = '45px';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorOutline.style.borderColor = '#8D4B53'; 
        });
    });
}
