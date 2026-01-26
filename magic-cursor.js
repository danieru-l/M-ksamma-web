/* MÁKSAMMA - EFECTO DE CURSOR MÁGICO 
   Este script crea un canvas sobre toda la página y genera partículas
   que siguen al mouse (PC) o al dedo (Móvil).
*/

(function() {
    // 1. Crear el Canvas y añadirlo al cuerpo
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none'; // CRUCIAL: Permite hacer clic a través del efecto
    canvas.style.zIndex = '9999'; // Por encima de todo
    
    document.body.appendChild(canvas);

    // 2. Variables del sistema
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];
    
    // Paleta de colores de Máksamma (Azul, Dorado, Morado)
    const colors = ['#4a7cf5', '#c5a059', '#a78bfa', '#ffffff'];

    // Ajustar tamaño del canvas
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    // 3. Clase Partícula
    class Particle {
        constructor(x, y, type) {
            this.x = x;
            this.y = y;
            // Si es 'burst' (clic), son más rápidas y grandes
            const isBurst = type === 'burst';
            
            this.size = (Math.random() * (isBurst ? 4 : 2)) + 1;
            this.speedX = Math.random() * (isBurst ? 4 : 1) - (isBurst ? 2 : 0.5);
            this.speedY = Math.random() * (isBurst ? 4 : 1) - (isBurst ? 2 : 0.5);
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.life = 1; // Vida de 1.0 a 0.0
            this.decay = isBurst ? 0.02 : 0.03; // Qué tan rápido desaparecen
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= this.decay;
            if (this.size > 0.2) this.size -= 0.05;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Efecto de brillo (Glow)
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
        }
    }

    // 4. Manejadores de Eventos
    function addParticles(x, y, count, type) {
        for (let i = 0; i < count; i++) {
            particles.push(new Particle(x, y, type));
        }
    }

    // MOUSE (Escritorio)
    window.addEventListener('mousemove', (e) => {
        // Añadir pocas partículas al mover (Estela)
        addParticles(e.clientX, e.clientY, 2, 'trail');
    });

    window.addEventListener('mousedown', (e) => {
        // Añadir muchas partículas al hacer clic (Explosión)
        addParticles(e.clientX, e.clientY, 15, 'burst');
    });

    // TOUCH (Móvil)
    window.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        addParticles(touch.clientX, touch.clientY, 2, 'trail');
    }, { passive: true });

    window.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        addParticles(touch.clientX, touch.clientY, 15, 'burst');
    }, { passive: true });

    // 5. Bucle de Animación
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Eliminar partículas muertas
            if (particles[i].life <= 0 || particles[i].size <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
        
        // Resetear efectos de sombra para no afectar rendimiento
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        
        requestAnimationFrame(animate);
    }

    animate();
})();