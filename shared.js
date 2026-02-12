/* ==============================
   MÁKSAMMA — SCRIPTS COMPARTIDOS
   ============================== */

(function () {
    'use strict';

    // --- ESTRELLAS DE FONDO ---
    function initStars(count) {
        var container = document.getElementById('stars-bg');
        if (!container) return;
        for (var i = 0; i < count; i++) {
            var star = document.createElement('div');
            star.classList.add('star');
            star.style.left = (Math.random() * 100) + '%';
            star.style.top = (Math.random() * 100) + '%';
            var size = Math.random() * 3 + 2;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
            star.style.setProperty('--opacity', (Math.random() * 0.7 + 0.3).toString());
            container.appendChild(star);
        }
    }

    // --- NAVEGACIÓN: OCULTAR AL SCROLL ---
    function initNavScroll() {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                document.body.classList.add('scrolled');
            } else {
                document.body.classList.remove('scrolled');
            }
        });
    }

    // --- MENÚ MÓVIL ---
    window.toggleMenu = function () {
        var menu = document.getElementById('mobile-menu');
        if (menu) menu.classList.toggle('hidden');
    };

    // --- AÑO DINÁMICO EN FOOTER ---
    function initDynamicYear() {
        var yearEls = document.querySelectorAll('.dynamic-year');
        var year = new Date().getFullYear();
        yearEls.forEach(function (el) {
            el.textContent = year;
        });
    }

    // --- INICIALIZACIÓN ---
    function init() {
        initStars(80);
        initNavScroll();
        initDynamicYear();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
