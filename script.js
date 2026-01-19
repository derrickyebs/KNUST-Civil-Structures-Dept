// Carousel functionality
let currentSlideIndex = 0;
let carouselInterval;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }
    
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
}

function moveCarousel(direction) {
    showSlide(currentSlideIndex + direction);
    resetCarouselInterval();
}

function currentSlide(index) {
    showSlide(index);
    resetCarouselInterval();
}

function autoSlide() {
    showSlide(currentSlideIndex + 1);
}

function resetCarouselInterval() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(autoSlide, 5000);
}

// Start carousel auto-slide when page loads
window.addEventListener('load', () => {
    showSlide(0);
    carouselInterval = setInterval(autoSlide, 5000);
    revealOnScroll();
});

// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.getElementById('menuToggle');
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    document.getElementById(pageId).classList.add('active');

    // Close mobile menu if open
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.getElementById('menuToggle');
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Trigger reveal animations for the new page
    setTimeout(() => {
        revealOnScroll();
    }, 100);
}

// Show Professor Detail
function showProfessor(profId) {
    showPage(profId);
}

// Scroll Reveal Animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        // Element is in viewport
        if (elementTop < windowHeight - 100 && elementBottom > 0) {
            element.classList.add('active');
        }
    });
}

// Reveal on scroll
window.addEventListener('scroll', () => {
    revealOnScroll();
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('nav');
    
    if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
