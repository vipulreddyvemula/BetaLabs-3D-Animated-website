// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Button interactions
document.querySelectorAll('.cta').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.textContent === 'EXPLORE') {
            document.querySelector('#about').scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Gallery item hover effect
// document.querySelectorAll('.gallery-item').forEach(item => {
//     item.addEventListener('mouseenter', function() {
//         this.style.transform = 'scale(0.98)';
//     });
//     item.addEventListener('mouseleave', function() {
//         this.style.transform = 'scale(1)';
//     });
// });

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.from('.about-head',{
    scrollTrigger: ".about-head",
    y:200,
    opacity:0,
    duration:2,
    ease:"power4.out"
})

gsap.from(".about-text",{
    scrollTrigger: ".about-text",
    x:200,
    opacity:0,
    duration:2,
    ease:"power4.out"
})

const t1=gsap.timeline({
    scrollTrigger:{
        trigger:".services-grid",
        start:"top 80%", //start: "<trigger-position> <viewport-position>"
        toggleActions:"play reverse play reverse" //toggleActions: "<onEnter> <onLeave> <onEnterBack> <onLeaveBack>"
    }
})
t1.fromTo(".service-card1",
    {y:50,opacity:0},
    {y:0,opacity:1, duration:0.25, ease:"power4.out"},
    "+=0.15"
).fromTo(".service-card2",
    {y:50,opacity:0},
    {y:0,opacity:1, duration:0.25, ease:"power4.out"},
    "+=0.15"
).fromTo(".service-card3",
    {y:50,opacity:0},
    {y:0,opacity:1, duration:0.25, ease:"power4.out"},
    "+=0.15"
);

