class GooeyNav {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container with id "${containerId}" not found`);
      return;
    }

    // Configuration
    this.animationTime = options.animationTime || 600;
    this.particleCount = options.particleCount || 15;
    this.particleDistances = options.particleDistances || [90, 10];
    this.particleR = options.particleR || 100;
    this.timeVariance = options.timeVariance || 300;
    this.colors = options.colors || [1, 2, 3, 1, 2, 3, 1, 4];
    this.initialActiveIndex = options.initialActiveIndex || 0;

    // DOM Elements
    this.nav = this.container.querySelector('nav ul');
    this.filterEffect = this.container.querySelector('.effect.filter');
    this.textEffect = this.container.querySelector('.effect.text');
    this.items = this.nav.querySelectorAll('li');

    // State
    this.activeIndex = this.initialActiveIndex;

    // Initialize
    this.init();
  }

  noise(n = 1) {
    return n / 2 - Math.random() * n;
  }

  getXY(distance, pointIndex, totalPoints) {
    const angle = ((360 + this.noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  }

  createParticle(i, t, d, r) {
    let rotate = this.noise(r / 10);
    return {
      start: this.getXY(d[0], this.particleCount - i, this.particleCount),
      end: this.getXY(d[1] + this.noise(7), this.particleCount - i, this.particleCount),
      time: t,
      scale: 1 + this.noise(0.2),
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  }

  makeParticles(element) {
    const d = this.particleDistances;
    const r = this.particleR;
    const bubbleTime = this.animationTime * 2 + this.timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);

    for (let i = 0; i < this.particleCount; i++) {
      const t = this.animationTime * 2 + this.noise(this.timeVariance * 2);
      const p = this.createParticle(i, t, d, r);
      element.classList.remove('active');

      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        particle.style.setProperty('--color', `var(--color-${p.color}, white)`);
        particle.style.setProperty('--rotate', `${p.rotate}deg`);

        point.classList.add('point');
        particle.appendChild(point);
        element.appendChild(particle);

        requestAnimationFrame(() => {
          element.classList.add('active');
        });

        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch (e) {
            // Particle already removed
          }
        }, t);
      }, 30);
    }
  }

  updateEffectPosition(element) {
    if (!this.container || !this.filterEffect || !this.textEffect) return;

    const containerRect = this.container.getBoundingClientRect();
    const pos = element.getBoundingClientRect();

    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`
    };

    Object.assign(this.filterEffect.style, styles);
    Object.assign(this.textEffect.style, styles);
    this.textEffect.innerText = element.innerText;
  }

  handleClick(liElement, index, e) {
    if (e) e.preventDefault();
    if (this.activeIndex === index) return;

    // Update active state
    this.items[this.activeIndex].classList.remove('active');
    this.activeIndex = index;
    this.items[this.activeIndex].classList.add('active');

    // Update effect position
    this.updateEffectPosition(liElement);

    // Clear existing particles
    const particles = this.filterEffect.querySelectorAll('.particle');
    particles.forEach(p => this.filterEffect.removeChild(p));

    // Reset text animation
    this.textEffect.classList.remove('active');
    void this.textEffect.offsetWidth; // Force reflow
    this.textEffect.classList.add('active');

    // Create new particles
    this.makeParticles(this.filterEffect);
  }

  handleKeyDown(e, liElement, index) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handleClick(liElement, index);
    }
  }

  init() {
    // Set initial active state
    this.items[this.activeIndex].classList.add('active');
    this.updateEffectPosition(this.items[this.activeIndex]);
    this.textEffect.classList.add('active');

    // Attach event listeners
    this.items.forEach((li, index) => {
      li.addEventListener('click', (e) => {
        this.handleClick(li, index, e);
      });

      const anchor = li.querySelector('a');
      if (anchor) {
        anchor.addEventListener('keydown', (e) => {
          this.handleKeyDown(e, li, index);
        });
      }
    });

    // Handle window resize
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const activeLi = this.items[this.activeIndex];
        if (activeLi) {
          this.updateEffectPosition(activeLi);
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    // Use ResizeObserver if available
    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(() => {
        const activeLi = this.items[this.activeIndex];
        if (activeLi) {
          this.updateEffectPosition(activeLi);
        }
      });
      resizeObserver.observe(this.container);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new GooeyNav('gooeyNav', {
    animationTime: 600,
    particleCount: 15,
    particleDistances: [90, 10],
    particleR: 100,
    timeVariance: 300,
    colors: [1, 2, 3, 1, 2, 3, 1, 4],
    initialActiveIndex: 0
  });
});
