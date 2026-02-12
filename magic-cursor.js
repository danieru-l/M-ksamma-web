/* MÁKSAMMA - EFECTO DE CURSOR MÁGICO (VERSIÓN DEFINITIVA) */

(function () {
    // Función principal de inicialización
    function initMagicEffect() {
        // 1. Verificación de seguridad: si ya existe, no lo creamos de nuevo
        if (document.getElementById('magic-canvas')) return;

        // 2. Crear el lienzo (canvas)
        const canvas = document.createElement('canvas');
        canvas.id = 'magic-canvas';
        const ctx = canvas.getContext('2d');

        // 3. Estilos para que cubra toda la pantalla y esté ENCIMA de todo
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.pointerEvents = 'none'; // CRUCIAL: Permite hacer clic a través del efecto
        canvas.style.zIndex = '999999'; // Capa más alta posible

        // Añadir al cuerpo de la página
        document.body.appendChild(canvas);

        // 4. Variables del Sistema
        let particles = [];
        const colors = ['#4a7cf5', '#c5a059', '#a78bfa', '#ffffff'];

        // Ajustar tamaño del canvas
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // 5. Clase Partícula
        class Particle {
            constructor(x, y, type) {
                this.x = x;
                this.y = y;
                const isBurst = type === 'burst';

                // Tamaño y velocidad
                this.size = Math.random() * (isBurst ? 6 : 3) + 1;
                const angle = Math.random() * Math.PI * 2;
                const velocity = Math.random() * (isBurst ? 4 : 1);

                this.speedX = Math.cos(angle) * velocity;
                this.speedY = Math.sin(angle) * velocity;

                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.life = 1.0;
                this.decay = isBurst ? 0.02 : 0.03;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.life -= this.decay;
                if (this.size > 0.1) this.size -= 0.1;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = Math.max(0, this.life);
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 8;
                ctx.shadowColor = this.color;

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        // 6. Generador de partículas
        function createParticles(x, y, amount, type) {
            for (let i = 0; i < amount; i++) {
                particles.push(new Particle(x, y, type));
            }
        }

        // 7. Eventos (Mouse y Touch)
        window.addEventListener('mousemove', (e) => createParticles(e.clientX, e.clientY, 2, 'trail'));
        window.addEventListener('mousedown', (e) => createParticles(e.clientX, e.clientY, 15, 'burst'));

        window.addEventListener('touchmove', (e) => {
            const t = e.touches[0];
            createParticles(t.clientX, t.clientY, 2, 'trail');
        }, { passive: true });

        window.addEventListener('touchstart', (e) => {
            const t = e.touches[0];
            createParticles(t.clientX, t.clientY, 15, 'burst');
        }, { passive: true });

        // 8. Loop de Animación
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            particles = particles.filter(p => p.life > 0 && p.size > 0);
            requestAnimationFrame(animate);
        }
        animate();
    }

    // 9. Ejecución segura (espera a que el DOM esté listo)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMagicEffect);
    } else {
        initMagicEffect();
    }
})();
