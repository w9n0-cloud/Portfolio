// Projects page specific scripts

document.addEventListener('DOMContentLoaded', () => {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-showcase-card');

    if (filterTabs.length === 0 || projectCards.length === 0) return;

    // Filter functionality
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || filter === category) {
                    card.classList.remove('hidden');
                    card.style.animation = 'none';
                    card.offsetHeight;
                    card.style.animation = `cardAppear 0.6s ease forwards`;
                    card.style.animationDelay = `${index * 0.1}s`;
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Project card 3D tilt effect (throttled)
    projectCards.forEach(card => {
        let tiltRAF = false;
        card.addEventListener('mousemove', (e) => {
            if (tiltRAF) return;
            tiltRAF = true;
            requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = (y - rect.height / 2) / 20;
                const rotateY = (rect.width / 2 - x) / 20;
                card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
                tiltRAF = false;
            });
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Animate project icons on scroll (single observer, disconnect after)
    const iconObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const icon = entry.target.querySelector('.project-icon-large');
                if (icon) {
                    icon.style.animation = 'iconPulse 2s ease-in-out infinite';
                }
                iconObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.project-showcase-image').forEach(img => iconObserver.observe(img));

    // Add animations via stylesheet (once)
    const animStyles = document.createElement('style');
    animStyles.textContent = `
        @keyframes iconPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        @keyframes pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(212, 163, 115, 0.4); }
            50% { box-shadow: 0 0 0 10px rgba(212, 163, 115, 0); }
        }
    `;
    document.head.appendChild(animStyles);

    // Parallax hero (throttled with rAF)
    const heroSection = document.querySelector('.projects-hero');
    if (heroSection) {
        let parallaxTicking = false;
        window.addEventListener('scroll', () => {
            if (!parallaxTicking) {
                parallaxTicking = true;
                requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    if (scrolled < heroSection.offsetHeight) {
                        heroSection.style.backgroundPosition = `center ${scrolled * 0.5}px`;
                    }
                    parallaxTicking = false;
                });
            }
        }, { passive: true });
    }

    // Status badge animation
    document.querySelectorAll('.status-badge.in-progress').forEach(badge => {
        badge.style.animation = 'pulse 2s ease-in-out infinite';
    });

    // Scroll reveal for cards (disconnect after reveal)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        revealObserver.observe(card);
    });
});
