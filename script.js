// ==========================================
// LOADER
// ==========================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 800);
});

// ==========================================
// CUSTOM CURSOR (lightweight - GPU accelerated)
// ==========================================
const cursor = document.querySelector('.cursor');
let cursorX = 0, cursorY = 0;
let cursorRAF = false;

function updateCursor() {
    cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
    cursorRAF = false;
}

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    if (!cursorRAF) {
        cursorRAF = true;
        requestAnimationFrame(updateCursor);
    }
});

// Hover effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card, .personality-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ==========================================
// PARTICLES.JS CONFIGURATION
// ==========================================
particlesJS('particles-js', {
    particles: {
        number: {
            value: 35,
            density: {
                enable: true,
                value_area: 900
            }
        },
        color: {
            value: ['#6c5ce7', '#00cec9', '#fd79a8']
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.4,
            random: true,
            anim: {
                enable: false
            }
        },
        size: {
            value: 2.5,
            random: true,
            anim: {
                enable: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#6c5ce7',
            opacity: 0.15,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: false
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 120,
                line_linked: {
                    opacity: 0.6
                }
            }
        }
    },
    retina_detect: false
});

// ==========================================
// NAVBAR
// ==========================================
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

// Scroll effect (handled in unified scroll handler below)

// Mobile menu
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

// Active link on scroll (handled in unified scroll handler below)
const sections = document.querySelectorAll('section[id]');

// ==========================================
// TYPING EFFECT
// ==========================================
const dynamicText = document.querySelector('.dynamic-text');
const words = [
    'Curieux de tout',
    'Toujours partant pour discuter',
    'Passionné d\'informatique',
    'Étudiant en BTS SIO',
    'Ouvert d\'esprit',
    'Fan de cybersécurité',
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

// Start typing effect after loader
setTimeout(typeEffect, 1200);

// ==========================================
// COUNTER ANIMATION
// ==========================================
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'));
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
// SKILLS TABS
// ==========================================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
        
        // Animate skill bars in active tab
        animateSkillBars();
    });
});

// Animate skill bars
function animateSkillBars() {
    const activeContent = document.querySelector('.tab-content.active');
    const skillBars = activeContent.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 100);
    });
}

// ==========================================
// PROJECTS FILTER
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || filter === category) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ==========================================
// SCROLL REVEAL
// ==========================================
const revealElements = document.querySelectorAll('.reveal-left, .reveal-right');

// Initial reveal check on load
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
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate counters
            if (entry.target.classList.contains('about-stats')) {
                statNumbers.forEach(animateCounter);
            }

            // Animate skill bars
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }

            // Animate timeline items
            if (entry.target.classList.contains('timeline-item')) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }

            // Animate personality cards staggered
            if (entry.target.classList.contains('personality-card')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, observerOptions);

// Observe elements
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

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// CONTACT FORM
// ==========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Create success message
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #6c5ce7, #a29bfe);
        padding: 40px 60px;
        border-radius: 20px;
        text-align: center;
        z-index: 10000;
        animation: fadeIn 0.5s ease;
        box-shadow: 0 20px 60px rgba(108, 92, 231, 0.4);
    `;
    successMsg.innerHTML = `
        <i class="fas fa-check-circle" style="font-size: 4rem; margin-bottom: 20px; display: block;"></i>
        <h3 style="margin-bottom: 10px;">C'est envoyé !</h3>
        <p>Merci ${name}, je te réponds vite !</p>
    `;
    
    document.body.appendChild(successMsg);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        successMsg.style.animation = 'fadeOut 0.5s ease forwards';
        setTimeout(() => {
            successMsg.remove();
        }, 500);
    }, 3000);
    
    // Reset form
    contactForm.reset();
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;
document.head.appendChild(style);

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
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
    const scrollPercent = (scrollY / docHeight) * 100;

    // Scroll progress bar
    if (scrollProgress) {
        scrollProgress.style.width = scrollPercent + '%';
    }

    // Navbar scroll effect
    navbar.classList.toggle('scrolled', scrollY > 100);

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
    backToTop.classList.toggle('visible', scrollY > 500);

    // Parallax hero
    if (heroContent && scrollY < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrollY / window.innerHeight);
    }

    // Scroll reveal
    revealElements.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
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
// TILT EFFECT ON CARDS
// ==========================================
const cards = document.querySelectorAll('.skill-card, .project-card, .personality-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// ==========================================
// MAGNETIC BUTTON EFFECT
// ==========================================
const magneticBtns = document.querySelectorAll('.btn');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ==========================================
// TEXT SCRAMBLE EFFECT ON HOVER
// ==========================================
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Add scramble style
const scrambleStyle = document.createElement('style');
scrambleStyle.textContent = `
    .scramble {
        color: var(--primary);
    }
`;
document.head.appendChild(scrambleStyle);

// ==========================================
// INITIALIZE ON DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initial animation for skill bars in first tab
    setTimeout(() => {
        animateSkillBars();
    }, 1500);
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
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s linear infinite';
            const easterEggStyle = document.createElement('style');
            easterEggStyle.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(easterEggStyle);
            
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
            
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

console.log('%c Yo ! Bienvenue sur mon portfolio', 'font-size: 24px; font-weight: bold; color: #6c5ce7;');
console.log('%c Tu fouilles dans la console ? Respect. Essaie le code Konami ;)', 'font-size: 14px; color: #00cec9;');
