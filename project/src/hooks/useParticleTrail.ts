import { useEffect, useCallback } from 'react';

interface Particle {
  element: HTMLDivElement;
  x: number;
  y: number;
  alpha: number;
}

export const useParticleTrail = () => {
  const createParticle = useCallback((x: number, y: number): Particle => {
    const element = document.createElement('div');
    element.className = 'particle';
    document.body.appendChild(element);

    return {
      element,
      x,
      y,
      alpha: 1
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      const particles: Particle[] = [];
      const maxParticles = 20;
      let lastX = 0;
      let lastY = 0;
      let throttleTimer: number | null = null;

      const updateParticle = (particle: Particle) => {
        particle.alpha -= 0.02;
        particle.element.style.opacity = particle.alpha.toString();

        if (particle.alpha <= 0) {
          particle.element.remove();
          return false;
        }
        return true;
      };

      const animate = () => {
        particles.forEach((particle, index) => {
          if (!updateParticle(particle)) {
            particles.splice(index, 1);
          }
        });

        if (particles.length > 0) {
          requestAnimationFrame(animate);
        }
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (throttleTimer) return;

        throttleTimer = window.setTimeout(() => {
          const x = e.clientX;
          const y = e.clientY;

          // Only create particles if mouse has moved significantly
          const distance = Math.hypot(x - lastX, y - lastY);
          if (distance > 5) {
            if (particles.length >= maxParticles) {
              const oldParticle = particles.shift();
              if (oldParticle) {
                oldParticle.element.remove();
              }
            }

            const particle = createParticle(x, y);
            particle.element.style.left = `${x}px`;
            particle.element.style.top = `${y}px`;
            particles.push(particle);

            lastX = x;
            lastY = y;

            if (particles.length === 1) {
              animate();
            }
          }

          throttleTimer = null;
        }, 16); // Approximately 60fps
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        particles.forEach(particle => particle.element.remove());
      };
    }
  }, [createParticle]);
};