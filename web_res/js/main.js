// Main JavaScript functionality for TecNM Chetumal Platform
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initializeNavigation();
    initializeAnimations();
    initializeCareersGrid();
    initializeChatToggle();
    
});

// Navigation functionality
function initializeNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.custom-navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'linear-gradient(135deg, rgba(30, 58, 138, 0.95) 0%, rgba(30, 64, 175, 0.95) 100%)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, var(--primary-blue) 0%, var(--dark-blue) 100%)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    window.addEventListener('scroll', function() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Animation and scroll effects
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Counter animation for hero stats
    animateCounters();
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent.replace('+', ''));
        const increment = target / 60; // 60 frames for 1 second at 60fps
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                const displayValue = Math.floor(current);
                counter.textContent = displayValue > 999 ? displayValue + '+' : displayValue;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target > 999 ? target + '+' : target;
            }
        };
        
        updateCounter();
    };

    // Trigger counter animation when hero section is visible
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => animateCounter(counter));
                heroObserver.unobserve(entry.target);
            }
        });
    });

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
}

// Initialize careers grid
function initializeCareersGrid() {
    const careersData = [
        {
            id: 1,
            name: "Ingeniería en Tecnologías de la Información y Comunicaciones",
            duration: "9 semestres",
            type: "Ingeniería",
            description: "Desarrollo de software, redes de computadoras, ciberseguridad y gestión de TI.",
            icon: "fas fa-laptop-code",
            color: "#3b82f6"
        },
        {
            id: 2,
            name: "Ingeniería Industrial",
            duration: "9 semestres",
            type: "Ingeniería",
            description: "Optimización de procesos, calidad, productividad y gestión empresarial.",
            icon: "fas fa-industry",
            color: "#ef4444"
        },
        {
            id: 3,
            name: "Ingeniería en Gestión Empresarial",
            duration: "9 semestres",
            type: "Ingeniería",
            description: "Administración, finanzas, mercadotecnia y desarrollo empresarial.",
            icon: "fas fa-chart-line",
            color: "#10b981"
        },
        {
            id: 4,
            name: "Licenciatura en Administración",
            duration: "8 semestres",
            type: "Licenciatura",
            description: "Gestión administrativa, recursos humanos y desarrollo organizacional.",
            icon: "fas fa-users-cog",
            color: "#f59e0b"
        },
        {
            id: 5,
            name: "Ingeniería Civil",
            duration: "10 semestres",
            type: "Ingeniería",
            description: "Diseño y construcción de obras de infraestructura y edificaciones.",
            icon: "fas fa-hard-hat",
            color: "#8b5cf6"
        },
        {
            id: 6,
            name: "Ingeniería Química",
            duration: "9 semestres",
            type: "Ingeniería",
            description: "Procesos químicos, biotecnología y desarrollo de materiales.",
            icon: "fas fa-flask",
            color: "#06b6d4"
        }
    ];

    const careersGrid = document.getElementById('careers-grid');
    if (careersGrid) {
        careersGrid.innerHTML = careersData.map(career => createCareerCard(career)).join('');
    }
}

// Create career card HTML
function createCareerCard(career) {
    return `
        <div class="col-lg-6 col-xl-4 mb-4">
            <div class="career-card h-100" data-career-id="${career.id}">
                <div class="career-header">
                    <div class="career-icon" style="background: linear-gradient(135deg, ${career.color}, ${career.color}99);">
                        <i class="${career.icon}"></i>
                    </div>
                    <div class="career-meta">
                        <span class="career-type">${career.type}</span>
                        <span class="career-duration">
                            <i class="fas fa-clock"></i> ${career.duration}
                        </span>
                    </div>
                </div>
                <div class="career-content">
                    <h4 class="career-title">${career.name}</h4>
                    <p class="career-description">${career.description}</p>
                </div>
                <div class="career-footer">
                    <button class="btn btn-outline-primary btn-sm career-info-btn" onclick="showCareerDetails(${career.id})">
                        <i class="fas fa-info-circle"></i> Más información
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Show career details modal/information
function showCareerDetails(careerId) {
    // This would typically open a modal or navigate to a detailed page
    console.log(`Showing details for career ID: ${careerId}`);
    
    // For now, we'll show a simple alert
    const careerNames = {
        1: "Ingeniería en Tecnologías de la Información y Comunicaciones",
        2: "Ingeniería Industrial",
        3: "Ingeniería en Gestión Empresarial",
        4: "Licenciatura en Administración",
        5: "Ingeniería Civil",
        6: "Ingeniería Química"
    };
    
    alert(`Información detallada sobre: ${careerNames[careerId]}\n\n¡Próximamente disponible en nuestra plataforma!`);
}

// Chat toggle functionality
function initializeChatToggle() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatContainer = document.getElementById('chat-container');
    const chatClose = document.getElementById('chat-close');

    if (chatToggle && chatContainer && chatClose) {
        chatToggle.addEventListener('click', function() {
            chatContainer.classList.add('show');
        });

        chatClose.addEventListener('click', function() {
            chatContainer.classList.remove('show');
        });

        // Close chat when clicking outside
        document.addEventListener('click', function(event) {
            if (!chatContainer.contains(event.target) && !chatToggle.contains(event.target)) {
                chatContainer.classList.remove('show');
            }
        });
    }
}

// Utility function for smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Form validation utilities
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} notification-popup`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
        ${message}
        <button class="btn-close" onclick="this.parentElement.remove()"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for career cards and notifications
const additionalStyles = `
<style>
.career-card {
    background: white;
    border-radius: var(--border-radius);
    padding: 1.5rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 1px solid #f1f5f9;
    cursor: pointer;
}

.career-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    border-color: var(--primary-blue);
}

.career-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.career-icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
}

.career-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
}

.career-type {
    background: var(--light-orange);
    color: var(--primary-orange);
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
}

.career-duration {
    color: var(--text-gray);
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.career-title {
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 0.75rem;
    line-height: 1.3;
}

.career-description {
    color: var(--text-gray);
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
}

.career-footer {
    margin-top: auto;
}

.career-info-btn {
    border-radius: 25px;
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
}

.notification-popup {
    position: fixed;
    top: 100px;
    right: 20px;
    z-index: 9999;
    max-width: 350px;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-strong);
    animation: slideInRight 0.3s ease-out;
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(100px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.btn-close {
    background: none;
    border: none;
    font-size: 1.2rem;
    margin-left: auto;
    padding: 0;
    color: currentColor;
    opacity: 0.7;
}

.btn-close:hover {
    opacity: 1;
}

.animate-in {
    animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
`;

// Inject additional styles
if (!document.querySelector('#additional-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'additional-styles';
    styleElement.innerHTML = additionalStyles.replace(/<style>|<\/style>/g, '');
    document.head.appendChild(styleElement);
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.showCareerDetails = showCareerDetails;
window.showNotification = showNotification;