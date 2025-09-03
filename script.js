 const navbar = document.getElementById('navbar');
        const navLinks = document.getElementById('nav-links');
        const sections = document.querySelectorAll('.section');
        const progressBar = document.querySelector('.progress-bar');

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });

        // Toggle mobile menu
        function toggleMenu() {
            navLinks.classList.toggle('active');
        }

        function closeMenu() {
            navLinks.classList.remove('active');
        }

        // Scroll effects
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            // Navbar background on scroll
            if (scrolled > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Progress bar
            const winHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrolled / winHeight) * 100;
            progressBar.style.width = scrollPercent + '%';

            // Section animations
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 200;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrolled >= sectionTop && scrolled < sectionBottom) {
                    section.classList.add('active');
                }
            });
        });

        // Intersection Observer for better performance
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        // Observe all sections
        sections.forEach(section => {
            observer.observe(section);
        });

        // Add some interactive elements
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add click effect to skills
        document.querySelectorAll('.skill-item').forEach(skill => {
            skill.addEventListener('click', function() {
                this.style.background = 'rgba(255, 255, 255, 0.4)';
                setTimeout(() => {
                    this.style.background = 'rgba(255, 255, 255, 0.2)';
                }, 200);
            });
        });

        // Typing effect for hero section
        const heroTitle = document.querySelector('.hero-content h1');
        const heroText = document.querySelector('.hero-content p');
        
        function typeWriter(element, text, delay = 100) {
            element.textContent = '';
            let i = 0;
            function typing() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typing, delay);
                }
            }
            typing();
        }

        // Initialize typing effect after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                typeWriter(heroTitle, 'Robert Allan', 150);
                setTimeout(() => {
                    typeWriter(heroText, 'Full Stack Developer & Computer Science Graduate', 50);
                }, 2000);
            }, 500);
        });
