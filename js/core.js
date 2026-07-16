/**
 * core.js — Shared Executive Runtime for Raj Kishor Mahapatra Portfolio
 *
 * Handles:
 *  · Mobile drawer navigation (Sleek slide-in)
 *  · Hamburger button & backdrop close
 *  · Material Design ripple effect
 *  · Executive Legal Modal
 *  · Ambient Constellation Particle Background Engine
 */

'use strict';

/* ── Navigation State ────────────────────────────────────────────────────────── */
let _menuOpen = false;

function openMenu() {
    if (_menuOpen) return;
    _menuOpen = true;
    _setMenuState(true);
}

function closeMenu() {
    if (!_menuOpen) return;
    _menuOpen = false;
    _setMenuState(false);
}

function toggleMenu() {
    _menuOpen ? closeMenu() : openMenu();
}

function _setMenuState(open) {
    const overlay = document.getElementById('mobile-menu-overlay');
    const hamIcon = document.getElementById('ham-icon');
    const toggle  = document.getElementById('menu-toggle');

    if (open) {
        overlay  && overlay.classList.add('active');
        hamIcon  && hamIcon.classList.add('open');
        toggle   && toggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-open');
    } else {
        overlay  && overlay.classList.remove('active');
        hamIcon  && hamIcon.classList.remove('open');
        toggle   && toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    }
}

(function initNav() {
    const toggle = document.getElementById('menu-toggle');
    if (toggle) toggle.addEventListener('click', toggleMenu);

    const overlay = document.getElementById('mobile-menu-overlay');
    if (overlay) {
        overlay.addEventListener('click', function (e) {
            if (!e.target.closest('.mobile-drawer')) closeMenu();
        });

        let touchStartX = 0;
        overlay.addEventListener('touchstart', function (e) {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        overlay.addEventListener('touchend', function (e) {
            const dx = e.changedTouches[0].clientX - touchStartX;
            if (dx > 60) closeMenu();
        }, { passive: true });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && _menuOpen) closeMenu();
    });
}());

/* ── Executive Legal Modal ───────────────────────────────────────────────────── */
function showLegal(type) {
    const modal = document.getElementById('legal-modal');
    const title = document.getElementById('legal-title');
    const body  = document.getElementById('legal-body');
    if (!modal || !title || !body) return;
    modal.classList.remove('hidden');

    if (type === 'disclaimer') {
        title.innerText = 'Legal Disclaimer';
        body.innerHTML  =
            '<p class="mb-4 text-[#D4AF37] font-semibold">Intellectual & Technical Notice:</p>' +
            '<p class="mb-4 text-gray-300">This digital archive is authored and maintained by Raj Kishor Mahapatra. ' +
            'Information and architectural methodologies are shared for educational and strategic insight. ' +
            'Unauthorised commercial reproduction or redistribution without explicit permission is prohibited.</p>';
    } else {
        title.innerText = 'Terms & Conditions';
        body.innerHTML  =
            '<p class="mb-4 text-gray-300">1. <strong class="text-white">Intellectual Property:</strong> All literature, handbooks, and structural designs are protected intellectual property.</p>' +
            '<p class="mb-4 text-gray-300">2. <strong class="text-white">Usage:</strong> Consulting frameworks and technical models are provided subject to specific engagement terms.</p>';
    }
}

/* ── Material Design Ripple ──────────────────────────────────────────────────── */
(function initRipple() {
    function addRipple(e) {
        const host  = e.currentTarget;
        const rect  = host.getBoundingClientRect();
        const touch = e.touches ? e.touches[0] : e;
        const x     = touch.clientX - rect.left;
        const y     = touch.clientY - rect.top;

        const ripple     = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top  = y + 'px';

        host.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    }

    function attach() {
        document.querySelectorAll('.btn-primary, .btn-secondary, #menu-toggle, .glass-card, .cyber-card').forEach(el => {
            el.classList.add('ripple-host');
            el.addEventListener('click', addRipple);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attach);
    } else {
        attach();
    }
}());

/* ── Ambient Constellation Particle Background Engine ────────────────────────── */
(function initAmbientParticles() {
    const canvas = document.getElementById('matrix-bg') || document.getElementById('ambient-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    /* Create slow-floating executive glowing nodes */
    const numNodes = Math.min(Math.floor((w * h) / 18000), 75);
    const nodes = [];

    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.45,
            radius: Math.random() * 1.8 + 1,
            color: Math.random() < 0.35 ? '#D4AF37' : (Math.random() < 0.6 ? '#3B82F6' : '#94A3B8'),
            alpha: Math.random() * 0.45 + 0.15
        });
    }

    let mouseX = -1000, mouseY = -1000;
    window.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });
    window.addEventListener('mouseout', () => {
        mouseX = -1000;
        mouseY = -1000;
    }, { passive: true });

    function draw() {
        if (document.hidden) {
            requestAnimationFrame(draw);
            return;
        }

        ctx.clearRect(0, 0, w, h);

        for (let i = 0; i < nodes.length; i++) {
            const p = nodes[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h;
            if (p.y > h) p.y = 0;

            /* Interactive subtle push/glow near cursor */
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.hypot(dx, dy);

            if (dist < 120 && dist > 0) {
                p.x += (dx / dist) * 0.6;
                p.y += (dy / dist) * 0.6;
            }

            /* Draw node */
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * (dist < 100 ? 1.4 : 1), 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = dist < 120 ? Math.min(p.alpha * 1.8, 0.85) : p.alpha;
            ctx.fill();

            /* Draw connecting filaments */
            for (let j = i + 1; j < nodes.length; j++) {
                const p2 = nodes[j];
                const nodeDist = Math.hypot(p.x - p2.x, p.y - p2.y);

                if (nodeDist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = p.color === '#D4AF37' || p2.color === '#D4AF37' ? '#D4AF37' : '#3B82F6';
                    ctx.globalAlpha = (1 - nodeDist / 130) * 0.14;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        ctx.globalAlpha = 1;
        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }, 150);
    });
}());
