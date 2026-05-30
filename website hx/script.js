// ===== DISCORD LINKS =====
const DISCORD_LINK = 'https://discord.com/invite/deaP8xPBcN'; // Ganti dengan link Discord yang sebenarnya

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
    });
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
    document.querySelectorAll('.stat-card').forEach(card => {
        const target = parseInt(card.dataset.count);
        const suffix = card.dataset.suffix || '';
        const numEl = card.querySelector('.stat-number');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            numEl.textContent = Math.floor(current).toLocaleString() + suffix;
        }, 16);
    });
}

// ===== SCROLL REVEAL =====
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('journey')) animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-up to all animatable elements
document.querySelectorAll('.stat-card, .feature-card, .showcase-card, .team-card, .faq-item, .hero-content, .discord-cta, .journey, .section-title').forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
});

// ===== SMOOTH SCROLL for nav links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== MODAL SYSTEM =====
function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Open via data-modal buttons
document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.modal));
});

// Close via X button
document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.dataset.close));
});

// Close on backdrop click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal(overlay.id);
    });
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(m => closeModal(m.id));
    }
});

// ===== DISCORD REDIRECT =====
document.querySelectorAll('.team-btn, #discordBtn, #discordHeroBtn, #joinDiscordBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(DISCORD_LINK, '_blank');
    });
});

// ===== BANNER DISCORD REDIRECT =====
document.querySelector('.banner-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(DISCORD_LINK, '_blank');
});

