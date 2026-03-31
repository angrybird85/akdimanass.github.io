/**
 * Script.js - Interactivité pour le Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menu
    mobileBtn.addEventListener('click', () => {
        navList.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navList.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            mobileBtn.querySelector('i').classList.remove('fa-times');
            mobileBtn.querySelector('i').classList.add('fa-bars');
        });
    });

    // 2. Navbar Background on Scroll & Active Links
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('scroll', () => {
        // Add background to navbar
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Highlight active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Typing Effect in Hero Section
    const typeTarget = document.querySelector('.typing-text');
    if (typeTarget) {
        const textToType = "Technicien Réseaux & Systèmes";
        typeTarget.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < textToType.length) {
                typeTarget.textContent += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, 100); // Vitesse de frappe (100ms)
            }
        };
        
        // Démarrer l'effet après un petit délai
        setTimeout(typeWriter, 1000);
    }

    // 4. Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    // Animation pour l'apparition
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease';
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 5. Simulate Terminal loading sequence
    const terminalLines = document.querySelectorAll('.terminal-line.output');
    if(terminalLines.length > 0) {
        terminalLines.forEach(line => {
            line.style.opacity = '0';
        });

        let delay = 1500;
        terminalLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                // petit saut pour simuler l'affichage console
                const termBody = document.querySelector('.terminal-body');
                if(termBody) termBody.scrollTop = termBody.scrollHeight;
            }, delay);
            // délai aléatoire entre chaque ligne pour faire vrai
            delay += Math.floor(Math.random() * 400) + 200; 
        });
    }
});
