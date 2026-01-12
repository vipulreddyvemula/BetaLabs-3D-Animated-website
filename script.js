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
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(0.98)';
    });
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});
