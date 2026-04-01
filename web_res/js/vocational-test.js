// ============================================================================
// Vocational Test - Instituto Tecnologico de Chetumal
// Vanilla JS implementation (no React/Babel dependency)
// ============================================================================

(function () {
    'use strict';

    // ------------------------------------------------------------------
    // Career definitions - 10 official ITChetumal programmes
    // ------------------------------------------------------------------
    var careers = {
        arquitectura: {
            name: 'Arquitectura',
            description: 'Forma profesionales capaces de disenar y planificar espacios habitables, proyectos urbanos y construcciones sustentables que transforman el entorno.',
            duration: '9 semestres',
            icon: 'fas fa-drafting-compass',
            color: '#8b5cf6',
            modality: ['Presencial'],
            opportunities: ['Arquitecto proyectista', 'Disenador urbano', 'Consultor en sustentabilidad', 'Director de obra'],
            skills: ['Diseno arquitectonico', 'Modelado 3D', 'Construccion sustentable', 'Planificacion urbana']
        },
        contaduria: {
            name: 'Contador Publico',
            description: 'Prepara expertos en contabilidad, finanzas, auditoria y fiscalizacion, esenciales para la salud financiera de cualquier organizacion.',
            duration: '9 semestres',
            icon: 'fas fa-calculator',
            color: '#059669',
            modality: ['Presencial', 'Distancia'],
            opportunities: ['Contador publico certificado', 'Auditor financiero', 'Asesor fiscal', 'Director de finanzas'],
            skills: ['Contabilidad financiera', 'Auditoria', 'Planeacion fiscal', 'Analisis financiero']
        },
        ingAdministracion: {
            name: 'Ingenieria en Administracion',
            description: 'Integra la ingenieria con la administracion para dirigir empresas con vision estrategica, optimizar recursos y fomentar el emprendimiento.',
            duration: '9 semestres',
            icon: 'fas fa-chart-line',
            color: '#d97706',
            modality: ['Presencial'],
            opportunities: ['Director de operaciones', 'Consultor empresarial', 'Gerente de proyectos', 'Emprendedor'],
            skills: ['Direccion estrategica', 'Optimizacion de procesos', 'Finanzas corporativas', 'Emprendimiento']
        },
        civil: {
            name: 'Ingenieria Civil',
            description: 'Forma ingenieros que disenan, construyen y supervisan infraestructura como carreteras, puentes, edificaciones y sistemas hidraulicos.',
            duration: '9 semestres',
            icon: 'fas fa-hard-hat',
            color: '#dc2626',
            modality: ['Presencial'],
            opportunities: ['Ingeniero estructural', 'Supervisor de obra', 'Disenador de infraestructura vial', 'Consultor en geotecnia'],
            skills: ['Calculo estructural', 'Supervision de obra', 'Topografia', 'Diseno de infraestructura']
        },
        electrica: {
            name: 'Ingenieria Electrica',
            description: 'Especializa profesionales en sistemas electricos de potencia, generacion de energia, circuitos y automatizacion industrial.',
            duration: '9 semestres',
            icon: 'fas fa-bolt',
            color: '#eab308',
            modality: ['Presencial'],
            opportunities: ['Ingeniero de potencia', 'Disenador de sistemas electricos', 'Especialista en energias renovables', 'Ingeniero de automatizacion'],
            skills: ['Sistemas electricos de potencia', 'Diseno de circuitos', 'Energias renovables', 'Automatizacion industrial']
        },
        gestion: {
            name: 'Ingenieria en Gestion Empresarial',
            description: 'Desarrolla lideres con habilidades para gestionar empresas, crear estrategias de mercado y dirigir equipos hacia el exito organizacional.',
            duration: '9 semestres',
            icon: 'fas fa-briefcase',
            color: '#2563eb',
            modality: ['Presencial', 'Distancia'],
            opportunities: ['Gerente general', 'Director de mercadotecnia', 'Consultor de negocios', 'Lider de desarrollo organizacional'],
            skills: ['Liderazgo estrategico', 'Mercadotecnia', 'Gestion del talento', 'Planeacion de negocios']
        },
        sistemas: {
            name: 'Ingenieria en Sistemas Computacionales',
            description: 'Forma ingenieros en desarrollo de software, administracion de bases de datos, redes de computo y seguridad informatica.',
            duration: '9 semestres',
            icon: 'fas fa-laptop-code',
            color: '#7c3aed',
            modality: ['Presencial'],
            opportunities: ['Desarrollador de software', 'Administrador de bases de datos', 'Ingeniero en ciberseguridad', 'Arquitecto de sistemas'],
            skills: ['Programacion', 'Bases de datos', 'Redes de computo', 'Ciberseguridad']
        },
        tics: {
            name: 'Ingenieria en TICs',
            description: 'Prepara profesionales en gestion de TI, telecomunicaciones, computo en la nube y transformacion digital de las organizaciones.',
            duration: '9 semestres',
            icon: 'fas fa-network-wired',
            color: '#0891b2',
            modality: ['Presencial'],
            opportunities: ['Gerente de TI', 'Especialista en telecomunicaciones', 'Arquitecto de soluciones en la nube', 'Consultor en transformacion digital'],
            skills: ['Gestion de TI', 'Telecomunicaciones', 'Computo en la nube', 'Transformacion digital']
        },
        administracion: {
            name: 'Licenciatura en Administracion',
            description: 'Forma profesionales en gestion de recursos humanos, desarrollo organizacional y administracion integral de empresas publicas y privadas.',
            duration: '9 semestres',
            icon: 'fas fa-users-cog',
            color: '#f59e0b',
            modality: ['Presencial'],
            opportunities: ['Gerente de recursos humanos', 'Coordinador administrativo', 'Analista organizacional', 'Director de desarrollo empresarial'],
            skills: ['Gestion de personal', 'Desarrollo organizacional', 'Administracion publica', 'Planeacion estrategica']
        },
        biologia: {
            name: 'Licenciatura en Biologia',
            description: 'Forma cientificos en biologia, ecologia, conservacion de la biodiversidad e investigacion ambiental para proteger los ecosistemas.',
            duration: '9 semestres',
            icon: 'fas fa-leaf',
            color: '#16a34a',
            modality: ['Presencial'],
            opportunities: ['Biologo investigador', 'Consultor ambiental', 'Especialista en conservacion', 'Gestor de recursos naturales'],
            skills: ['Investigacion cientifica', 'Ecologia de campo', 'Conservacion de biodiversidad', 'Analisis de laboratorio']
        }
    };

    // ------------------------------------------------------------------
    // 10 Questions with weighted options
    // ------------------------------------------------------------------
    var questions = [
        {
            id: 1,
            category: 'Intereses',
            icon: 'fas fa-heart',
            question: '\u00bfQue actividad te resulta mas interesante?',
            options: [
                { value: 'a', label: 'Programar aplicaciones o explorar nuevas tecnologias', weight: { sistemas: 3, tics: 3, electrica: 1 } },
                { value: 'b', label: 'Disenar espacios, planos o maquetas', weight: { arquitectura: 3, civil: 2, electrica: 1 } },
                { value: 'c', label: 'Organizar eventos, liderar equipos o crear negocios', weight: { gestion: 3, ingAdministracion: 2, administracion: 2 } },
                { value: 'd', label: 'Observar la naturaleza, hacer trabajo de campo o investigar', weight: { biologia: 3, contaduria: 1, civil: 1 } }
            ]
        },
        {
            id: 2,
            category: 'Habilidades',
            icon: 'fas fa-tools',
            question: '\u00bfCual es tu habilidad mas fuerte?',
            options: [
                { value: 'a', label: 'Logica, matematicas y pensamiento analitico', weight: { sistemas: 2, civil: 3, electrica: 3, ingAdministracion: 1 } },
                { value: 'b', label: 'Comunicacion, negociacion y trabajo en equipo', weight: { gestion: 3, administracion: 3, contaduria: 1 } },
                { value: 'c', label: 'Creatividad, diseno y vision espacial', weight: { arquitectura: 3, tics: 2, biologia: 1 } },
                { value: 'd', label: 'Orden, precision y atencion al detalle', weight: { contaduria: 3, ingAdministracion: 2, electrica: 1 } }
            ]
        },
        {
            id: 3,
            category: 'Entorno laboral',
            icon: 'fas fa-building',
            question: '\u00bfDonde te imaginas trabajando en el futuro?',
            options: [
                { value: 'a', label: 'En una oficina de tecnologia o un centro de datos', weight: { sistemas: 3, tics: 3, electrica: 1 } },
                { value: 'b', label: 'En obra, campo o supervisando construcciones', weight: { civil: 3, arquitectura: 2, electrica: 2 } },
                { value: 'c', label: 'En una empresa dirigiendo departamentos o proyectos', weight: { gestion: 3, ingAdministracion: 2, administracion: 2, contaduria: 1 } },
                { value: 'd', label: 'En un laboratorio, reserva natural o centro de investigacion', weight: { biologia: 3, contaduria: 1 } }
            ]
        },
        {
            id: 4,
            category: 'Resolucion de problemas',
            icon: 'fas fa-puzzle-piece',
            question: '\u00bfComo prefieres resolver problemas complejos?',
            options: [
                { value: 'a', label: 'Con algoritmos, codigo o herramientas digitales', weight: { sistemas: 3, tics: 2, electrica: 1 } },
                { value: 'b', label: 'Con calculos, planos y modelos fisicos', weight: { civil: 3, arquitectura: 2, electrica: 2 } },
                { value: 'c', label: 'Analizando numeros, estados financieros y presupuestos', weight: { contaduria: 3, ingAdministracion: 2, administracion: 1 } },
                { value: 'd', label: 'Investigando, experimentando y observando resultados', weight: { biologia: 3, gestion: 1, tics: 1 } }
            ]
        },
        {
            id: 5,
            category: 'Motivacion',
            icon: 'fas fa-star',
            question: '\u00bfQue te motiva mas profesionalmente?',
            options: [
                { value: 'a', label: 'Crear software que millones de personas utilicen', weight: { sistemas: 3, tics: 2 } },
                { value: 'b', label: 'Construir infraestructura que perdure por generaciones', weight: { civil: 3, arquitectura: 2, electrica: 2 } },
                { value: 'c', label: 'Dirigir una empresa exitosa o transformar organizaciones', weight: { gestion: 3, ingAdministracion: 3, administracion: 2, contaduria: 1 } },
                { value: 'd', label: 'Proteger el medio ambiente y conservar la biodiversidad', weight: { biologia: 3, arquitectura: 1 } }
            ]
        },
        {
            id: 6,
            category: 'Aprendizaje',
            icon: 'fas fa-book-reader',
            question: '\u00bfComo aprendes mejor?',
            options: [
                { value: 'a', label: 'Practicando con computadoras, simuladores o laboratorios virtuales', weight: { sistemas: 3, tics: 3, electrica: 2 } },
                { value: 'b', label: 'Dibujando, construyendo maquetas o visitando obras', weight: { arquitectura: 3, civil: 3 } },
                { value: 'c', label: 'Debatiendo, presentando ideas y trabajando en equipo', weight: { gestion: 2, administracion: 3, ingAdministracion: 2, contaduria: 1 } },
                { value: 'd', label: 'Haciendo trabajo de campo, observando y recolectando datos', weight: { biologia: 3, electrica: 1, civil: 1 } }
            ]
        },
        {
            id: 7,
            category: 'Materias favoritas',
            icon: 'fas fa-chalkboard-teacher',
            question: '\u00bfQue materias disfrutabas mas en preparatoria?',
            options: [
                { value: 'a', label: 'Informatica, programacion o tecnologia', weight: { sistemas: 3, tics: 3, electrica: 1 } },
                { value: 'b', label: 'Matematicas, fisica y dibujo tecnico', weight: { civil: 3, arquitectura: 2, electrica: 3, ingAdministracion: 1 } },
                { value: 'c', label: 'Economia, contabilidad o administracion', weight: { contaduria: 3, gestion: 2, administracion: 2, ingAdministracion: 2 } },
                { value: 'd', label: 'Biologia, ecologia o quimica', weight: { biologia: 3, arquitectura: 1 } }
            ]
        },
        {
            id: 8,
            category: 'Personalidad',
            icon: 'fas fa-user',
            question: '\u00bfComo te describirias mejor?',
            options: [
                { value: 'a', label: 'Logico, curioso y apasionado por la tecnologia', weight: { sistemas: 3, tics: 2, electrica: 2 } },
                { value: 'b', label: 'Creativo, observador y con buena vision espacial', weight: { arquitectura: 3, civil: 2, biologia: 1 } },
                { value: 'c', label: 'Emprendedor, persuasivo y con mentalidad de lider', weight: { gestion: 3, ingAdministracion: 3, administracion: 2 } },
                { value: 'd', label: 'Meticuloso, responsable y orientado a los numeros', weight: { contaduria: 3, administracion: 1, electrica: 1 } }
            ]
        },
        {
            id: 9,
            category: 'Valores',
            icon: 'fas fa-gem',
            question: '\u00bfQue valoras mas en una carrera profesional?',
            options: [
                { value: 'a', label: 'Innovacion constante y estar a la vanguardia tecnologica', weight: { sistemas: 2, tics: 3, electrica: 2, arquitectura: 1 } },
                { value: 'b', label: 'Estabilidad economica y alta demanda laboral', weight: { contaduria: 3, civil: 2, ingAdministracion: 2 } },
                { value: 'c', label: 'Independencia para emprender y generar impacto social', weight: { gestion: 3, administracion: 2, ingAdministracion: 2 } },
                { value: 'd', label: 'Contribuir a la ciencia y la conservacion del planeta', weight: { biologia: 3, arquitectura: 1, electrica: 1 } }
            ]
        },
        {
            id: 10,
            category: 'Vision de futuro',
            icon: 'fas fa-rocket',
            question: '\u00bfQue impacto quieres dejar en el mundo?',
            options: [
                { value: 'a', label: 'Transformar la sociedad con soluciones digitales y conectividad', weight: { sistemas: 2, tics: 3, electrica: 2 } },
                { value: 'b', label: 'Crear espacios y edificaciones que mejoren la calidad de vida', weight: { arquitectura: 3, civil: 3 } },
                { value: 'c', label: 'Impulsar la economia generando empleos y empresas competitivas', weight: { gestion: 2, ingAdministracion: 3, contaduria: 2, administracion: 2 } },
                { value: 'd', label: 'Preservar ecosistemas y garantizar un futuro sustentable', weight: { biologia: 3, arquitectura: 1 } }
            ]
        }
    ];

    // ------------------------------------------------------------------
    // State
    // ------------------------------------------------------------------
    var currentStep = 'intro';
    var currentQuestion = 0;
    var answers = {};
    var root;

    // ------------------------------------------------------------------
    // Utility: create element helper
    // ------------------------------------------------------------------
    function el(tag, attrs, children) {
        var elem = document.createElement(tag);
        if (attrs) {
            Object.keys(attrs).forEach(function (key) {
                if (key === 'className') {
                    elem.className = attrs[key];
                } else if (key === 'innerHTML') {
                    elem.innerHTML = attrs[key];
                } else if (key === 'textContent') {
                    elem.textContent = attrs[key];
                } else if (key.indexOf('on') === 0) {
                    elem.addEventListener(key.substring(2).toLowerCase(), attrs[key]);
                } else if (key === 'style' && typeof attrs[key] === 'object') {
                    Object.keys(attrs[key]).forEach(function (s) {
                        elem.style[s] = attrs[key][s];
                    });
                } else {
                    elem.setAttribute(key, attrs[key]);
                }
            });
        }
        if (children) {
            if (typeof children === 'string') {
                elem.innerHTML = children;
            } else if (Array.isArray(children)) {
                children.forEach(function (child) {
                    if (child) elem.appendChild(child);
                });
            } else {
                elem.appendChild(children);
            }
        }
        return elem;
    }

    // ------------------------------------------------------------------
    // Render: Intro screen
    // ------------------------------------------------------------------
    function renderIntro() {
        root.innerHTML = '';
        root.className = 'vt-container';

        var intro = el('div', { className: 'vt-intro animate-fadeIn' });

        intro.innerHTML =
            '<div class="vt-intro-visual">' +
                '<div class="vt-intro-circle"></div>' +
                '<div class="vt-intro-icon"><i class="fas fa-graduation-cap"></i></div>' +
            '</div>' +
            '<h3 class="vt-intro-title">Test Vocacional Inteligente</h3>' +
            '<p class="vt-intro-description">' +
                'Descubre cual de las <strong>10 carreras</strong> del Instituto Tecnologico de Chetumal ' +
                'se alinea mejor con tu perfil, intereses y habilidades.' +
            '</p>' +
            '<div class="vt-features">' +
                '<div class="vt-feature"><div class="vt-feature-icon"><i class="fas fa-list-ol"></i></div><span>10 preguntas</span></div>' +
                '<div class="vt-feature"><div class="vt-feature-icon"><i class="fas fa-clock"></i></div><span>5 minutos</span></div>' +
                '<div class="vt-feature"><div class="vt-feature-icon"><i class="fas fa-user-check"></i></div><span>Personalizado</span></div>' +
                '<div class="vt-feature"><div class="vt-feature-icon"><i class="fas fa-chart-bar"></i></div><span>Top 3 carreras</span></div>' +
            '</div>' +
            '<div class="vt-intro-note">' +
                '<i class="fas fa-info-circle"></i> ' +
                'Este test es orientativo y gratuito. No requiere registro.' +
            '</div>';

        var startBtn = el('button', {
            className: 'btn btn-primary btn-lg vt-start-btn',
            onClick: function () {
                currentStep = 'questions';
                currentQuestion = 0;
                answers = {};
                renderQuestion();
            }
        });
        startBtn.innerHTML = '<i class="fas fa-play me-2"></i>Comenzar Test';
        intro.appendChild(startBtn);

        root.appendChild(intro);
    }

    // ------------------------------------------------------------------
    // Render: Question screen
    // ------------------------------------------------------------------
    function renderQuestion() {
        root.innerHTML = '';
        root.className = 'vt-container';

        var q = questions[currentQuestion];
        var progress = ((currentQuestion + 1) / questions.length) * 100;

        var wrapper = el('div', { className: 'vt-question animate-fadeIn' });

        // Progress bar
        var header = el('div', { className: 'vt-question-header' });
        header.innerHTML =
            '<div class="vt-progress-bar"><div class="vt-progress-fill" style="width:' + progress + '%"></div></div>' +
            '<div class="vt-question-meta">' +
                '<span class="vt-question-counter">Pregunta ' + (currentQuestion + 1) + ' de ' + questions.length + '</span>' +
                '<span class="vt-question-category"><i class="' + q.icon + ' me-1"></i>' + q.category + '</span>' +
            '</div>';
        wrapper.appendChild(header);

        // Question text
        var body = el('div', { className: 'vt-question-body' });
        var qText = el('h3', { className: 'vt-question-text', textContent: q.question });
        body.appendChild(qText);

        // Options
        var optionsContainer = el('div', { className: 'vt-options' });
        q.options.forEach(function (option, index) {
            var optBtn = el('button', {
                className: 'vt-option-btn',
                onClick: function () {
                    handleAnswer(q.id, option.value);
                }
            });
            optBtn.innerHTML =
                '<span class="vt-option-letter">' + String.fromCharCode(65 + index) + '</span>' +
                '<span class="vt-option-label">' + option.label + '</span>' +
                '<i class="fas fa-arrow-right vt-option-arrow"></i>';
            optionsContainer.appendChild(optBtn);
        });
        body.appendChild(optionsContainer);

        // Back button (if not first question)
        if (currentQuestion > 0) {
            var backBtn = el('button', {
                className: 'btn btn-outline-secondary vt-back-btn',
                onClick: function () {
                    currentQuestion--;
                    renderQuestion();
                }
            });
            backBtn.innerHTML = '<i class="fas fa-arrow-left me-2"></i>Pregunta anterior';
            body.appendChild(backBtn);
        }

        wrapper.appendChild(body);
        root.appendChild(wrapper);
    }

    // ------------------------------------------------------------------
    // Handle answer selection
    // ------------------------------------------------------------------
    function handleAnswer(questionId, value) {
        answers[questionId] = { questionId: questionId, value: value };

        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuestion();
        } else {
            processAnswers();
        }
    }

    // ------------------------------------------------------------------
    // Process answers and calculate scores
    // ------------------------------------------------------------------
    function processAnswers() {
        currentStep = 'processing';
        renderProcessing();

        var processingSteps = root.querySelectorAll('.vt-step');
        var stepIndex = 0;

        // Animate steps
        var stepInterval = setInterval(function () {
            if (stepIndex < processingSteps.length) {
                processingSteps[stepIndex].classList.add('active');
                stepIndex++;
            }
        }, 700);

        // Calculate after animation
        setTimeout(function () {
            clearInterval(stepInterval);

            var scores = {};
            Object.keys(careers).forEach(function (key) {
                scores[key] = 0;
            });

            // Accumulate weights
            Object.values(answers).forEach(function (answer) {
                var question = questions.find(function (q) { return q.id === answer.questionId; });
                if (!question) return;
                var selectedOption = question.options.find(function (opt) { return opt.value === answer.value; });
                if (!selectedOption) return;

                Object.keys(selectedOption.weight).forEach(function (careerKey) {
                    if (scores[careerKey] !== undefined) {
                        scores[careerKey] += selectedOption.weight[careerKey];
                    }
                });
            });

            var maxPossible = questions.length * 3;

            // Sort and get top 3
            var sortedCareers = Object.keys(scores)
                .map(function (key) {
                    return {
                        key: key,
                        career: careers[key],
                        score: scores[key],
                        compatibility: Math.min(Math.round((scores[key] / maxPossible) * 100), 95)
                    };
                })
                .sort(function (a, b) { return b.score - a.score; })
                .slice(0, 3);

            currentStep = 'results';
            renderResults(sortedCareers);
        }, 2800);
    }

    // ------------------------------------------------------------------
    // Render: Processing animation
    // ------------------------------------------------------------------
    function renderProcessing() {
        root.innerHTML = '';
        root.className = 'vt-container';

        var wrapper = el('div', { className: 'vt-processing animate-fadeIn' });
        wrapper.innerHTML =
            '<div class="vt-processing-content">' +
                '<div class="vt-spinner-wrapper">' +
                    '<div class="vt-spinner"></div>' +
                    '<div class="vt-spinner-icon"><i class="fas fa-brain"></i></div>' +
                '</div>' +
                '<h3 class="vt-processing-title">Analizando tus respuestas...</h3>' +
                '<p class="vt-processing-subtitle">Estamos evaluando tu perfil vocacional con base en tus respuestas.</p>' +
                '<div class="vt-processing-steps">' +
                    '<div class="vt-step"><i class="fas fa-user-check"></i><span>Analizando perfil</span></div>' +
                    '<div class="vt-step"><i class="fas fa-cogs"></i><span>Procesando datos</span></div>' +
                    '<div class="vt-step"><i class="fas fa-chart-pie"></i><span>Calculando compatibilidad</span></div>' +
                    '<div class="vt-step"><i class="fas fa-trophy"></i><span>Generando resultados</span></div>' +
                '</div>' +
            '</div>';
        root.appendChild(wrapper);
    }

    // ------------------------------------------------------------------
    // Render: Results screen
    // ------------------------------------------------------------------
    function renderResults(sortedCareers) {
        root.innerHTML = '';
        root.className = 'vt-container';

        var wrapper = el('div', { className: 'vt-results animate-fadeIn' });

        // Header
        var header = el('div', { className: 'vt-results-header' });
        header.innerHTML =
            '<div class="vt-results-trophy"><i class="fas fa-trophy"></i></div>' +
            '<h3 class="vt-results-title">Resultados de tu Test Vocacional</h3>' +
            '<p class="vt-results-subtitle">Basado en tu perfil, estas son las carreras mas compatibles contigo:</p>';
        wrapper.appendChild(header);

        // Career cards
        var list = el('div', { className: 'vt-results-list' });
        sortedCareers.forEach(function (item, index) {
            var career = item.career;
            var card = el('div', { className: 'vt-career-card' + (index === 0 ? ' vt-best-match' : '') });

            // Position badge
            var positions = ['1ra Opcion', '2da Opcion', '3ra Opcion'];
            var positionBadge = '<span class="vt-position-badge" style="background:' + career.color + ';">' +
                '<i class="fas fa-medal me-1"></i>' + positions[index] + '</span>';

            // Skills tags
            var skillsTags = career.skills.map(function (skill) {
                return '<span class="vt-tag vt-tag-skill">' + skill + '</span>';
            }).join('');

            // Opportunities tags
            var oppsTags = career.opportunities.map(function (opp) {
                return '<span class="vt-tag vt-tag-opp">' + opp + '</span>';
            }).join('');

            // Modality
            var modalityBadges = career.modality.map(function (m) {
                return '<span class="vt-modality-badge">' + m + '</span>';
            }).join('');

            card.innerHTML =
                '<div class="vt-career-top">' +
                    '<div class="vt-career-icon" style="background-color:' + career.color + ';">' +
                        '<i class="' + career.icon + '"></i>' +
                    '</div>' +
                    '<div class="vt-career-info">' +
                        '<div class="vt-career-name-row">' +
                            '<h4 class="vt-career-name">' + career.name + '</h4>' +
                            positionBadge +
                        '</div>' +
                        '<div class="vt-compat-row">' +
                            '<span class="vt-compat-pct" style="color:' + career.color + ';">' + item.compatibility + '% Compatible</span>' +
                            (index === 0 ? '<span class="vt-best-badge"><i class="fas fa-star me-1"></i>Mejor opcion</span>' : '') +
                        '</div>' +
                        '<div class="vt-compat-bar"><div class="vt-compat-fill" style="width:' + item.compatibility + '%;background-color:' + career.color + ';"></div></div>' +
                    '</div>' +
                '</div>' +
                '<div class="vt-career-body">' +
                    '<p class="vt-career-desc">' + career.description + '</p>' +
                    '<div class="vt-career-meta">' +
                        '<div class="vt-meta-item"><i class="fas fa-clock"></i><span>Duracion: ' + career.duration + '</span></div>' +
                        '<div class="vt-meta-item"><i class="fas fa-university"></i><span>Modalidad: ' + modalityBadges + '</span></div>' +
                    '</div>' +
                    '<div class="vt-career-section">' +
                        '<h5><i class="fas fa-cogs me-2"></i>Habilidades clave</h5>' +
                        '<div class="vt-tags">' + skillsTags + '</div>' +
                    '</div>' +
                    '<div class="vt-career-section">' +
                        '<h5><i class="fas fa-briefcase me-2"></i>Campo laboral</h5>' +
                        '<div class="vt-tags">' + oppsTags + '</div>' +
                    '</div>' +
                '</div>';

            list.appendChild(card);
        });
        wrapper.appendChild(list);

        // Actions
        var actions = el('div', { className: 'vt-results-actions' });

        var contactBtn = el('button', {
            className: 'btn btn-primary btn-lg',
            onClick: function () {
                var section = document.getElementById('contacto');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
            }
        });
        contactBtn.innerHTML = '<i class="fas fa-envelope me-2"></i>Solicitar informacion';

        var retryBtn = el('button', {
            className: 'btn btn-outline-primary btn-lg',
            onClick: function () {
                currentStep = 'intro';
                currentQuestion = 0;
                answers = {};
                renderIntro();
            }
        });
        retryBtn.innerHTML = '<i class="fas fa-redo me-2"></i>Realizar test nuevamente';

        var shareBtn = el('button', {
            className: 'btn btn-outline-secondary btn-lg',
            onClick: function () {
                var topCareer = sortedCareers[0].career.name;
                var text = 'Hice el test vocacional del ITChetumal y mi carrera ideal es ' + topCareer + '! Descubre la tuya en:';
                if (navigator.share) {
                    navigator.share({ title: 'Test Vocacional ITChetumal', text: text, url: window.location.href });
                } else if (navigator.clipboard) {
                    navigator.clipboard.writeText(text + ' ' + window.location.href);
                    if (window.showNotification) {
                        window.showNotification('Enlace copiado al portapapeles', 'success');
                    }
                }
            }
        });
        shareBtn.innerHTML = '<i class="fas fa-share-alt me-2"></i>Compartir resultado';

        actions.appendChild(contactBtn);
        actions.appendChild(retryBtn);
        actions.appendChild(shareBtn);
        wrapper.appendChild(actions);

        root.appendChild(wrapper);

        // Animate cards with stagger
        var cardsToAnimate = root.querySelectorAll('.vt-career-card');
        cardsToAnimate.forEach(function (card, i) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(function () {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 + (i * 200));
        });
    }

    // ------------------------------------------------------------------
    // Initialize
    // ------------------------------------------------------------------
    function init() {
        root = document.getElementById('vocational-test-root');
        if (!root) return;
        renderIntro();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
