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

if (window.gsap && window.ScrollTrigger) {
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
}

const initThreeBackground = () => {
    if (!window.THREE) return;
    const container = document.getElementById('canvas-container');
    if (!container) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const particleCount = isMobile ? 500 : 1200;
    const coreSize = isMobile ? 8 : 12;
    const cameraZ = isMobile ? 52 : 40;
    const motionScale = isMobile ? 0.03 : 0.05;
    const pixelRatioCap = isMobile ? 1.25 : 2;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.002);

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = cameraZ;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, pixelRatioCap));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const positions = [];

    for (let i = 0; i < particleCount; i += 1) {
        positions.push(
            (Math.random() - 0.5) * 200,
            (Math.random() - 0.5) * 200,
            (Math.random() - 0.5) * 200
        );
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: isMobile ? 0.65 : 0.5,
        transparent: true,
        opacity: 0.6
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    const coreGeo = new THREE.IcosahedronGeometry(coreSize, 1);
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.40
    });
    const core = new THREE.LineSegments(new THREE.WireframeGeometry(coreGeo), lineMaterial);
    scene.add(core);

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event) => {
        mouseX = (event.clientX - window.innerWidth / 2) * motionScale;
        mouseY = (event.clientY - window.innerHeight / 2) * motionScale;
    };

    const onTouchMove = (event) => {
        const touch = event.touches[0];
        if (!touch) return;
        mouseX = (touch.clientX - window.innerWidth / 2) * motionScale;
        mouseY = (touch.clientY - window.innerHeight / 2) * motionScale;
    };

    const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, pixelRatioCap));
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);

    const animate = () => {
        requestAnimationFrame(animate);

        const speedMultiplier = prefersReducedMotion ? 0.4 : 1;
        particleSystem.rotation.y += 0.0005 * speedMultiplier;
        core.rotation.y -= 0.001 * speedMultiplier;
        core.rotation.x += 0.0005 * speedMultiplier;

        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    };

    animate();
};

initThreeBackground();

