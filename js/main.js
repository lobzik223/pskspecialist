// Main JavaScript for PSK Specialist website

document.addEventListener('DOMContentLoaded', function() {
    
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1000);
    }
    
    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const headerNav = document.getElementById('headerNav');
    
    if (mobileMenuToggle && headerNav) {
        mobileMenuToggle.addEventListener('click', () => {
            headerNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (headerNav && headerNav.classList.contains('active')) {
                    headerNav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Initialize Swiper for reviews
    const reviewsSlider = document.getElementById('reviewsSlider');
    if (reviewsSlider) {
        new Swiper(reviewsSlider, {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                }
            }
        });
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Пожалуйста, заполните все обязательные поля', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Пожалуйста, введите корректный email', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Отправка...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .project-card, .feature-item, .contact-item, .advantage-item');
    animateElements.forEach((el, index) => {
        observer.observe(el);
        // Add staggered animation delay - более плавные задержки
        el.style.animationDelay = `${index * 0.08}s`;
    });
    
    // Special animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -20px 0px' });
    
    serviceCards.forEach(card => {
        serviceObserver.observe(card);
    });
    
    // Special animation for advantage cards - slide from left
    const advantageItems = document.querySelectorAll('.advantage-item');
    const advantageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
    
    advantageItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        advantageObserver.observe(item);
    });
    
    // Special animation for team cards
    const teamCards = document.querySelectorAll('.department-content, .team-card, .team-note');
    console.log('Found team cards:', teamCards.length); // Debug info
    
    const teamObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                console.log('Team card intersecting:', entry.target.className); // Debug info
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    teamCards.forEach(card => {
        teamObserver.observe(card);
        console.log('Observing team card:', card.className); // Debug info
    });
    
    // Special animation for expertise section
    const expertiseCards = document.querySelectorAll('.expertise-card, .expertise-info');
    console.log('Found expertise cards:', expertiseCards.length); // Debug info
    
    const expertiseObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                console.log('Expertise card intersecting:', entry.target.className); // Debug info
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    expertiseCards.forEach(card => {
        expertiseObserver.observe(card);
        console.log('Observing expertise card:', card.className); // Debug info
    });
    
    // Special animation for coordination section
    const coordinationCards = document.querySelectorAll('.coordination-card, .coordination-info');
    console.log('Found coordination cards:', coordinationCards.length); // Debug info
    
    const coordinationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                console.log('Coordination card intersecting:', entry.target.className); // Debug info
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    coordinationCards.forEach(card => {
        coordinationObserver.observe(card);
        console.log('Observing coordination card:', card.className); // Debug info
    });
    
    // Special animation for supervision section
    const supervisionCards = document.querySelectorAll('.supervision-card, .supervision-info');
    console.log('Found supervision cards:', supervisionCards.length); // Debug info
    
    const supervisionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                console.log('Supervision card intersecting:', entry.target.className); // Debug info
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    supervisionCards.forEach(card => {
        supervisionObserver.observe(card);
        console.log('Observing supervision card:', card.className); // Debug info
    });
    
    // Special animation for gas-pipeline section
    const gasPipelineCards = document.querySelectorAll('.gas-pipeline-card, .gas-pipeline-info');
    console.log('Found gas-pipeline cards:', gasPipelineCards.length); // Debug info
    
    const gasPipelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                console.log('Gas-pipeline card intersecting:', entry.target.className); // Debug info
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    gasPipelineCards.forEach(card => {
        gasPipelineObserver.observe(card);
        console.log('Observing gas-pipeline card:', card.className); // Debug info
    });
    
    // Special animation for linear-object section
    const linearObjectCards = document.querySelectorAll('.linear-object-card, .linear-object-info');
    console.log('Found linear-object cards:', linearObjectCards.length); // Debug info
    
    const linearObjectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                console.log('Linear-object card intersecting:', entry.target.className); // Debug info
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    linearObjectCards.forEach(card => {
        linearObjectObserver.observe(card);
        console.log('Observing linear-object card:', card.className); // Debug info
    });
    
    // Special animation for infrastructure-buildings section
    const infrastructureBuildingsCards = document.querySelectorAll('.infrastructure-buildings-card, .infrastructure-buildings-info');
    console.log('Found infrastructure-buildings cards:', infrastructureBuildingsCards.length); // Debug info
    
    const infrastructureBuildingsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                console.log('Infrastructure-buildings card intersecting:', entry.target.className); // Debug info
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    infrastructureBuildingsCards.forEach(card => {
        infrastructureBuildingsObserver.observe(card);
        console.log('Observing infrastructure-buildings card:', card.className); // Debug info
    });
    
    // Special animation for construction-organization section
    const constructionOrganizationCards = document.querySelectorAll('.construction-organization-card, .construction-organization-info');
    console.log('Found construction-organization cards:', constructionOrganizationCards.length); // Debug info
    
    const constructionOrganizationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                console.log('Construction-organization card intersecting:', entry.target.className); // Debug info
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    constructionOrganizationCards.forEach(card => {
        constructionOrganizationObserver.observe(card);
        console.log('Observing construction-organization card:', card.className); // Debug info
    });
    
    // Special animation for external-lighting section
    const externalLightingCards = document.querySelectorAll('.external-lighting-card, .external-lighting-info');
    console.log('Found external-lighting cards:', externalLightingCards.length); // Debug info
    
    const externalLightingObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                console.log('External-lighting card intersecting:', entry.target.className); // Debug info
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    externalLightingCards.forEach(card => {
        externalLightingObserver.observe(card);
        console.log('Observing external-lighting card:', card.className); // Debug info
    });
    
    // Special animation for high-voltage-cables section
    const highVoltageCablesCards = document.querySelectorAll('.high-voltage-cables-card, .high-voltage-cables-info');
    console.log('Found high-voltage-cables cards:', highVoltageCablesCards.length); // Debug info
    
    const highVoltageCablesObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                console.log('High-voltage-cables card intersecting:', entry.target.className); // Debug info
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    highVoltageCablesCards.forEach(card => {
        highVoltageCablesObserver.observe(card);
        console.log('Observing high-voltage-cables card:', card.className); // Debug info
    });
    
    // Special animation for road-traffic-management section
    const roadTrafficManagementCards = document.querySelectorAll('.road-traffic-management-card, .road-traffic-management-info');
    console.log('Found road-traffic-management cards:', roadTrafficManagementCards.length); // Debug info
    
    const roadTrafficManagementObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                console.log('Road-traffic-management card intersecting:', entry.target.className); // Debug info
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    roadTrafficManagementCards.forEach(card => {
        roadTrafficManagementObserver.observe(card);
        console.log('Observing road-traffic-management card:', card.className); // Debug info
    });
    
    // Special animation for engineering-geological-survey section
    const engineeringGeologicalSurveyCards = document.querySelectorAll('.engineering-geological-survey-card, .engineering-geological-survey-info');
    console.log('Found engineering-geological-survey cards:', engineeringGeologicalSurveyCards.length); // Debug info
    
    const engineeringGeologicalSurveyObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                console.log('Engineering-geological-survey card intersecting:', entry.target.className); // Debug info
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    engineeringGeologicalSurveyCards.forEach(card => {
        engineeringGeologicalSurveyObserver.observe(card);
        console.log('Observing engineering-geological-survey card:', card.className); // Debug info
    });
    
    // Special animation for geotechnical-monitoring-program section
    const geotechnicalMonitoringProgramCards = document.querySelectorAll('.geotechnical-monitoring-program-card, .geotechnical-monitoring-program-info');
    console.log('Found geotechnical-monitoring-program cards:', geotechnicalMonitoringProgramCards.length); // Debug info
    
    const geotechnicalMonitoringProgramObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                console.log('Geotechnical-monitoring-program card intersecting:', entry.target.className); // Debug info
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    geotechnicalMonitoringProgramCards.forEach(card => {
        geotechnicalMonitoringProgramObserver.observe(card);
        console.log('Observing geotechnical-monitoring-program card:', card.className); // Debug info
    });
    
    // Special animation for engineering-environmental-survey section
    const engineeringEnvironmentalSurveyCards = document.querySelectorAll('.engineering-environmental-survey-card, .engineering-environmental-survey-info');
    console.log('Found engineering-environmental-survey cards:', engineeringEnvironmentalSurveyCards.length); // Debug info
    
    const engineeringEnvironmentalSurveyObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                console.log('Engineering-environmental-survey card intersecting:', entry.target.className); // Debug info
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    engineeringEnvironmentalSurveyCards.forEach(card => {
        engineeringEnvironmentalSurveyObserver.observe(card);
        console.log('Observing engineering-environmental-survey card:', card.className); // Debug info
    });
    
    // Special animation for environmental-protection section
    const environmentalProtectionCards = document.querySelectorAll('.environmental-protection-card, .environmental-protection-info');
    console.log('Found environmental-protection cards:', environmentalProtectionCards.length); // Debug info
    
    const environmentalProtectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                console.log('Environmental-protection card intersecting:', entry.target.className); // Debug info
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    environmentalProtectionCards.forEach(card => {
        environmentalProtectionObserver.observe(card);
        console.log('Observing environmental-protection card:', card.className); // Debug info
    });
    
    // Special animation for landscaping-greening-dendrology section
    const landscapingGreeningDendrologyCards = document.querySelectorAll('.landscaping-greening-dendrology-card, .landscaping-greening-dendrology-info');
    console.log('Found landscaping-greening-dendrology cards:', landscapingGreeningDendrologyCards.length); // Debug info
    
    const landscapingGreeningDendrologyObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                console.log('Landscaping-greening-dendrology card intersecting:', entry.target.className); // Debug info
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    landscapingGreeningDendrologyCards.forEach(card => {
        landscapingGreeningDendrologyObserver.observe(card);
        console.log('Observing landscaping-greening-dendrology card:', card.className); // Debug info
    });
    
    // Special animation for trust section (one-time only)
    const trustLogos = document.querySelectorAll('.trust-logos');
    console.log('Found trust logos:', trustLogos.length); // Debug info
    
    const trustObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                console.log('Trust logos intersecting:', entry.target.className); // Debug info
                entry.target.classList.add('animate');
                entry.target.classList.add('animated'); // Mark as already animated
                
                // Stop observing after animation is triggered
                trustObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    trustLogos.forEach(logos => {
        trustObserver.observe(logos);
        console.log('Observing trust logos:', logos.className); // Debug info
    });
    
    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const isPercentage = finalValue.includes('%');
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                
                animateCounter(target, 0, numericValue, isPercentage);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        // Set background color based on type
        if (type === 'success') {
            notification.style.backgroundColor = '#28a745';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#dc3545';
        } else {
            notification.style.backgroundColor = '#0066cc';
        }
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    function animateCounter(element, start, end, isPercentage = false) {
        const duration = 2000;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(start + (end - start) * easeOutQuart);
            
            element.textContent = isPercentage ? `${currentValue}%` : currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .header-nav {
                position: fixed;
                top: 100%;
                left: 0;
                width: 100%;
                background: white;
                padding: 20px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                transform: translateY(-100%);
                transition: transform 0.3s ease;
                z-index: 999;
            }
            
            .header-nav.active {
                transform: translateY(0);
            }
            
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Parallax effect for hero section
    const heroBackground = document.querySelector('.hero-background');
    const heroOverlay = document.querySelector('.hero-overlay');
    const heroSection = document.querySelector('.hero');
    
    if (heroBackground && heroOverlay && heroSection) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;
            
            // Параллакс только в пределах hero секции
            if (scrolled <= heroHeight) {
                const rate = scrolled * -0.3; // Более мягкий эффект
                heroBackground.style.transform = `translateY(${rate}px)`;
                heroOverlay.style.transform = `translateY(${rate}px)`;
            } else {
                // Останавливаем параллакс когда вышли за пределы hero
                const maxRate = heroHeight * -0.3;
                heroBackground.style.transform = `translateY(${maxRate}px)`;
                heroOverlay.style.transform = `translateY(${maxRate}px)`;
            }
            
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }
    
    // Add loading states to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });
    
    // Add button loading styles
    const buttonStyle = document.createElement('style');
    buttonStyle.textContent = `
        .btn.loading {
            position: relative;
            color: transparent;
        }
        
        .btn.loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin: -10px 0 0 -10px;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
    `;
    document.head.appendChild(buttonStyle);
    
    console.log('PSK Specialist website initialized successfully!');
});
