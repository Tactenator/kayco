document.addEventListener("DOMContentLoaded", function() {
    gsap.from("#hero-text h2", { 
        duration: 0.75,
        opacity: 0, 
        y: '100%',
        ease: 'power4inOut'
      });
      gsap.from("#hero-text p", { 
        duration: 0.75,
        opacity: 0, 
        y: '100%',
        ease: 'power4inOut'
      });

    gsap.from("#hero-text a", {
        opacity: 0,
        duration: 1.00,  
        ease: 'power4inOut' 
    })
});