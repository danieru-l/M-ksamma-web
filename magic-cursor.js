/* MÁKSAMMA - EFECTO DE CURSOR MÁGICO (VERSIÓN ROBUSTA) */

window.addEventListener('load', function() {
    // 1. Configuración Inicial
    // Creamos un lienzo (canvas) invisible que cubre toda la pantalla
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none'; // CRUCIAL: Permite hacer clic a través de las partículas
    canvas.style.zIndex = '9999'; // Asegura que se vea por encima de todo
    
    document.body.appendChild(canvas);

    // 2. Variables del Sistema
    let particles = [];
    // Colores del aura: Azul Máksamma, Dorado Antiguo, Morado Místico, Blanco Luz
    const colors = ['#4a7cf5', '#c5a059', '#a78bfa', '#ffffff']; 

    // Función para ajustar el tamaño si el usuario cambia el tamaño de la ventana
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Ajuste inicial

    // 3. Clase Partícula (El "polvo mágico")
    class Particle {
        constructor(x, y, type) {
            this.x = x;
            this.y = y;
            this.type = type; // 'trail' (estela) o 'burst' (explosión al hacer clic)
            
            const isBurst = type === 'burst';
            
            // Tamaño aleatorio
            this.size = Math.random() * (isBurst ? 5 : 3) + 1;
            
            // Velocidad y dirección aleatoria
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * (isBurst ? 3 : 0.5);
            this.speedX = Math.cos(angle) * velocity;
            this.speedY = Math.sin(angle) * velocity;
            
            // Color aleatorio de nuestra paleta
            this.color = colors[Math.floor(Math.random() * colors.length)];
            
            this.life = 1.0; // Vida inicial (Opacidad)
            this.decay = isBurst ? 0.03 : 0.02; // Qué tan rápido desaparece
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= this.decay;
            
            // Hacerla más pequeña conforme muere
            if (this.size > 0.1) this.size -= 0.05;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.life;
            ctx.fillStyle = this.color;
            // Efecto de brillo (Glow)
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // 4. Función para crear grupos de partículas
    function createParticles(x, y, amount, type) {
        for (let i = 0; i < amount; i++) {
            particles.push(new Particle(x, y, type));
        }
    }

    // 5. EVENTOS DE ESCRITORIO (Mouse)
    window.addEventListener('mousemove', (e) => {
        // Crea 1 partícula por movimiento (Estela suave)
        createParticles(e.clientX, e.clientY, 1, 'trail');
    });

    window.addEventListener('mousedown', (e) => {
        // Crea 15 partículas al hacer clic (Explosión)
        createParticles(e.clientX, e.clientY, 15, 'burst');
    });

    // 6. EVENTOS MÓVILES (Touch)
    window.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        createParticles(touch.clientX, touch.clientY, 2, 'trail');
    }, { passive: true });

    window.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        createParticles(touch.clientX, touch.clientY, 15, 'burst');
    }, { passive: true });

    // 7. Bucle de Animación (El corazón del efecto)
    function animate() {
        // Limpiar el lienzo anterior
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Actualizar y dibujar cada partícula viva
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Eliminar partículas muertas para que no se sature la memoria
            if (particles[i].life <= 0 || particles[i].size <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
        
        // Repetir en el siguiente cuadro
        requestAnimationFrame(animate);
    }

    // ¡Arrancar motores!
    animate();
});
