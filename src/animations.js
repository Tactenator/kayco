document.addEventListener("DOMContentLoaded", function() {
    gsap.from("#hero-text h2", { 
        duration: 0.75,
        opacity: 0, 
        y: '100%',
        ease: 'power4inOut'
      });
      gsap.from("#hero-text p", { 
        duration: 0.75,
        delay: 0.5,
        opacity: 0, 
        y: '100%',
        ease: 'power4inOut'
      });

      gsap.fromTo("#hero-text a", {
        opacity: 0, 
    }, 
    {
        opacity: 1, 
        delay: 1,
        duration: 1, 
        ease: 'power4.inOut'
    })
});