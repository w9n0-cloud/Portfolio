// ==========================================
// LOADER
// ==========================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 800);
    }
});

// ==========================================
// NAVBAR
// ==========================================
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

// Mobile menu
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Active link on scroll (handled in unified scroll handler below)
const sections = document.querySelectorAll('section[id]');

// ==========================================
// TYPING EFFECT (index.html only)
// ==========================================
const dynamicText = document.querySelector('.dynamic-text');

if (dynamicText) {
    const words = [
        'Curieux de tout',
        'Toujours partant pour discuter',
        'Passionné et déterminé',
        'Étudiant en BTS SIO',
        'Ouvert d\'esprit',
        'Sportif dans l\'âme',
        'Futur Ingénieur'
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            dynamicText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            dynamicText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }

    setTimeout(typeEffect, 1200);
}

// ==========================================
// COUNTER ANIMATION
// ==========================================
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'));
    if (isNaN(target)) return;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            el.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            el.textContent = target;
        }
    };

    updateCounter();
};

// ==========================================
// SKILLS TABS (index.html only)
// ==========================================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

function animateSkillBars() {
    const activeContent = document.querySelector('.tab-content.active');
    if (!activeContent) return;
    const skillBars = activeContent.querySelectorAll('.skill-progress');

    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 100);
    });
}

if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const tabEl = document.getElementById(tabId);
            if (tabEl) tabEl.classList.add('active');

            animateSkillBars();
        });
    });
}

// ==========================================
// SCROLL REVEAL
// ==========================================
const revealElements = document.querySelectorAll('.reveal-left, .reveal-right');

window.addEventListener('load', () => {
    revealElements.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add('active');
        }
    });
});

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('about-stats')) {
                statNumbers.forEach(animateCounter);
            }
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
            if (entry.target.classList.contains('timeline-item')) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
            if (entry.target.classList.contains('personality-card')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) observer.observe(aboutStats);

const skillsSection = document.querySelector('.skills');
if (skillsSection) observer.observe(skillsSection);

document.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));

document.querySelectorAll('.personality-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
    observer.observe(card);
});

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==========================================
// CONTACT FORM (index.html only)
// ==========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();

        // Basic validation
        if (!name || !email) return;

        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #c0956c, #d4b896);
            padding: 40px 60px;
            border-radius: 20px;
            text-align: center;
            z-index: 10000;
            animation: fadeIn 0.5s ease;
            box-shadow: 0 20px 60px rgba(192, 149, 108, 0.3);
        `;
        successMsg.innerHTML = `
            <i class="fas fa-check-circle" style="font-size: 4rem; margin-bottom: 20px; display: block;"></i>
            <h3 style="margin-bottom: 10px;">C'est envoyé !</h3>
            <p>Merci ${name}, je te réponds vite !</p>
        `;

        document.body.appendChild(successMsg);

        setTimeout(() => {
            successMsg.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => successMsg.remove(), 500);
        }, 3000);

        contactForm.reset();
    });
}

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;
document.head.appendChild(fadeOutStyle);

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==========================================
// UNIFIED SCROLL HANDLER (single rAF-throttled listener)
// ==========================================
const heroContent = document.querySelector('.hero-content');
const scrollProgress = document.getElementById('scrollProgress');
let scrollTicking = false;

function onScroll() {
    const scrollY = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    if (scrollProgress) {
        scrollProgress.style.width = scrollPercent + '%';
    }

    if (navbar) {
        navbar.classList.toggle('scrolled', scrollY > 100);
    }

    // Active nav link
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 200;
        const sectionId = section.getAttribute('id');
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Back to top
    if (backToTop) {
        backToTop.classList.toggle('visible', scrollY > 500);
    }

    // Parallax hero
    if (heroContent && scrollY < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrollY / window.innerHeight);
    }

    // Scroll reveal (skip already revealed)
    revealElements.forEach(el => {
        if (!el.classList.contains('active') && el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add('active');
        }
    });

    scrollTicking = false;
}

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(onScroll);
    }
}, { passive: true });

// ==========================================
// TILT EFFECT ON CARDS (throttled)
// ==========================================
const cards = document.querySelectorAll('.skill-card, .project-card, .personality-card');

if (cards.length > 0) {
    cards.forEach(card => {
        let tiltRAF = false;
        card.addEventListener('mousemove', (e) => {
            if (tiltRAF) return;
            tiltRAF = true;
            requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = (y - rect.height / 2) / 10;
                const rotateY = (rect.width / 2 - x) / 10;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
                tiltRAF = false;
            });
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// ==========================================
// MAGNETIC BUTTON EFFECT (throttled)
// ==========================================
const magneticBtns = document.querySelectorAll('.btn');

if (magneticBtns.length > 0) {
    magneticBtns.forEach(btn => {
        let btnRAF = false;
        btn.addEventListener('mousemove', (e) => {
            if (btnRAF) return;
            btnRAF = true;
            requestAnimationFrame(() => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
                btnRAF = false;
            });
        }, { passive: true });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ==========================================
// INITIALIZE ON DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.tab-content.active')) {
        setTimeout(animateSkillBars, 1500);
    }
});

// ==========================================
// EASTER EGG - KONAMI CODE
// ==========================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            document.body.style.animation = 'rainbow 2s linear infinite';
            const easterEggStyle = document.createElement('style');
            easterEggStyle.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(easterEggStyle);
            setTimeout(() => { document.body.style.animation = ''; }, 5000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});
