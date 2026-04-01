/**
 * ============================================================================
 * Instituto Tecnologico de Chetumal (TecNM) - Interactive Platform
 * Main JavaScript Module
 * ============================================================================
 *
 * Author:  Jorge Daniel Ruiz Medina
 * Project: Residencia Profesional - Plataforma Interactiva ITChetumal
 * Version: 2.0.0
 *
 * This file handles:
 *   - Navigation (smooth scroll, active highlighting, mobile menu)
 *   - Hero counter animations (IntersectionObserver + requestAnimationFrame)
 *   - Section entrance animations
 *   - Career grid rendering, filtering, and detail modal
 *   - Posgrado grid rendering
 *   - Chat toggle
 *   - Utility helpers (scrollToSection, showNotification)
 *
 * ============================================================================
 */

'use strict';

/* --------------------------------------------------------------------------
 * 1. DOMContentLoaded - Bootstrap all init functions
 * -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', function () {
    initializeNavigation();
    animateCounters();
    initializeAnimations();
    initializeCareersGrid();
    initializePosgradosGrid();
    initializeCareerFilters();
    initializeChatToggle();
    initializeBackToTop();
});


/* --------------------------------------------------------------------------
 * 2. Navigation
 * -------------------------------------------------------------------------- */

function initializeNavigation() {
    var navbar       = document.querySelector('.custom-navbar');
    var navLinks     = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    var dropdownItems = document.querySelectorAll('.dropdown-item[href^="#"]');
    var sections     = document.querySelectorAll('section[id]');
    var navCollapse  = document.getElementById('navbarNav');

    // --- Smooth scrolling for all internal anchor links ---
    var allAnchors = document.querySelectorAll('a[href^="#"]');
    allAnchors.forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (!href || href === '#') return;

            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                var offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // --- Close mobile menu on any nav-link / dropdown-item click ---
    var closablLinks = document.querySelectorAll('#navbarNav .nav-link, #navbarNav .dropdown-item');
    closablLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (navCollapse && navCollapse.classList.contains('show')) {
                var bsCollapse = bootstrap.Collapse.getOrCreateInstance(navCollapse);
                bsCollapse.hide();
            }
        });
    });

    // --- Navbar background change on scroll (more opaque when scrolled) ---
    function handleNavbarScroll() {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.style.background =
                'linear-gradient(135deg, rgba(30,58,138,0.97) 0%, rgba(30,64,175,0.97) 100%)';
            navbar.style.backdropFilter = 'blur(16px)';
            navbar.style.boxShadow     = '0 4px 30px rgba(30,58,138,0.25)';
        } else {
            navbar.style.background =
                'linear-gradient(135deg, var(--primary-blue) 0%, var(--dark-blue) 100%)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow     = '0 2px 20px rgba(30,58,138,0.1)';
        }
    }

    // --- Active nav highlighting based on scroll position ---
    function highlightActiveSection() {
        var scrollY = window.scrollY + 120;
        var currentId = '';

        sections.forEach(function (section) {
            if (scrollY >= section.offsetTop) {
                currentId = section.getAttribute('id');
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentId) {
                link.classList.add('active');
            }
        });

        // Also handle the dropdown parent for "Oferta Academica"
        var academicIds = ['carreras', 'posgrados', 'test-vocacional'];
        var dropdownToggle = document.querySelector('.nav-link.dropdown-toggle');
        if (dropdownToggle) {
            if (academicIds.indexOf(currentId) !== -1) {
                dropdownToggle.classList.add('active');
            } else {
                dropdownToggle.classList.remove('active');
            }
        }
    }

    window.addEventListener('scroll', function () {
        handleNavbarScroll();
        highlightActiveSection();
    }, { passive: true });

    // Fire once on load
    handleNavbarScroll();
    highlightActiveSection();
}


/* --------------------------------------------------------------------------
 * 3. Counter Animation (hero stats)
 * -------------------------------------------------------------------------- */

function animateCounters() {
    var counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    var animated = false;

    function runCounterAnimation() {
        if (animated) return;
        animated = true;

        counters.forEach(function (counter) {
            var target = parseInt(counter.getAttribute('data-target'), 10);
            if (isNaN(target)) return;

            var start     = 0;
            var duration  = 2000; // ms
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var elapsed  = timestamp - startTime;
                var progress = Math.min(elapsed / duration, 1);

                // Ease-out quad for a natural feel
                var eased = 1 - (1 - progress) * (1 - progress);
                var current = Math.floor(eased * target);

                counter.textContent = current.toLocaleString('es-MX');

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    counter.textContent = target.toLocaleString('es-MX');
                }
            }

            requestAnimationFrame(step);
        });
    }

    // Use IntersectionObserver so counters animate when hero section scrolls into view
    if ('IntersectionObserver' in window) {
        var heroSection = document.querySelector('#inicio');
        if (!heroSection) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    runCounterAnimation();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        observer.observe(heroSection);
    } else {
        // Fallback for very old browsers
        runCounterAnimation();
    }
}


/* --------------------------------------------------------------------------
 * 4. Section Entrance Animations
 * -------------------------------------------------------------------------- */

function initializeAnimations() {
    if (!('IntersectionObserver' in window)) return;

    var observerOptions = {
        threshold:  0.1,
        rootMargin: '0px 0px -60px 0px'
    };

    var sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-padding').forEach(function (el) {
        sectionObserver.observe(el);
    });
}


/* --------------------------------------------------------------------------
 * 5. Career Data  -  ALL 10 real ITChetumal programmes (verified)
 *    All programmes are 9 semesters.
 * -------------------------------------------------------------------------- */

var careersData = [
    {
        id: 'arquitectura',
        name: 'Arquitectura',
        duration: '9 semestres',
        type: 'Arquitectura',
        modality: ['presencial'],
        images: ['fotos carreras/arquitectura/ARQ1.JPG', 'fotos carreras/arquitectura/ARQ2.jpeg', 'fotos carreras/arquitectura/ARQ3.JPG', 'fotos carreras/arquitectura/ARQ4.JPG'],
        description:
            'Forma profesionales capaces de disenar, planificar y construir espacios ' +
            'arquitectonicos funcionales, esteticos y sustentables, considerando el ' +
            'contexto cultural, ambiental y social de la region del Caribe mexicano.',
        icon: 'fas fa-drafting-compass',
        color: '#e11d48',
        opportunities: [
            'Arquitecto de proyectos residenciales y comerciales',
            'Disenador de interiores',
            'Urbanista y planificador territorial',
            'Director de obra',
            'Consultor en sustentabilidad arquitectonica',
            'Restauracion de patrimonio historico'
        ],
        skills: [
            'Diseno arquitectonico y modelado 3D',
            'Conocimiento de materiales y sistemas constructivos',
            'Planificacion urbana y ordenamiento territorial',
            'Normatividad y legislacion en construccion',
            'Sustentabilidad y eficiencia energetica',
            'Creatividad y pensamiento espacial'
        ],
        profile:
            'Estudiantes con creatividad, sensibilidad estetica, habilidad para el dibujo ' +
            'y el diseno, interes por el arte, la cultura y la construccion de espacios ' +
            'que mejoren la calidad de vida de las personas.'
    },
    {
        id: 'contador-publico',
        name: 'Contador Publico',
        duration: '9 semestres',
        type: 'Licenciatura',
        modality: ['presencial', 'distancia'],
        images: ['fotos carreras/contador publico/CP1.jpg', 'fotos carreras/contador publico/CP2.jpeg', 'fotos carreras/contador publico/CP3.JPG', 'fotos carreras/contador publico/CP4.jpg', 'fotos carreras/contador publico/CP5.jpeg', 'fotos carreras/contador publico/CP6.jpg'],
        description:
            'Prepara profesionales competentes en contabilidad, auditoria, fiscalidad y ' +
            'finanzas, capaces de generar informacion financiera confiable para la toma ' +
            'de decisiones en organizaciones publicas y privadas.',
        icon: 'fas fa-calculator',
        color: '#0891b2',
        opportunities: [
            'Contador general en empresas publicas y privadas',
            'Auditor interno o externo',
            'Asesor fiscal y tributario',
            'Consultor financiero independiente',
            'Perito contable',
            'Director de finanzas corporativas'
        ],
        skills: [
            'Contabilidad financiera y de costos',
            'Auditoria y control interno',
            'Legislacion fiscal y tributaria',
            'Analisis e interpretacion de estados financieros',
            'Manejo de software contable (CONTPAQi, SAT)',
            'Etica profesional y responsabilidad social'
        ],
        profile:
            'Personas con aptitud numerica, pensamiento analitico, orden, honestidad, ' +
            'interes por las finanzas, la legislacion fiscal y la administracion de ' +
            'recursos economicos.'
    },
    {
        id: 'ing-administracion',
        name: 'Ingenieria en Administracion',
        duration: '9 semestres',
        type: 'Ingenieria',
        modality: ['presencial', 'distancia mixta'],
        images: ['fotos carreras/ingenieria en administracion/IA1.JPG', 'fotos carreras/ingenieria en administracion/IA2.JPG', 'fotos carreras/ingenieria en administracion/IA3.jpg', 'fotos carreras/ingenieria en administracion/IA4.jpg', 'fotos carreras/ingenieria en administracion/IA5.jpg', 'fotos carreras/ingenieria en administracion/IA6.jpeg'],
        description:
            'Integra conocimientos de ingenieria con ciencias administrativas para ' +
            'optimizar procesos organizacionales, gestionar recursos y liderar proyectos ' +
            'con un enfoque cuantitativo y tecnologico.',
        icon: 'fas fa-chart-pie',
        color: '#7c3aed',
        opportunities: [
            'Gerente de operaciones y procesos',
            'Consultor en gestion organizacional',
            'Analista de proyectos de inversion',
            'Director de recursos humanos',
            'Emprendedor de negocios tecnologicos',
            'Administrador de cadena de suministro'
        ],
        skills: [
            'Planeacion estrategica y gestion de proyectos',
            'Ingenieria economica y financiera',
            'Investigacion de operaciones',
            'Gestion de la calidad y productividad',
            'Liderazgo y desarrollo organizacional',
            'Toma de decisiones basada en datos'
        ],
        profile:
            'Estudiantes con liderazgo, pensamiento estrategico, interes por la ' +
            'optimizacion de procesos, la gestion de empresas y la aplicacion de ' +
            'herramientas tecnologicas en la administracion.'
    },
    {
        id: 'ing-civil',
        name: 'Ingenieria Civil',
        duration: '9 semestres',
        type: 'Ingenieria',
        modality: ['presencial'],
        images: ['fotos carreras/ingenieria civil/IC1.JPG', 'fotos carreras/ingenieria civil/IC2.JPG', 'fotos carreras/ingenieria civil/IC3.JPG', 'fotos carreras/ingenieria civil/IC4.jpg'],
        description:
            'Forma ingenieros capacitados para disenar, construir y supervisar obras ' +
            'de infraestructura como carreteras, puentes, edificaciones y sistemas ' +
            'hidraulicos, contribuyendo al desarrollo urbano y regional.',
        icon: 'fas fa-hard-hat',
        color: '#ea580c',
        opportunities: [
            'Ingeniero residente de obra',
            'Disenador estructural',
            'Supervisor de construccion',
            'Consultor en geotecnia e hidraulica',
            'Funcionario en obra publica municipal y estatal',
            'Director de empresa constructora'
        ],
        skills: [
            'Calculo estructural y mecanica de suelos',
            'Diseno y construccion de obras civiles',
            'Topografia y geodesia',
            'Hidraulica e hidrologia',
            'Administracion y supervision de obras',
            'Uso de software especializado (AutoCAD, SAP2000, Civil 3D)'
        ],
        profile:
            'Personas con aptitud para las matematicas y la fisica, interes por la ' +
            'construccion, la infraestructura y el desarrollo regional, con capacidad ' +
            'para el trabajo en campo y en equipo.'
    },
    {
        id: 'ing-electrica',
        name: 'Ingenieria Electrica',
        duration: '9 semestres',
        type: 'Ingenieria',
        modality: ['presencial'],
        images: ['fotos carreras/ingenieria electrica/IE1.JPG', 'fotos carreras/ingenieria electrica/IE2.JPG', 'fotos carreras/ingenieria electrica/IE3.jpeg', 'fotos carreras/ingenieria electrica/IE4.jpeg'],
        description:
            'Prepara profesionales en el diseno, operacion y mantenimiento de sistemas ' +
            'electricos de potencia, instalaciones electricas, energias renovables y ' +
            'automatizacion industrial.',
        icon: 'fas fa-bolt',
        color: '#eab308',
        opportunities: [
            'Ingeniero de proyectos electricos',
            'Disenador de instalaciones electricas industriales',
            'Especialista en energias renovables',
            'Supervisor de mantenimiento electrico',
            'Consultor en eficiencia energetica',
            'Ingeniero en la Comision Federal de Electricidad (CFE)'
        ],
        skills: [
            'Diseno de sistemas electricos de potencia',
            'Instalaciones electricas residenciales e industriales',
            'Maquinas electricas y control de motores',
            'Energias renovables y sustentabilidad',
            'Normatividad electrica (NOM)',
            'Automatizacion y control industrial'
        ],
        profile:
            'Estudiantes con interes por la electricidad, la electronica y la fisica, ' +
            'habilidad analitica, gusto por la resolucion de problemas tecnicos y ' +
            'compromiso con la eficiencia energetica y el medio ambiente.'
    },
    {
        id: 'ing-gestion-empresarial',
        name: 'Ingenieria en Gestion Empresarial',
        duration: '9 semestres',
        type: 'Ingenieria',
        modality: ['presencial', 'distancia'],
        images: ['fotos carreras/ingenieria en gestion empresarial/IGE1.JPG', 'fotos carreras/ingenieria en gestion empresarial/IGE2.JPG', 'fotos carreras/ingenieria en gestion empresarial/IGE3.JPG', 'fotos carreras/ingenieria en gestion empresarial/IGE4.JPG'],
        description:
            'Combina formacion en ingenieria con habilidades directivas para crear, ' +
            'gestionar y hacer crecer organizaciones competitivas, integrando la ' +
            'innovacion, la mercadotecnia y las finanzas.',
        icon: 'fas fa-chart-line',
        color: '#10b981',
        opportunities: [
            'Director general de empresa',
            'Gerente de mercadotecnia y ventas',
            'Consultor empresarial',
            'Analista de negocios y estrategia',
            'Emprendedor y fundador de startups',
            'Gestor de proyectos de innovacion'
        ],
        skills: [
            'Plan de negocios y emprendimiento',
            'Mercadotecnia digital y tradicional',
            'Finanzas corporativas',
            'Gestion del capital humano',
            'Innovacion y desarrollo de productos',
            'Negociacion y liderazgo ejecutivo'
        ],
        profile:
            'Personas emprendedoras, con vision de negocios, capacidad de liderazgo, ' +
            'interes por la innovacion, la mercadotecnia y la creacion de valor en ' +
            'organizaciones de cualquier tamano y sector.'
    },
    {
        id: 'ing-sistemas-computacionales',
        name: 'Ingenieria en Sistemas Computacionales',
        duration: '9 semestres',
        type: 'Ingenieria',
        modality: ['presencial'],
        images: ['fotos carreras/ingenieria en sistemas computacionales/ISIC1.JPG', 'fotos carreras/ingenieria en sistemas computacionales/ISIC2.JPG', 'fotos carreras/ingenieria en sistemas computacionales/ISIC3.jpg', 'fotos carreras/ingenieria en sistemas computacionales/ISIC4.jpg'],
        description:
            'Forma ingenieros especializados en desarrollo de software, bases de datos, ' +
            'redes de computadoras y tecnologias emergentes, capaces de crear soluciones ' +
            'tecnologicas que impulsen la transformacion digital.',
        icon: 'fas fa-laptop-code',
        color: '#3b82f6',
        opportunities: [
            'Desarrollador de software full-stack',
            'Ingeniero de bases de datos',
            'Administrador de redes y servidores',
            'Arquitecto de soluciones en la nube',
            'Consultor en ciberseguridad',
            'Lider de proyectos de TI'
        ],
        skills: [
            'Programacion en multiples lenguajes (Java, Python, C#)',
            'Desarrollo web y movil',
            'Administracion de bases de datos',
            'Redes de computadoras y telecomunicaciones',
            'Ingenieria de software y metodologias agiles',
            'Inteligencia artificial y ciencia de datos'
        ],
        profile:
            'Estudiantes con pensamiento logico-matematico, pasion por la tecnologia, ' +
            'capacidad para resolver problemas computacionales, creatividad para ' +
            'desarrollar soluciones innovadoras y disposicion para el aprendizaje continuo.'
    },
    {
        id: 'ing-tics',
        name: 'Ingenieria en Tecnologias de la Informacion y Comunicaciones',
        duration: '9 semestres',
        type: 'Ingenieria',
        modality: ['presencial'],
        images: ['fotos carreras/ingenieria en tecnologias de la informacion y comunicaciones/ITICS1.JPG', 'fotos carreras/ingenieria en tecnologias de la informacion y comunicaciones/ITICS2.jpg', 'fotos carreras/ingenieria en tecnologias de la informacion y comunicaciones/ITICS3.jpg', 'fotos carreras/ingenieria en tecnologias de la informacion y comunicaciones/ITICS4.jpeg'],
        description:
            'Prepara profesionales en la implementacion y gestion de infraestructura ' +
            'tecnologica, sistemas de comunicaciones, redes convergentes y soluciones ' +
            'de TI alineadas a objetivos organizacionales.',
        icon: 'fas fa-network-wired',
        color: '#6366f1',
        opportunities: [
            'Administrador de infraestructura de TI',
            'Especialista en telecomunicaciones',
            'Consultor en transformacion digital',
            'Ingeniero de redes y comunicaciones',
            'Gerente de servicios de TI (ITIL)',
            'Especialista en seguridad informatica'
        ],
        skills: [
            'Gestion de servicios de TI y gobernanza',
            'Diseno de redes convergentes',
            'Telecomunicaciones y sistemas distribuidos',
            'Seguridad de la informacion',
            'Administracion de proyectos tecnologicos',
            'Computacion en la nube e IoT'
        ],
        profile:
            'Personas con interes por las telecomunicaciones, la infraestructura ' +
            'tecnologica, la gestion de servicios digitales, con habilidad analitica ' +
            'y orientacion a la solucion de problemas en entornos organizacionales.'
    },
    {
        id: 'lic-administracion',
        name: 'Licenciatura en Administracion',
        duration: '9 semestres',
        type: 'Licenciatura',
        modality: ['presencial'],
        images: [],
        description:
            'Forma profesionales en la planeacion, organizacion, direccion y control ' +
            'de recursos en organizaciones publicas y privadas, con un enfoque ' +
            'humanistico y orientado a resultados.',
        icon: 'fas fa-users-cog',
        color: '#f59e0b',
        opportunities: [
            'Gerente administrativo',
            'Director de recursos humanos',
            'Analista de procesos organizacionales',
            'Consultor de negocios independiente',
            'Administrador publico municipal o estatal',
            'Emprendedor y gestor de PyMEs'
        ],
        skills: [
            'Planeacion y gestion estrategica',
            'Administracion del talento humano',
            'Contabilidad y finanzas basicas',
            'Derecho laboral y mercantil',
            'Mercadotecnia y ventas',
            'Comunicacion organizacional'
        ],
        profile:
            'Personas con capacidad de liderazgo, habilidades de comunicacion, ' +
            'interes por la gestion de personas y organizaciones, con actitud ' +
            'de servicio y orientacion al logro de objetivos.'
    },
    {
        id: 'lic-biologia',
        name: 'Licenciatura en Biologia',
        duration: '9 semestres',
        type: 'Licenciatura',
        modality: ['presencial'],
        images: ['fotos carreras/biologia/BIOL1.jpg', 'fotos carreras/biologia/BIOL2.JPG', 'fotos carreras/biologia/BIOL3.jpg', 'fotos carreras/biologia/BIOL4.jpeg'],
        description:
            'Forma biologos con conocimientos solidos en ecologia, biodiversidad, ' +
            'manejo de recursos naturales y biotecnologia, con enfasis en los ' +
            'ecosistemas tropicales y costeros de Quintana Roo.',
        icon: 'fas fa-dna',
        color: '#22c55e',
        opportunities: [
            'Biologo investigador en centros y universidades',
            'Consultor ambiental y de impacto ecologico',
            'Gestor de areas naturales protegidas',
            'Especialista en manejo de vida silvestre',
            'Biotecnologo en industria alimentaria o farmaceutica',
            'Educador ambiental y divulgador cientifico'
        ],
        skills: [
            'Ecologia y conservacion de la biodiversidad',
            'Biologia molecular y genetica',
            'Taxonomia y sistematica',
            'Manejo de ecosistemas costeros y tropicales',
            'Investigacion cientifica y trabajo de campo',
            'Evaluacion de impacto ambiental'
        ],
        profile:
            'Estudiantes con curiosidad cientifica, amor por la naturaleza, interes ' +
            'en la conservacion del medio ambiente, habilidad para la observacion ' +
            'y el trabajo de campo en los ecosistemas de la region.'
    }
];


/* --------------------------------------------------------------------------
 * 6. Posgrado Data  -  4 real ITChetumal graduate programmes
 * -------------------------------------------------------------------------- */

var posgradosData = [
    {
        id: 'maestria-construccion',
        name: 'Maestria en Construccion',
        level: 'Maestria',
        description:
            'Programa orientado a formar investigadores y profesionales de alto nivel en ' +
            'tecnologias de la construccion, materiales innovadores, gestion de proyectos ' +
            'de obra y sustentabilidad en la edificacion.',
        icon: 'fas fa-building',
        color: '#ea580c',
        badge: 'PNPC'
    },
    {
        id: 'maestria-zona-costera',
        name: 'Maestria en Manejo de Zona Costera',
        level: 'Maestria',
        description:
            'Forma especialistas en la gestion integral de ecosistemas costeros y ' +
            'marinos, planificacion territorial del litoral, cambio climatico, ' +
            'recursos pesqueros y conservacion de la biodiversidad costera de Quintana Roo.',
        icon: 'fas fa-water',
        color: '#0ea5e9',
        badge: 'PNPC'
    },
    {
        id: 'maestria-urbanismo',
        name: 'Maestria en Urbanismo',
        level: 'Maestria',
        description:
            'Programa enfocado en la planificacion urbana y regional, diseno de ' +
            'ciudades sostenibles, movilidad, politicas publicas de vivienda y ' +
            'ordenamiento territorial con enfasis en el Caribe mexicano.',
        icon: 'fas fa-city',
        color: '#8b5cf6',
        badge: 'PNPC'
    },
    {
        id: 'doctorado-ciencias-ambientales',
        name: 'Doctorado en Ciencias Ambientales',
        level: 'Doctorado',
        description:
            'Programa de investigacion avanzada en ciencias ambientales, enfocado en ' +
            'ecosistemas tropicales, contaminacion, cambio climatico, gestion de ' +
            'recursos naturales y desarrollo sustentable.',
        icon: 'fas fa-seedling',
        color: '#16a34a',
        badge: 'PNPC'
    }
];


/* --------------------------------------------------------------------------
 * 7. createCareerCard()  -  Renders a single career card
 * -------------------------------------------------------------------------- */

function createCareerCard(career) {
    var modalityBadges = career.modality.map(function (m) {
        var label = m.charAt(0).toUpperCase() + m.slice(1);
        var badgeClass = m === 'presencial' ? 'badge-presencial' : 'badge-distancia';
        return '<span class="modality-badge ' + badgeClass + '">' + label + '</span>';
    }).join('');

    // Build data-attributes for the filter system
    var filterClasses = '';
    if (career.modality.indexOf('presencial') !== -1)  filterClasses += ' filter-presencial';
    if (career.modality.indexOf('distancia') !== -1)    filterClasses += ' filter-distancia';
    if (career.modality.indexOf('distancia mixta') !== -1) filterClasses += ' filter-distancia';
    if (career.type === 'Ingenieria')   filterClasses += ' filter-ingenieria';
    if (career.type === 'Licenciatura') filterClasses += ' filter-licenciatura';
    if (career.type === 'Arquitectura') filterClasses += ' filter-licenciatura';

    // Career card image (use first image or fallback to gradient)
    var imageHTML = '';
    if (career.images && career.images.length > 0) {
        imageHTML =
            '<div class="career-image-wrapper">' +
                '<img src="' + career.images[0] + '" alt="' + career.name + '" class="career-image" loading="lazy" onerror="this.parentElement.style.display=\'none\'">' +
                '<div class="career-image-overlay" style="background:linear-gradient(180deg,transparent 30%,' + career.color + 'dd 100%);"></div>' +
                '<div class="career-image-icon"><i class="' + career.icon + '"></i></div>' +
                '<span class="career-image-badge" style="background:' + career.color + ';">' + career.type + '</span>' +
            '</div>';
    } else {
        imageHTML =
            '<div class="career-image-wrapper career-no-image" style="background:linear-gradient(135deg,' + career.color + '22,' + career.color + '08);">' +
                '<div class="career-image-icon career-icon-only"><i class="' + career.icon + '" style="color:' + career.color + ';"></i></div>' +
                '<span class="career-image-badge" style="background:' + career.color + ';">' + career.type + '</span>' +
            '</div>';
    }

    return (
        '<div class="col-md-6 col-xl-4 career-col' + filterClasses + '">' +
            '<div class="career-card h-100" data-career-id="' + career.id + '">' +
                imageHTML +
                '<div class="career-body">' +
                    '<h4 class="career-title">' + career.name + '</h4>' +
                    '<div class="career-modalities">' + modalityBadges + '</div>' +
                    '<p class="career-description">' + career.description + '</p>' +
                    '<div class="career-meta-row">' +
                        '<span class="career-duration"><i class="fas fa-clock me-1"></i>' + career.duration + '</span>' +
                        '<span class="career-photo-count" title="Fotografias"><i class="fas fa-camera me-1"></i>' + (career.images ? career.images.length : 0) + '</span>' +
                    '</div>' +
                '</div>' +
                '<div class="career-footer">' +
                    '<button class="btn btn-career-details" ' +
                        'style="color:' + career.color + ';border-color:' + career.color + ';" ' +
                        'onclick="showCareerDetails(\'' + career.id + '\')" ' +
                        'aria-label="Mas informacion sobre ' + career.name + '">' +
                        '<i class="fas fa-info-circle me-1"></i>Mas informacion' +
                    '</button>' +
                '</div>' +
            '</div>' +
        '</div>'
    );
}


/* --------------------------------------------------------------------------
 * 8. createPosgradoCard()  -  Renders a single posgrado card
 * -------------------------------------------------------------------------- */

function createPosgradoCard(posgrado) {
    return (
        '<div class="col-md-6 col-xl-3">' +
            '<div class="posgrado-card h-100">' +
                '<div class="posgrado-badge-ribbon">' + posgrado.badge + '</div>' +
                '<div class="posgrado-icon" style="background:linear-gradient(135deg,' +
                    posgrado.color + ',' + posgrado.color + 'bb);">' +
                    '<i class="' + posgrado.icon + '"></i>' +
                '</div>' +
                '<span class="posgrado-level" style="background:' +
                    posgrado.color + '18;color:' + posgrado.color + ';">' +
                    posgrado.level +
                '</span>' +
                '<h4 class="posgrado-title">' + posgrado.name + '</h4>' +
                '<p class="posgrado-description">' + posgrado.description + '</p>' +
            '</div>' +
        '</div>'
    );
}


/* --------------------------------------------------------------------------
 * 5b. Render careers grid
 * -------------------------------------------------------------------------- */

function initializeCareersGrid() {
    var grid = document.getElementById('careers-grid');
    if (!grid) return;

    var html = careersData.map(function (career) {
        return createCareerCard(career);
    }).join('');

    grid.innerHTML = html;
}


/* --------------------------------------------------------------------------
 * 6b. Render posgrados grid
 * -------------------------------------------------------------------------- */

function initializePosgradosGrid() {
    var grid = document.getElementById('posgrados-grid');
    if (!grid) return;

    var html = posgradosData.map(function (posgrado) {
        return createPosgradoCard(posgrado);
    }).join('');

    grid.innerHTML = html;
}


/* --------------------------------------------------------------------------
 * 9. Career Filter System
 * -------------------------------------------------------------------------- */

function initializeCareerFilters() {
    var filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
    if (!filterButtons.length) return;

    filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var filter = this.getAttribute('data-filter');

            // Toggle active class
            filterButtons.forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');

            // Filter career columns
            var cards = document.querySelectorAll('.career-col');
            cards.forEach(function (col) {
                if (filter === 'all') {
                    col.style.display = '';
                    col.classList.remove('career-hidden');
                    col.classList.add('career-visible');
                    return;
                }

                var matchClass = 'filter-' + filter;
                if (col.classList.contains(matchClass)) {
                    col.style.display = '';
                    col.classList.remove('career-hidden');
                    col.classList.add('career-visible');
                } else {
                    col.classList.remove('career-visible');
                    col.classList.add('career-hidden');
                    // After animation, hide with display:none
                    setTimeout(function () {
                        if (col.classList.contains('career-hidden')) {
                            col.style.display = 'none';
                        }
                    }, 350);
                }
            });
        });
    });
}


/* --------------------------------------------------------------------------
 * 10. showCareerDetails()  -  Opens Bootstrap modal with full career info
 * -------------------------------------------------------------------------- */

function showCareerDetails(careerId) {
    var career = careersData.find(function (c) { return c.id === careerId; });
    if (!career) return;

    // Modal elements
    var modalHeader  = document.getElementById('careerModalHeader');
    var modalIcon    = document.getElementById('modalCareerIcon');
    var modalTitle   = document.getElementById('careerModalLabel');
    var modalType    = document.getElementById('modalCareerType');
    var modalBody    = document.getElementById('careerModalBody');

    if (!modalHeader || !modalBody) return;

    // Set header colour
    modalHeader.style.background = 'linear-gradient(135deg,' + career.color + ',' + career.color + 'cc)';

    // Set icon
    modalIcon.innerHTML = '<i class="' + career.icon + '" style="font-size:1.8rem;color:#fff;"></i>';

    // Set title and type
    modalTitle.textContent = career.name;
    modalType.textContent  = career.type;

    // Modality badges
    var modalityHTML = career.modality.map(function (m) {
        var label = m.charAt(0).toUpperCase() + m.slice(1);
        return '<span class="modal-modality-badge">' + label + '</span>';
    }).join('');

    // Skills list
    var skillsHTML = career.skills.map(function (s) {
        return '<li><i class="fas fa-check-circle me-2" style="color:' + career.color + ';"></i>' + s + '</li>';
    }).join('');

    // Opportunities list
    var oppsHTML = career.opportunities.map(function (o) {
        return '<li><i class="fas fa-briefcase me-2" style="color:' + career.color + ';"></i>' + o + '</li>';
    }).join('');

    // Photo gallery (if images exist)
    var galleryHTML = '';
    if (career.images && career.images.length > 0) {
        var galleryItems = career.images.map(function (img, idx) {
            return '<div class="gallery-item' + (idx === 0 ? ' gallery-item-large' : '') + '">' +
                '<img src="' + img + '" alt="' + career.name + ' - Foto ' + (idx + 1) + '" loading="lazy" onclick="this.classList.toggle(\'gallery-zoom\')" onerror="this.parentElement.style.display=\'none\'">' +
            '</div>';
        }).join('');

        galleryHTML =
            '<div class="detail-section">' +
                '<h6 class="detail-heading"><i class="fas fa-images me-2"></i>Galeria fotografica</h6>' +
                '<div class="detail-gallery">' + galleryItems + '</div>' +
            '</div>';
    }

    // Build body
    modalBody.innerHTML =
        '<div class="modal-career-detail">' +
            // Photo gallery at the top
            galleryHTML +

            // Description
            '<div class="detail-section">' +
                '<h6 class="detail-heading"><i class="fas fa-book-open me-2"></i>Descripcion del programa</h6>' +
                '<p class="detail-text">' + career.description + '</p>' +
            '</div>' +

            // Info row: duration, modality
            '<div class="detail-info-row">' +
                '<div class="detail-info-item">' +
                    '<i class="fas fa-calendar-alt" style="color:' + career.color + ';"></i>' +
                    '<div>' +
                        '<span class="detail-info-label">Duracion</span>' +
                        '<span class="detail-info-value">' + career.duration + '</span>' +
                    '</div>' +
                '</div>' +
                '<div class="detail-info-item">' +
                    '<i class="fas fa-chalkboard-teacher" style="color:' + career.color + ';"></i>' +
                    '<div>' +
                        '<span class="detail-info-label">Modalidad</span>' +
                        '<span class="detail-info-value">' + modalityHTML + '</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +

            // Profile
            '<div class="detail-section">' +
                '<h6 class="detail-heading"><i class="fas fa-user-graduate me-2"></i>Perfil del aspirante</h6>' +
                '<p class="detail-text">' + career.profile + '</p>' +
            '</div>' +

            // Skills
            '<div class="detail-section">' +
                '<h6 class="detail-heading"><i class="fas fa-cogs me-2"></i>Competencias que desarrollaras</h6>' +
                '<ul class="detail-list">' + skillsHTML + '</ul>' +
            '</div>' +

            // Opportunities
            '<div class="detail-section">' +
                '<h6 class="detail-heading"><i class="fas fa-rocket me-2"></i>Campo laboral</h6>' +
                '<ul class="detail-list">' + oppsHTML + '</ul>' +
            '</div>' +

            // CTA
            '<div class="detail-cta">' +
                '<button class="btn btn-lg btn-career-cta" ' +
                    'style="background:' + career.color + ';color:#fff;" ' +
                    'onclick="scrollToSection(\'contacto\');' +
                    'bootstrap.Modal.getOrCreateInstance(document.getElementById(\'careerModal\')).hide();">' +
                    '<i class="fas fa-envelope me-2"></i>Solicitar mas informacion' +
                '</button>' +
            '</div>' +
        '</div>';

    // Show the modal
    var modalEl   = document.getElementById('careerModal');
    var bsModal   = bootstrap.Modal.getOrCreateInstance(modalEl);
    bsModal.show();
}


/* --------------------------------------------------------------------------
 * 11. scrollToSection()  -  Utility for programmatic smooth scroll
 * -------------------------------------------------------------------------- */

function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (!section) return;

    var offset = section.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: offset, behavior: 'smooth' });
}


/* --------------------------------------------------------------------------
 * 12. showNotification()  -  Utility for toast-style notifications
 * -------------------------------------------------------------------------- */

function showNotification(message, type) {
    type = type || 'info';

    var iconMap = {
        success: 'fa-check-circle',
        error:   'fa-exclamation-triangle',
        warning: 'fa-exclamation-circle',
        info:    'fa-info-circle'
    };

    var alertClass = type === 'error' ? 'danger' : type;
    var icon       = iconMap[type] || iconMap.info;

    var notification = document.createElement('div');
    notification.className = 'notification-popup alert alert-' + alertClass;
    notification.setAttribute('role', 'alert');
    notification.innerHTML =
        '<div class="notification-content">' +
            '<i class="fas ' + icon + ' me-2"></i>' +
            '<span>' + message + '</span>' +
        '</div>' +
        '<button type="button" class="btn-close btn-close-sm" aria-label="Cerrar"></button>';

    document.body.appendChild(notification);

    // Trigger reflow for animation
    notification.offsetHeight; // eslint-disable-line no-unused-expressions
    notification.classList.add('notification-show');

    // Close on click
    var closeBtn = notification.querySelector('.btn-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            dismissNotification(notification);
        });
    }

    // Auto-dismiss after 5 s
    setTimeout(function () {
        dismissNotification(notification);
    }, 5000);
}

function dismissNotification(el) {
    if (!el || !el.parentElement) return;
    el.classList.add('notification-hide');
    el.addEventListener('animationend', function () {
        if (el.parentElement) el.remove();
    });
    // Fallback removal
    setTimeout(function () {
        if (el.parentElement) el.remove();
    }, 500);
}


/* --------------------------------------------------------------------------
 * Chat toggle (same as before, kept for chat-assistant.js integration)
 * -------------------------------------------------------------------------- */

function initializeChatToggle() {
    var chatToggle     = document.getElementById('chat-toggle');
    var chatContainer  = document.getElementById('chat-container');
    var chatClose      = document.getElementById('chat-close');
    var floatingBtn    = document.getElementById('floating-chat-btn');

    function openChat() {
        if (chatContainer) {
            chatContainer.classList.add('show');
            chatContainer.setAttribute('aria-hidden', 'false');
        }
    }

    function closeChat() {
        if (chatContainer) {
            chatContainer.classList.remove('show');
            chatContainer.setAttribute('aria-hidden', 'true');
        }
    }

    if (chatToggle)  chatToggle.addEventListener('click', openChat);
    if (floatingBtn) floatingBtn.addEventListener('click', openChat);
    if (chatClose)   chatClose.addEventListener('click', closeChat);

    // Close when clicking outside
    document.addEventListener('click', function (e) {
        if (!chatContainer) return;
        var isInsideChat   = chatContainer.contains(e.target);
        var isToggle       = (chatToggle  && chatToggle.contains(e.target));
        var isFloating     = (floatingBtn && floatingBtn.contains(e.target));

        if (!isInsideChat && !isToggle && !isFloating && chatContainer.classList.contains('show')) {
            closeChat();
        }
    });
}


/* --------------------------------------------------------------------------
 * 13. Back to Top Button
 * -------------------------------------------------------------------------- */

function initializeBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


/* --------------------------------------------------------------------------
 * 14. Expose global functions used by onclick attributes in HTML
 * -------------------------------------------------------------------------- */

window.scrollToSection    = scrollToSection;
window.showCareerDetails  = showCareerDetails;
window.showNotification   = showNotification;
