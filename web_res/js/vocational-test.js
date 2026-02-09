// Vocational Test Component - Instituto Tecnologico de Chetumal
// React-based interactive vocational assessment with all 10 official careers
const { useState, useEffect, useRef } = React;

function VocationalTest() {
    const [currentStep, setCurrentStep] = useState('intro');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [activeProcessingStep, setActiveProcessingStep] = useState(0);

    // ---------------------------------------------------------------
    // Career definitions - 10 official programmes of ITChetumal
    // ---------------------------------------------------------------
    const careers = {
        arquitectura: {
            name: 'Arquitectura',
            description: 'Forma profesionales capaces de disenar y planificar espacios habitables, proyectos urbanos y construcciones sustentables que transforman el entorno.',
            duration: '9 semestres',
            icon: 'fas fa-drafting-compass',
            color: '#8b5cf6',
            modality: ['Presencial'],
            opportunities: [
                'Arquitecto proyectista',
                'Disenador urbano',
                'Consultor en sustentabilidad',
                'Director de obra'
            ],
            skills: [
                'Diseno arquitectonico',
                'Modelado 3D',
                'Construccion sustentable',
                'Planificacion urbana'
            ]
        },
        contaduria: {
            name: 'Contador Publico',
            description: 'Prepara expertos en contabilidad, finanzas, auditoria y fiscalizacion, esenciales para la salud financiera de cualquier organizacion.',
            duration: '9 semestres',
            icon: 'fas fa-calculator',
            color: '#059669',
            modality: ['Presencial', 'Distancia'],
            opportunities: [
                'Contador publico certificado',
                'Auditor financiero',
                'Asesor fiscal',
                'Director de finanzas'
            ],
            skills: [
                'Contabilidad financiera',
                'Auditoria',
                'Planeacion fiscal',
                'Analisis financiero'
            ]
        },
        ingAdministracion: {
            name: 'Ingenieria en Administracion',
            description: 'Integra la ingenieria con la administracion para dirigir empresas con vision estrategica, optimizar recursos y fomentar el emprendimiento.',
            duration: '9 semestres',
            icon: 'fas fa-chart-line',
            color: '#d97706',
            modality: ['Presencial'],
            opportunities: [
                'Director de operaciones',
                'Consultor empresarial',
                'Gerente de proyectos',
                'Emprendedor'
            ],
            skills: [
                'Direccion estrategica',
                'Optimizacion de procesos',
                'Finanzas corporativas',
                'Emprendimiento'
            ]
        },
        civil: {
            name: 'Ingenieria Civil',
            description: 'Forma ingenieros que disenan, construyen y supervisan infraestructura como carreteras, puentes, edificaciones y sistemas hidraulicos.',
            duration: '9 semestres',
            icon: 'fas fa-hard-hat',
            color: '#dc2626',
            modality: ['Presencial'],
            opportunities: [
                'Ingeniero estructural',
                'Supervisor de obra',
                'Disenador de infraestructura vial',
                'Consultor en geotecnia'
            ],
            skills: [
                'Calculo estructural',
                'Supervision de obra',
                'Topografia',
                'Diseno de infraestructura'
            ]
        },
        electrica: {
            name: 'Ingenieria Electrica',
            description: 'Especializa profesionales en sistemas electricos de potencia, generacion de energia, circuitos y automatizacion industrial.',
            duration: '9 semestres',
            icon: 'fas fa-bolt',
            color: '#eab308',
            modality: ['Presencial'],
            opportunities: [
                'Ingeniero de potencia',
                'Disenador de sistemas electricos',
                'Especialista en energias renovables',
                'Ingeniero de automatizacion'
            ],
            skills: [
                'Sistemas electricos de potencia',
                'Diseno de circuitos',
                'Energias renovables',
                'Automatizacion industrial'
            ]
        },
        gestion: {
            name: 'Ingenieria en Gestion Empresarial',
            description: 'Desarrolla lideres con habilidades para gestionar empresas, crear estrategias de mercado y dirigir equipos hacia el exito organizacional.',
            duration: '9 semestres',
            icon: 'fas fa-briefcase',
            color: '#2563eb',
            modality: ['Presencial', 'Distancia'],
            opportunities: [
                'Gerente general',
                'Director de mercadotecnia',
                'Consultor de negocios',
                'Lider de desarrollo organizacional'
            ],
            skills: [
                'Liderazgo estrategico',
                'Mercadotecnia',
                'Gestion del talento',
                'Planeacion de negocios'
            ]
        },
        sistemas: {
            name: 'Ingenieria en Sistemas Computacionales',
            description: 'Forma ingenieros en desarrollo de software, administracion de bases de datos, redes de computo y seguridad informatica.',
            duration: '9 semestres',
            icon: 'fas fa-laptop-code',
            color: '#7c3aed',
            modality: ['Presencial', 'Distancia'],
            opportunities: [
                'Desarrollador de software',
                'Administrador de bases de datos',
                'Ingeniero en ciberseguridad',
                'Arquitecto de sistemas'
            ],
            skills: [
                'Programacion',
                'Bases de datos',
                'Redes de computo',
                'Ciberseguridad'
            ]
        },
        tics: {
            name: 'Ingenieria en Tecnologias de la Informacion y Comunicaciones',
            description: 'Prepara profesionales en gestion de TI, telecomunicaciones, computo en la nube y transformacion digital de las organizaciones.',
            duration: '9 semestres',
            icon: 'fas fa-network-wired',
            color: '#0891b2',
            modality: ['Presencial'],
            opportunities: [
                'Gerente de TI',
                'Especialista en telecomunicaciones',
                'Arquitecto de soluciones en la nube',
                'Consultor en transformacion digital'
            ],
            skills: [
                'Gestion de TI',
                'Telecomunicaciones',
                'Computo en la nube',
                'Transformacion digital'
            ]
        },
        administracion: {
            name: 'Licenciatura en Administracion',
            description: 'Forma profesionales en gestion de recursos humanos, desarrollo organizacional y administracion integral de empresas publicas y privadas.',
            duration: '9 semestres',
            icon: 'fas fa-users-cog',
            color: '#f59e0b',
            modality: ['Presencial', 'Distancia'],
            opportunities: [
                'Gerente de recursos humanos',
                'Coordinador administrativo',
                'Analista organizacional',
                'Director de desarrollo empresarial'
            ],
            skills: [
                'Gestion de personal',
                'Desarrollo organizacional',
                'Administracion publica',
                'Planeacion estrategica'
            ]
        },
        biologia: {
            name: 'Licenciatura en Biologia',
            description: 'Forma cientificos en biologia, ecologia, conservacion de la biodiversidad e investigacion ambiental para proteger los ecosistemas.',
            duration: '9 semestres',
            icon: 'fas fa-leaf',
            color: '#16a34a',
            modality: ['Presencial'],
            opportunities: [
                'Biologo investigador',
                'Consultor ambiental',
                'Especialista en conservacion',
                'Gestor de recursos naturales'
            ],
            skills: [
                'Investigacion cientifica',
                'Ecologia de campo',
                'Conservacion de biodiversidad',
                'Analisis de laboratorio'
            ]
        }
    };

    // ---------------------------------------------------------------
    // 10 Questions - each option maps weights (1-3) to career keys
    // ---------------------------------------------------------------
    const questions = [
        {
            id: 1,
            category: 'interests',
            question: 'Que actividad te resulta mas interesante?',
            options: [
                {
                    value: 'a',
                    label: 'Programar aplicaciones o explorar nuevas tecnologias',
                    weight: { sistemas: 3, tics: 3, electrica: 1 }
                },
                {
                    value: 'b',
                    label: 'Disenar espacios, planos o maquetas',
                    weight: { arquitectura: 3, civil: 2, electrica: 1 }
                },
                {
                    value: 'c',
                    label: 'Organizar eventos, liderar equipos o crear negocios',
                    weight: { gestion: 3, ingAdministracion: 2, administracion: 2 }
                },
                {
                    value: 'd',
                    label: 'Observar la naturaleza, hacer trabajo de campo o investigar',
                    weight: { biologia: 3, contaduria: 1, civil: 1 }
                }
            ]
        },
        {
            id: 2,
            category: 'skills',
            question: 'Cual es tu habilidad mas fuerte?',
            options: [
                {
                    value: 'a',
                    label: 'Logica, matematicas y pensamiento analitico',
                    weight: { sistemas: 2, civil: 3, electrica: 3, ingAdministracion: 1 }
                },
                {
                    value: 'b',
                    label: 'Comunicacion, negociacion y trabajo en equipo',
                    weight: { gestion: 3, administracion: 3, contaduria: 1 }
                },
                {
                    value: 'c',
                    label: 'Creatividad, diseno y vision espacial',
                    weight: { arquitectura: 3, tics: 2, biologia: 1 }
                },
                {
                    value: 'd',
                    label: 'Orden, precision y atencion al detalle',
                    weight: { contaduria: 3, ingAdministracion: 2, electrica: 1 }
                }
            ]
        },
        {
            id: 3,
            category: 'work_environment',
            question: 'Donde te imaginas trabajando en el futuro?',
            options: [
                {
                    value: 'a',
                    label: 'En una oficina de tecnologia o un centro de datos',
                    weight: { sistemas: 3, tics: 3, electrica: 1 }
                },
                {
                    value: 'b',
                    label: 'En obra, campo o supervisando construcciones',
                    weight: { civil: 3, arquitectura: 2, electrica: 2 }
                },
                {
                    value: 'c',
                    label: 'En una empresa dirigiendo departamentos o proyectos',
                    weight: { gestion: 3, ingAdministracion: 2, administracion: 2, contaduria: 1 }
                },
                {
                    value: 'd',
                    label: 'En un laboratorio, reserva natural o centro de investigacion',
                    weight: { biologia: 3, contaduria: 1 }
                }
            ]
        },
        {
            id: 4,
            category: 'problem_solving',
            question: 'Como prefieres resolver problemas complejos?',
            options: [
                {
                    value: 'a',
                    label: 'Con algoritmos, codigo o herramientas digitales',
                    weight: { sistemas: 3, tics: 2, electrica: 1 }
                },
                {
                    value: 'b',
                    label: 'Con calculos, planos y modelos fisicos',
                    weight: { civil: 3, arquitectura: 2, electrica: 2 }
                },
                {
                    value: 'c',
                    label: 'Analizando numeros, estados financieros y presupuestos',
                    weight: { contaduria: 3, ingAdministracion: 2, administracion: 1 }
                },
                {
                    value: 'd',
                    label: 'Investigando, experimentando y observando resultados',
                    weight: { biologia: 3, gestion: 1, tics: 1 }
                }
            ]
        },
        {
            id: 5,
            category: 'goals',
            question: 'Que te motiva mas profesionalmente?',
            options: [
                {
                    value: 'a',
                    label: 'Crear software que millones de personas utilicen',
                    weight: { sistemas: 3, tics: 2 }
                },
                {
                    value: 'b',
                    label: 'Construir infraestructura que perdure por generaciones',
                    weight: { civil: 3, arquitectura: 2, electrica: 2 }
                },
                {
                    value: 'c',
                    label: 'Dirigir una empresa exitosa o transformar organizaciones',
                    weight: { gestion: 3, ingAdministracion: 3, administracion: 2, contaduria: 1 }
                },
                {
                    value: 'd',
                    label: 'Proteger el medio ambiente y conservar la biodiversidad',
                    weight: { biologia: 3, arquitectura: 1 }
                }
            ]
        },
        {
            id: 6,
            category: 'learning',
            question: 'Como aprendes mejor?',
            options: [
                {
                    value: 'a',
                    label: 'Practicando con computadoras, simuladores o laboratorios virtuales',
                    weight: { sistemas: 3, tics: 3, electrica: 2 }
                },
                {
                    value: 'b',
                    label: 'Dibujando, construyendo maquetas o visitando obras',
                    weight: { arquitectura: 3, civil: 3 }
                },
                {
                    value: 'c',
                    label: 'Debatiendo, presentando ideas y trabajando en equipo',
                    weight: { gestion: 2, administracion: 3, ingAdministracion: 2, contaduria: 1 }
                },
                {
                    value: 'd',
                    label: 'Haciendo trabajo de campo, observando y recolectando datos',
                    weight: { biologia: 3, electrica: 1, civil: 1 }
                }
            ]
        },
        {
            id: 7,
            category: 'subjects',
            question: 'Que materias disfrutabas mas en preparatoria?',
            options: [
                {
                    value: 'a',
                    label: 'Informatica, programacion o tecnologia',
                    weight: { sistemas: 3, tics: 3, electrica: 1 }
                },
                {
                    value: 'b',
                    label: 'Matematicas, fisica y dibujo tecnico',
                    weight: { civil: 3, arquitectura: 2, electrica: 3, ingAdministracion: 1 }
                },
                {
                    value: 'c',
                    label: 'Economia, contabilidad o administracion',
                    weight: { contaduria: 3, gestion: 2, administracion: 2, ingAdministracion: 2 }
                },
                {
                    value: 'd',
                    label: 'Biologia, ecologia o quimica',
                    weight: { biologia: 3, arquitectura: 1 }
                }
            ]
        },
        {
            id: 8,
            category: 'personality',
            question: 'Como te describirias mejor?',
            options: [
                {
                    value: 'a',
                    label: 'Logico, curioso y apasionado por la tecnologia',
                    weight: { sistemas: 3, tics: 2, electrica: 2 }
                },
                {
                    value: 'b',
                    label: 'Creativo, observador y con buena vision espacial',
                    weight: { arquitectura: 3, civil: 2, biologia: 1 }
                },
                {
                    value: 'c',
                    label: 'Emprendedor, persuasivo y con mentalidad de lider',
                    weight: { gestion: 3, ingAdministracion: 3, administracion: 2 }
                },
                {
                    value: 'd',
                    label: 'Meticuloso, responsable y orientado a los numeros',
                    weight: { contaduria: 3, administracion: 1, electrica: 1 }
                }
            ]
        },
        {
            id: 9,
            category: 'values',
            question: 'Que valoras mas en una carrera profesional?',
            options: [
                {
                    value: 'a',
                    label: 'Innovacion constante y estar a la vanguardia tecnologica',
                    weight: { sistemas: 2, tics: 3, electrica: 2, arquitectura: 1 }
                },
                {
                    value: 'b',
                    label: 'Estabilidad economica y alta demanda laboral',
                    weight: { contaduria: 3, civil: 2, ingAdministracion: 2 }
                },
                {
                    value: 'c',
                    label: 'Independencia para emprender y generar impacto social',
                    weight: { gestion: 3, administracion: 2, ingAdministracion: 2 }
                },
                {
                    value: 'd',
                    label: 'Contribuir a la ciencia y la conservacion del planeta',
                    weight: { biologia: 3, arquitectura: 1, electrica: 1 }
                }
            ]
        },
        {
            id: 10,
            category: 'future_vision',
            question: 'Que impacto quieres dejar en el mundo?',
            options: [
                {
                    value: 'a',
                    label: 'Transformar la sociedad con soluciones digitales y conectividad',
                    weight: { sistemas: 2, tics: 3, electrica: 2 }
                },
                {
                    value: 'b',
                    label: 'Crear espacios y edificaciones que mejoren la calidad de vida',
                    weight: { arquitectura: 3, civil: 3 }
                },
                {
                    value: 'c',
                    label: 'Impulsar la economia generando empleos y empresas competitivas',
                    weight: { gestion: 2, ingAdministracion: 3, contaduria: 2, administracion: 2 }
                },
                {
                    value: 'd',
                    label: 'Preservar ecosistemas y garantizar un futuro sustentable',
                    weight: { biologia: 3, arquitectura: 1 }
                }
            ]
        }
    ];

    // ---------------------------------------------------------------
    // Score calculation
    // ---------------------------------------------------------------
    const processAnswers = () => {
        setIsProcessing(true);
        setCurrentStep('processing');
        setActiveProcessingStep(0);

        // Animate processing steps
        const timers = [];
        timers.push(setTimeout(() => setActiveProcessingStep(1), 800));
        timers.push(setTimeout(() => setActiveProcessingStep(2), 1600));

        timers.push(setTimeout(() => {
            const scores = {};
            Object.keys(careers).forEach(key => {
                scores[key] = 0;
            });

            // Accumulate weights from every answered question
            Object.values(answers).forEach(answer => {
                const question = questions.find(q => q.id === answer.questionId);
                if (!question) return;
                const selectedOption = question.options.find(opt => opt.value === answer.value);
                if (!selectedOption) return;

                Object.entries(selectedOption.weight).forEach(([careerKey, weight]) => {
                    if (scores[careerKey] !== undefined) {
                        scores[careerKey] += weight;
                    }
                });
            });

            // Determine the theoretical max score (if every question gave 3 to a career)
            const maxPossible = questions.length * 3;

            // Build sorted list, normalise to percentage (cap 95 %)
            const sortedCareers = Object.entries(scores)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 3)
                .map(([careerKey, score]) => ({
                    ...careers[careerKey],
                    key: careerKey,
                    score,
                    compatibility: Math.min(Math.round((score / maxPossible) * 100), 95)
                }));

            setResults(sortedCareers);
            setIsProcessing(false);
            setCurrentStep('results');
        }, 2400));

        // Cleanup on unmount (safety)
        return () => timers.forEach(clearTimeout);
    };

    // ---------------------------------------------------------------
    // Handle an answer selection
    // ---------------------------------------------------------------
    const handleAnswer = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: { questionId, value }
        }));

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            processAnswers();
        }
    };

    // ---------------------------------------------------------------
    // Sub-components
    // ---------------------------------------------------------------

    const IntroComponent = () => (
        <div className="vt-intro">
            <div className="vt-intro-content">
                <div className="vt-intro-icon">
                    <i className="fas fa-graduation-cap"></i>
                </div>
                <h3 className="vt-intro-title">Test Vocacional</h3>
                <p className="vt-intro-description">
                    Descubre cual de las 10 carreras del Instituto Tecnologico de Chetumal
                    se alinea mejor con tu perfil, intereses y habilidades.
                </p>
                <div className="vt-features">
                    <div className="vt-feature">
                        <i className="fas fa-list-ol"></i>
                        <span>10 preguntas</span>
                    </div>
                    <div className="vt-feature">
                        <i className="fas fa-clock"></i>
                        <span>5 minutos</span>
                    </div>
                    <div className="vt-feature">
                        <i className="fas fa-user-check"></i>
                        <span>Resultado personalizado</span>
                    </div>
                </div>
                <button
                    className="btn btn-primary btn-lg vt-start-btn"
                    onClick={() => setCurrentStep('questions')}
                >
                    <i className="fas fa-play"></i>
                    Comenzar Test
                </button>
            </div>
        </div>
    );

    const QuestionComponent = () => {
        const question = questions[currentQuestion];
        const progress = ((currentQuestion + 1) / questions.length) * 100;

        return (
            <div className="vt-question">
                <div className="vt-question-header">
                    <div className="vt-progress-bar">
                        <div
                            className="vt-progress-fill"
                            style={{ width: progress + '%' }}
                        ></div>
                    </div>
                    <div className="vt-question-counter">
                        Pregunta {currentQuestion + 1} de {questions.length}
                    </div>
                </div>
                <div className="vt-question-body">
                    <h3 className="vt-question-text">{question.question}</h3>
                    <div className="vt-options">
                        {question.options.map((option, index) => (
                            <button
                                key={option.value}
                                className="vt-option-btn"
                                onClick={() => handleAnswer(question.id, option.value)}
                            >
                                <span className="vt-option-label">{option.label}</span>
                                <i className="fas fa-arrow-right vt-option-arrow"></i>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const ProcessingComponent = () => (
        <div className="vt-processing">
            <div className="vt-processing-content">
                <div className="vt-spinner-wrapper">
                    <div className="vt-spinner"></div>
                </div>
                <h3 className="vt-processing-title">Analizando tus respuestas...</h3>
                <p className="vt-processing-subtitle">
                    Estamos evaluando tu perfil vocacional con base en tus respuestas.
                </p>
                <div className="vt-processing-steps">
                    <div className={'vt-step' + (activeProcessingStep >= 0 ? ' active' : '')}>
                        <i className="fas fa-user-check"></i>
                        <span>Analizando perfil</span>
                    </div>
                    <div className={'vt-step' + (activeProcessingStep >= 1 ? ' active' : '')}>
                        <i className="fas fa-cogs"></i>
                        <span>Procesando datos</span>
                    </div>
                    <div className={'vt-step' + (activeProcessingStep >= 2 ? ' active' : '')}>
                        <i className="fas fa-chart-pie"></i>
                        <span>Generando resultados</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const ResultsComponent = () => (
        <div className="vt-results">
            <div className="vt-results-header">
                <div className="vt-results-icon">
                    <i className="fas fa-trophy"></i>
                </div>
                <h3 className="vt-results-title">Resultados de tu Test Vocacional</h3>
                <p className="vt-results-subtitle">
                    Basado en tu perfil, estas son las carreras mas compatibles contigo:
                </p>
            </div>

            <div className="vt-results-list">
                {results.map((career, index) => (
                    <div
                        key={career.key}
                        className={'vt-career-card' + (index === 0 ? ' vt-best-match' : '')}
                    >
                        <div className="vt-career-top">
                            <div
                                className="vt-career-icon"
                                style={{ backgroundColor: career.color }}
                            >
                                <i className={career.icon}></i>
                            </div>
                            <div className="vt-career-compat">
                                <div className="vt-compat-row">
                                    <span className="vt-compat-pct">
                                        {career.compatibility}% Compatible
                                    </span>
                                    {index === 0 && (
                                        <span className="vt-best-badge">Mejor opcion</span>
                                    )}
                                </div>
                                <div className="vt-compat-bar">
                                    <div
                                        className="vt-compat-fill"
                                        style={{
                                            width: career.compatibility + '%',
                                            backgroundColor: career.color
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="vt-career-body">
                            <h4 className="vt-career-name">{career.name}</h4>
                            <p className="vt-career-desc">{career.description}</p>

                            <div className="vt-career-meta">
                                <div className="vt-meta-item">
                                    <i className="fas fa-clock"></i>
                                    <span>Duracion: {career.duration}</span>
                                </div>
                                <div className="vt-meta-item">
                                    <i className="fas fa-university"></i>
                                    <span>Modalidad: {career.modality.join(', ')}</span>
                                </div>
                            </div>

                            <div className="vt-career-skills">
                                <h5>Habilidades clave:</h5>
                                <div className="vt-tags">
                                    {career.skills.map((skill, i) => (
                                        <span key={i} className="vt-tag vt-tag-skill">{skill}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="vt-career-opps">
                                <h5>Campo laboral:</h5>
                                <div className="vt-tags">
                                    {career.opportunities.map((opp, i) => (
                                        <span key={i} className="vt-tag vt-tag-opp">{opp}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="vt-results-actions">
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        var section = document.getElementById('informacion');
                        if (section) {
                            section.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                >
                    <i className="fas fa-phone"></i>
                    Contactar para mas informacion
                </button>
                <button
                    className="btn btn-outline-primary"
                    onClick={() => {
                        setCurrentStep('intro');
                        setCurrentQuestion(0);
                        setAnswers({});
                        setResults([]);
                    }}
                >
                    <i className="fas fa-redo"></i>
                    Realizar test nuevamente
                </button>
            </div>
        </div>
    );

    // ---------------------------------------------------------------
    // Main render
    // ---------------------------------------------------------------
    return (
        <div className="vocational-test">
            {currentStep === 'intro' && <IntroComponent />}
            {currentStep === 'questions' && <QuestionComponent />}
            {currentStep === 'processing' && <ProcessingComponent />}
            {currentStep === 'results' && <ResultsComponent />}
        </div>
    );
}

// Mount into DOM
var vtRoot = document.getElementById('vocational-test-root');
if (vtRoot) {
    ReactDOM.render(<VocationalTest />, vtRoot);
}
