// --- Configuration ---
// Replace this with your actual WhatsApp Number
// Format: CountryCode + Number (No + sign or spaces) e.g., 1234567890
const WHATSAPP_NUMBER = "1234567890"; 

// --- Mobile Menu Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const mobileNav = document.getElementById('mobile-nav');
    const navLinks = mobileNav.querySelectorAll('a');

    // Open Menu
    menuIcon.addEventListener('click', () => {
        mobileNav.classList.add('active');
    });

    // Close Menu
    closeIcon.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });

    // Close Menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
        });
    });

    // --- Form Submission Logic ---
    const orderForm = document.getElementById('orderForm');
    
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent page reload
        
        const name = document.getElementById('name').value;
        const contact = document.getElementById('contact').value;
        const product = document.getElementById('product').value;
        const message = document.getElementById('message').value;

        // Construct the WhatsApp message
        let waMessage = `*New Inquiry from Petal & Resin Website*%0A%0A`;
        waMessage += `*Name:* ${name}%0A`;
        waMessage += `*Contact:* ${contact}%0A`;
        
        if(product) {
            waMessage += `*Product Interested In:* ${product}%0A`;
        }
        if(message) {
            waMessage += `*Message:* ${message}%0A`;
        }

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;
        window.open(whatsappUrl, '_blank');
    });
});

// --- Function to auto-fill product in order form and scroll to it ---
// This is called when an "INQUIRE" button in the gallery is clicked
function selectProduct(productName) {
    // 1. Fill the input field
    const productInput = document.getElementById('product');
    productInput.value = productName;
    
    // 2. Add a little visual cue (optional)
    productInput.style.backgroundColor = "#e8f9ef"; // Light green flash
    setTimeout(() => {
        productInput.style.backgroundColor = "#f9f9f9"; // Back to normal
    }, 1000);

    // 3. Scroll down to the order section smoothly
    document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
}

// --- Generic WhatsApp direct link for the simple buttons ---
function directWhatsApp() {
    const defaultMessage = "Hello Petal & Resin, I would like to inquire about your handcrafted art.";
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(whatsappUrl, '_blank');
}
