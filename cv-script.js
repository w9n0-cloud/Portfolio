document.addEventListener('DOMContentLoaded', () => {
    function animateElements(selector, transform, baseDelay, stagger) {
        const items = document.querySelectorAll(selector);
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = transform;
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translate(0)';
            }, baseDelay + (index * stagger));
        });
    }

    const skillDots = document.querySelectorAll('.skill-dots');

    const dotsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const dots = entry.target.querySelectorAll('.dot.filled');
                dots.forEach((dot, index) => {
                    setTimeout(() => {
                        dot.style.transform = 'scale(1.2)';
                        setTimeout(() => {
                            dot.style.transform = 'scale(1)';
                        }, 200);
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillDots.forEach(dots => dotsObserver.observe(dots));

    animateElements('.timeline-item-cv', 'translateX(-30px)', 500, 200);
    animateElements('.competence-card', 'translateY(30px)', 800, 150);

    const downloadBtn = document.getElementById('downloadCV');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #c0956c, #d4b896);
                padding: 30px 50px;
                border-radius: 20px;
                text-align: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
                box-shadow: 0 20px 60px rgba(192, 149, 108, 0.3);
            `;
            notification.innerHTML = `
                <i class="fas fa-info-circle" style="font-size: 2.5rem; margin-bottom: 15px; display: block;"></i>
                <h3 style="margin-bottom: 10px;">Génération du PDF</h3>
                <p>Utilisez Ctrl+P ou le bouton Imprimer<br>et sélectionnez "Enregistrer en PDF"</p>
            `;

            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    notification.remove();
                    window.print();
                }, 300);
            }, 2000);
        });
    }

    const hobbyItems = document.querySelectorAll('.hobby-item');

    hobbyItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('i').style.transform = 'rotate(360deg) scale(1.2)';
        });

        item.addEventListener('mouseleave', () => {
            item.querySelector('i').style.transform = 'rotate(0) scale(1)';
        });
    });

    const cvName = document.querySelector('.cv-name');
    if (cvName) {
        const originalText = cvName.textContent;
        cvName.style.visibility = 'hidden';

        let charIndex = 0;
        const typeWriter = () => {
            if (charIndex < originalText.length) {
                cvName.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 80);
            }
        };

        setTimeout(() => {
            cvName.textContent = '';
            cvName.style.visibility = 'visible';
            typeWriter();
        }, 1000);
    }
});

let scrollTicking = false;
window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        requestAnimationFrame(() => {
            const cvHeader = document.querySelector('.cv-header');
            if (cvHeader) {
                cvHeader.style.backgroundPosition = `center ${window.scrollY * 0.3}px`;
            }
            scrollTicking = false;
        });
        scrollTicking = true;
    }
});
