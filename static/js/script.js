var swiper = new Swiper(".home-slider", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
  // Additional options for smoother transitions
  speed: 800, // Adjust the speed of the transition (in milliseconds)
  effect: "slide", // Specify the transition effect, you can try "fade", "cube", "coverflow", etc.
  preloadImages: true, // Preload images for smoother transitions
  updateOnWindowResize: true, // Update Swiper when the window resizes for better responsiveness
  easing: "ease", // Specify the easing function for transitions
});