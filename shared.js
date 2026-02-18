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
    // --- TIENDA DIGITAL ---
    window.openChapter = function (num) {
        // En el futuro, esto redirigirá al lector específico
        // window.location.href = 'lectura.html?cap=' + num;
        alert('Abriendo lector para el Capítulo ' + num + '...');
    };

    window.unlockChapter = function (num, title) {
        var modal = document.getElementById('purchase-modal');
        var titleEl = document.getElementById('modal-chapter-title');
        if (modal && titleEl) {
            titleEl.textContent = 'Capítulo ' + num + ': ' + title;
            modal.classList.remove('hidden');
            // Bloquear scroll
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeModal = function () {
        var modal = document.getElementById('purchase-modal');
        if (modal) {
            modal.classList.add('hidden');
            // Restaurar scroll
            document.body.style.overflow = '';
        }
    };

    window.buyChapter = function () {
        alert('Redirigiendo seguramanete a PayPal ($0.99 ESD)...');
    };

    window.buyDigital = function () {
        alert('Redirigiendo seguramente a PayPal ($9.99 USD) por el Tomo Completo...');
    };

    window.switchFormat = function (format, btn) {
        // Desactivar todos los tabs y paneles
        document.querySelectorAll('.format-tab').forEach(function (t) { t.classList.remove('active'); });
        document.querySelectorAll('.format-panel').forEach(function (p) { p.classList.remove('active'); });

        // Activar el seleccionado
        btn.classList.add('active');
        var panel = document.getElementById('panel-' + format);
        if (panel) panel.classList.add('active');
    };

    window.buyPhysical = function () {
        alert('¡Próximamente!\n\nEl sistema de pago con PayPal se habilitará muy pronto. Mientras tanto, contáctanos por Instagram o Facebook para adquirir tu libro.');
    };

})();
