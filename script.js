document.addEventListener('DOMContentLoaded', function() {

    // Hamburger Menu Toggle
    const navMenu = document.querySelector('.nav-menu');
    
    // Create and inject the hamburger icon into the navbar container
    const toggle = document.createElement('div');
    toggle.classList.add('menu-toggle');
    toggle.innerHTML = `<div class="bar"></div><div class="bar"></div><div class="bar"></div>`;
    document.querySelector('.navbar .container').appendChild(toggle);

    // Add click event to the hamburger icon
    toggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Portfolio Slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const slider = document.querySelector('.slider');
    const totalSlides = slides.length;

    window.moveSlide = function(direction) {
        currentSlide += direction;

        if (currentSlide < 0) {
            currentSlide = totalSlides - 1;
        }
        if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }

        const offset = -currentSlide * 100;
        slider.style.transform = `translateX(${offset}%)`;
    };

    // Auto slide every 5 seconds if there is more than one slide
    if (totalSlides > 1) {
        setInterval(() => {
            moveSlide(1);
        }, 5000);
    }

    // Scroll reveal animation
    const sections = document.querySelectorAll('section');

    const revealSection = () => {
        const triggerBottom = window.innerHeight / 5 * 4;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < triggerBottom) {
                section.classList.add('visible');
            } else {
                // Optional: remove class to re-animate on scroll up
                // section.classList.remove('visible');
            }
        });
    };

    window.addEventListener('scroll', revealSection);
    // Initial check in case sections are already in view
    revealSection();

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            // Hide mobile menu on link click
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});