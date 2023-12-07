document.addEventListener("DOMContentLoaded", function() {
    gsap.from("#hero-text", { 
        duration: 0.5,
        opacity: 0, 
        y: '20%',
        ease: 'power4inOut'
      });
});