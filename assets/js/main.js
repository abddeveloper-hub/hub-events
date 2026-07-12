document.addEventListener('DOMContentLoaded', () => {
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // 1. Smooth Royal Cursor
    if (supportsHover) {
        const cursor = document.createElement('div');
        const dot = document.createElement('div');
        cursor.className = 'cursor';
        dot.className = 'cursor-dot';
        document.body.appendChild(cursor);
        document.body.appendChild(dot);

        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0)`;
            dot.style.left = `${e.clientX - 2}px`;
            dot.style.top = `${e.clientY - 2}px`;
        });

        document.querySelectorAll('a, button, .moodboard-item, .card-royal').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform += ' scale(2)';
                cursor.style.background = 'rgba(184, 149, 72, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = cursor.style.transform.replace(' scale(2)', '');
                cursor.style.background = 'transparent';
            });
        });
    }

    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');

    if (nav && navLinks && !document.querySelector('.menu-toggle')) {
        const toggle = document.createElement('button');
        toggle.className = 'menu-toggle';
        toggle.setAttribute('aria-label', 'Toggle navigation');
        toggle.innerHTML = '<span></span><span></span><span></span>';
        nav.appendChild(toggle);

        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            toggle.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                toggle.classList.remove('active');
            });
        });

        document.addEventListener('click', (event) => {
            if (window.innerWidth <= 768 && !nav.contains(event.target)) {
                navLinks.classList.remove('open');
                toggle.classList.remove('active');
            }
        });
    }

    // 2. WhatsApp Logic
    window.sendWhatsApp = (message) => {
        const phone = "918089774414";
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    // 3. Scroll Progress & Directional Reveal
    const progressBar = document.getElementById('progressBar');

    const revealOnScroll = () => {
        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-center, .card-royal, .timeline-item, .moodboard-item');

        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const revealTop = el.getBoundingClientRect().top;
            const revealPoint = 100;

            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
                el.style.opacity = '1';
                el.style.transform = 'translateY(0) translateX(0) scale(1)';
            }
        });
    };

    window.addEventListener('scroll', () => {
        // Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if(progressBar) progressBar.style.width = scrolled + "%";

        // Parallax Hero
        const heroH1 = document.querySelector('.hero h1');
        if(heroH1) {
            heroH1.style.transform = `translateY(${winScroll * 0.25}px)`;
        }

        revealOnScroll();
    });

    // Initial check
    revealOnScroll();

    // 4. Page Loader Removal
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 1000);
        }
    });
});
