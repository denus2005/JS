// MENU

function toggleMenu() {

    document
        .getElementById("menu")
        .classList
        .toggle("show");
}

// CAROUSEL

let index = 0;

const slides = document.getElementById("slides");

const dots = document.querySelectorAll(".dot");

const totalSlides = document.querySelectorAll(".slide").length;

function updateCarousel() {

    slides.style.transform =
        `translateX(-${index * 100}%)`;

    dots.forEach(dot =>
        dot.classList.remove("active")
    );

    dots[index].classList.add("active");
}

function moveSlide(step) {

    index += step;

    if (index >= totalSlides) {
        index = 0;
    }

    if (index < 0) {
        index = totalSlides - 1;
    }

    updateCarousel();
}

function currentSlide(n) {

    index = n;

    updateCarousel();
}

// AUTO SLIDE

setInterval(() => {

    moveSlide(1);

}, 3000);