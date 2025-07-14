document.addEventListener('DOMContentLoaded', () => {
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const letsTalkBtn = document.querySelector('.btn-lets-talk'); 

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            navToggle.classList.toggle('active');
            if (window.innerWidth <= 768) {
                letsTalkBtn.style.display = mainNav.classList.contains('active') ? 'none' : 'block';
            }
        });
    }

    const navLinks = document.querySelectorAll('.main-nav a');
    const sections = document.querySelectorAll('main > section[id]');

    function highlightNavLink() {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 100 && scrollY < sectionTop + sectionHeight - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();
 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    navToggle.classList.remove('active');
                    if (window.innerWidth <= 768) {
                        letsTalkBtn.style.display = 'block';
                    }
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            letsTalkBtn.style.display = 'block';
        } else {
            if (!mainNav.classList.contains('active')) {
                letsTalkBtn.style.display = 'block'; 
            } else {
                letsTalkBtn.style.display = 'none'; 
            }
        }
    });

    if (window.innerWidth <= 768 && mainNav.classList.contains('active')) {
        letsTalkBtn.style.display = 'none';
    }
});