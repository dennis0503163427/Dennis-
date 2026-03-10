/**
 * 1. MOBILE MENU & ACCESSIBILITY
 */
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");
        // Update accessibility attribute for screen readers
        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

/**
 * 2. SMOOTH SCROLLING
 */
navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        const href = this.getAttribute("href");
        
        // Only trigger if it's an internal ID link
        if (href.startsWith("#") && href.length > 1) {
            const targetSection = document.querySelector(href);
            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    });
});

/**
 * 3. ACTIVE LINK HIGHLIGHTING (Intersection Observer Method)
 * More performant than window.onScroll
 */
const sections = document.querySelectorAll("section[id]");
const navObserverOptions = {
    threshold: 0.6, // Section is "active" when 60% visible
    rootMargin: "0px"
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}, navObserverOptions);

sections.forEach(section => navObserver.observe(section));

/**
 * 4. FORMS: CONTACT & NEWSLETTER
 */
const handleFormSubmission = (selector, successMsg) => {
    const form = document.querySelector(selector);
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Simple validation for newsletter
        if (selector === ".newsletter-form") {
            const email = form.querySelector("input").value.trim();
            if (!email) {
                alert("Please enter a valid email.");
                return;
            }
        }

        alert(successMsg);
        form.reset();
    });
};

handleFormSubmission(".contact-form", "✅ Thank you! Your message has been sent.");
handleFormSubmission(".newsletter-form", "🎉 Thank you for subscribing!");

/**
 * 5. SCROLL ANIMATIONS (Reveal on Scroll)
 */
const scrollObserverOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
        }
    });
}, scrollObserverOptions);

// Select items and apply initial animation state via class
const animElements = document.querySelectorAll(".menu-item, .testimonial-card, .gallery-item, .feature-card");
animElements.forEach(el => {
    el.classList.add("reveal-init"); // See CSS below
    revealObserver.observe(el);
});
