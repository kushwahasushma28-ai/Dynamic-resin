// Function for smooth scrolling
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return; // Do nothing if it's just '#'

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Function for Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Function for Gallery Filtering
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Function for Dynamic WhatsApp Ordering Link
function initWhatsAppOrder() {
    const whatsappLink = document.getElementById('whatsapp-order-link');
    // Replace with actual phone number and customized message
    const phoneNumber = '+1234567890'; // e.g., '+15551234567'
    const message = encodeURIComponent("Hello! I'm interested in ordering a custom botanical resin piece.");

    if (whatsappLink) {
        whatsappLink.href = `https://wa.me/${phoneNumber}?text=${message}`;
    }
}

// Ensure all functions run after the page loads
window.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initMobileMenu();
    initGalleryFilter();
    initWhatsAppOrder();
});
