/**
 * 1. SMOOTH SCROLLING
 * Fix: Added check to ensure the link is an internal ID (#) 
 * to prevent errors on external links.
 */
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function(e) {
        const targetId = this.getAttribute("href");
        
        if (targetId.startsWith("#")) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }
    });
});

/**
 * 2. ACTIVE LINK HIGHLIGHTING
 * Fix: Used window.scrollY for better compatibility and 
 * improved the math for more accurate section detection.
 */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    const scrollPos = window.scrollY || window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 160; // Adjusted offset
        const sectionHeight = section.clientHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (current && link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/**
 * 3. CONTACT FORM SUBMISSION
 * Fix: Added a null-check so the script doesn't break on 
 * pages without a contact form.
 */
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        alert("✅ Thank you! Your message has been sent.");
        contactForm.reset();
    });
}

/**
 * 4. NEWSLETTER SUBSCRIPTION
 * Fix: Changed from 'click' to 'submit' so it works when 
 * the user hits "Enter" inside the input field.
 */
const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
    newsletterForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const emailInput = this.querySelector("input");
        
        if (emailInput.value.trim() === "") {
            alert("Please enter your email first.");
        } else {
            alert("🎉 Thank you for subscribing!");
            emailInput.value = "";
        }
    });
}

/**
 * 5. SCROLL ANIMATION (FADE-IN EFFECT)
 * This makes elements slide up smoothly when they enter 
 * the user's viewport.
 */
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px" // Triggers slightly before element is visible
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            // Stop observing once the animation has finished
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Select items to animate
const animElements = document.querySelectorAll(".menu-item, .testimonial-card, .gallery-item, .feature-card");
animElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
    scrollObserver.observe(el);
});