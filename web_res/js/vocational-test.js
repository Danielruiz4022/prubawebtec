// Vocational Test Component with AI-based Recommendations
const { useState, useEffect, useRef } = React;

// Test Vocacional Interactivo
function VocationalTest() {
    const [currentStep, setCurrentStep] = useState('intro');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [userProfile, setUserProfile] = useState({});

    // Preguntas del test vocacional
    const questions = [
        {
            id: 1,
            category: 'interests',
            question: '¿Cuál de estas actividades te resulta más interesante?',
            options: [
                { value: 'tech', label: 'Programar y desarrollar software', weight: { tech: 3, engineering: 2 } },
                { value: 'design', label: 'Diseñar y crear productos', weight: { engineering: 3, management: 1 } },
                { value: 'manage', label: 'Liderar equipos y proyectos', weight: { management: 3, admin: 2 } },
                { value: 'analyze', label: 'Analizar datos y procesos', weight: { engineering: 2, tech: 2, admin: 1 } }
            ]
        },
        {
            id: 2,
            category: 'skills',
            question: '¿En cuál de estas áreas consideras que tienes más habilidad natural?',
            options: [
                { value: 'math', label: 'Matemáticas y lógica', weight: { tech: 3, engineering: 3, civil: 2 } },
                { value: 'communication', label: 'Comunicación y relaciones interpersonales', weight: { management: 3, admin: 3 } },
                { value: 'creativity', label: 'Creatividad y innovación', weight: { tech: 2, engineering: 2, management: 1 } },
                { value: 'organization', label: 'Organización y planificación', weight: { admin: 3, management: 2, engineering: 1 } }
            ]
        },
        {
            id: 3,
            category: 'work_environment',
            question: '¿En qué tipo de ambiente de trabajo te ves mejor?',
            options: [
                { value: 'office', label: 'Oficina moderna con tecnología', weight: { tech: 3, management: 2 } },
                { value: 'field', label: 'Campo, construcción o industria', weight: { civil: 3, engineering: 2, chemical: 2 } },
                { value: 'laboratory', label: 'Laboratorio o centro de investigación', weight: { chemical: 3, tech: 2 } },
                { value: 'mixed', label: 'Combinación de oficina y campo', weight: { engineering: 2, management: 2, civil: 1 } }
            ]
        },
        {
            id: 4,
            category: 'problem_solving',
            question: '¿Cómo prefieres resolver problemas complejos?',
            options: [
                { value: 'systematic', label: 'Siguiendo métodos sistemáticos y probados', weight: { engineering: 3, admin: 2 } },
                { value: 'creative', label: 'Buscando soluciones creativas e innovadoras', weight: { tech: 3, management: 2 } },
                { value: 'collaborative', label: 'Trabajando en equipo y consultando expertos', weight: { management: 3, admin: 2 } },
                { value: 'research', label: 'Investigando y analizando a fondo', weight: { chemical: 3, civil: 2, tech: 1 } }
            ]
        },
        {
            id: 5,
            category: 'goals',
            question: '¿Cuál de estos objetivos profesionales te motiva más?',
            options: [
                { value: 'innovation', label: 'Crear tecnología innovadora', weight: { tech: 3, engineering: 2 } },
                { value: 'infrastructure', label: 'Construir infraestructura importante', weight: { civil: 3, engineering: 2 } },
                { value: 'business', label: 'Dirigir una empresa exitosa', weight: { management: 3, admin: 2 } },
                { value: 'improvement', label: 'Mejorar procesos y sistemas', weight: { engineering: 3, chemical: 2, admin: 1 } }
            ]
        },
        {
            id: 6,
            category: 'learning',
            question: '¿Cómo prefieres aprender nuevos conceptos?',
            options: [
                { value: 'practice', label: 'Practicando y experimentando', weight: { tech: 3, engineering: 2, chemical: 2 } },
                { value: 'theory', label: 'Estudiando la teoría primero', weight: { chemical: 3, civil: 2 } },
                { value: 'discussion', label: 'Discutiendo con otros', weight: { management: 3, admin: 2 } },
                { value: 'observation', label: 'Observando y analizando ejemplos', weight: { engineering: 2, admin: 2, tech: 1 } }
            ]
        },
        {
            id: 7,
            category: 'subjects',
            question: '¿Cuáles fueron tus materias favoritas en preparatoria?',
            options: [
                { value: 'math_physics', label: 'Matemáticas y Física', weight: { tech: 3, engineering: 3, civil: 3, chemical: 2 } },
                { value: 'chemistry_biology', label: 'Química y Biología', weight: { chemical: 3, engineering: 1 } },
                { value: 'social_languages', label: 'Ciencias Sociales e Idiomas', weight: { management: 3, admin: 3 } },
                { value: 'computers', label: 'Computación e Informática', weight: { tech: 3, engineering: 1 } }
            ]
        },
        {
            id: 8,
            category: 'personality',
            question: '¿Cómo te describirías mejor?',
            options: [
                { value: 'analytical', label: 'Analítico y detallista', weight: { tech: 2, chemical: 3, engineering: 2 } },
                { value: 'leader', label: 'Líder natural y carismático', weight: { management: 3, admin: 2 } },
                { value: 'practical', label: 'Práctico y orientado a resultados', weight: { engineering: 3, civil: 2 } },
                { value: 'innovative', label: 'Innovador y visionario', weight: { tech: 3, management: 2, engineering: 1 } }
            ]
        }
    ];

    // Definición de carreras con sus características
    const careers = {
        tech: {
            name: 'Ingeniería en Tecnologías de la Información y Comunicaciones',
            description: 'Desarrolla software, administra redes y sistemas, implementa soluciones tecnológicas innovadoras.',
            duration: '9 semestres',
            opportunities: ['Desarrollador de Software', 'Administrador de Redes', 'Consultor en TI', 'Arquitecto de Software'],
            skills: ['Programación', 'Análisis de Sistemas', 'Bases de Datos', 'Ciberseguridad'],
            icon: 'fas fa-laptop-code',
            color: '#3b82f6'
        },
        engineering: {
            name: 'Ingeniería Industrial',
            description: 'Optimiza procesos, mejora la productividad y gestiona la calidad en organizaciones.',
            duration: '9 semestres',
            opportunities: ['Ingeniero de Procesos', 'Consultor en Calidad', 'Gerente de Producción', 'Analista de Procesos'],
            skills: ['Optimización', 'Gestión de Calidad', 'Estadística', 'Lean Manufacturing'],
            icon: 'fas fa-industry',
            color: '#ef4444'
        },
        management: {
            name: 'Ingeniería en Gestión Empresarial',
            description: 'Administra empresas, desarrolla estrategias de negocio y lidera equipos de trabajo.',
            duration: '9 semestres',
            opportunities: ['Gerente Empresarial', 'Consultor de Negocios', 'Emprendedor', 'Director de Proyectos'],
            skills: ['Liderazgo', 'Estrategia', 'Finanzas', 'Mercadotecnia'],
            icon: 'fas fa-chart-line',
            color: '#10b981'
        },
        admin: {
            name: 'Licenciatura en Administración',
            description: 'Gestiona recursos humanos, coordina operaciones y desarrolla organizaciones.',
            duration: '8 semestres',
            opportunities: ['Administrador General', 'Coordinador de RRHH', 'Analista Organizacional', 'Supervisor Administrativo'],
            skills: ['Administración', 'Recursos Humanos', 'Contabilidad', 'Organización'],
            icon: 'fas fa-users-cog',
            color: '#f59e0b'
        },
        civil: {
            name: 'Ingeniería Civil',
            description: 'Diseña y construye infraestructura, supervisa obras y desarrolla proyectos urbanos.',
            duration: '10 semestres',
            opportunities: ['Ingeniero Civil', 'Supervisor de Obra', 'Consultor Estructural', 'Diseñador de Proyectos'],
            skills: ['Diseño Estructural', 'Construcción', 'Topografía', 'Materiales'],
            icon: 'fas fa-hard-hat',
            color: '#8b5cf6'
        },
        chemical: {
            name: 'Ingeniería Química',
            description: 'Desarrolla procesos químicos, investiga materiales y trabaja en biotecnología.',
            duration: '9 semestres',
            opportunities: ['Ingeniero de Procesos Químicos', 'Investigador', 'Consultor Ambiental', 'Especialista en Materiales'],
            skills: ['Procesos Químicos', 'Biotecnología', 'Análisis de Materiales', 'Investigación'],
            icon: 'fas fa-flask',
            color: '#06b6d4'
        }
    };

    // Procesar respuestas y calcular resultados
    const processAnswers = () => {
        setIsProcessing(true);
        
        // Simular procesamiento con IA
        setTimeout(() => {
            const scores = {};
            
            // Inicializar scores
            Object.keys(careers).forEach(key => {
                scores[key] = 0;
            });

            // Calcular puntajes basados en respuestas
            Object.values(answers).forEach(answer => {
                const question = questions.find(q => q.id === answer.questionId);
                const selectedOption = question.options.find(opt => opt.value === answer.value);
                
                Object.entries(selectedOption.weight).forEach(([career, weight]) => {
                    scores[career] = (scores[career] || 0) + weight;
                });
            });

            // Ordenar carreras por puntaje
            const sortedCareers = Object.entries(scores)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 3)
                .map(([careerKey, score]) => ({
                    ...careers[careerKey],
                    key: careerKey,
                    score,
                    compatibility: Math.min(Math.round((score / 24) * 100), 95) // Normalizar a porcentaje
                }));

            setResults(sortedCareers);
            setIsProcessing(false);
            setCurrentStep('results');
        }, 2000);
    };

    // Manejar respuesta de pregunta
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

    // Componentes del test
    const IntroComponent = () => (
        <div className="test-intro">
            <div className="intro-content">
                <div className="intro-icon">
                    <i className="fas fa-brain"></i>
                </div>
                <h3>Test Vocacional Inteligente</h3>
                <p>
                    Descubre qué carrera del TecNM Chetumal se adapta mejor a tu perfil. 
                    Nuestro sistema analiza tus respuestas para darte recomendaciones personalizadas.
                </p>
                <div className="test-features">
                    <div className="feature">
                        <i className="fas fa-clock"></i>
                        <span>8 preguntas - 5 minutos</span>
                    </div>
                    <div className="feature">
                        <i className="fas fa-chart-bar"></i>
                        <span>Análisis personalizado</span>
                    </div>
                    <div className="feature">
                        <i className="fas fa-graduation-cap"></i>
                        <span>Recomendaciones de carreras</span>
                    </div>
                </div>
                <button 
                    className="btn btn-primary btn-lg"
                    onClick={() => setCurrentStep('questions')}
                >
                    Comenzar Test
                </button>
            </div>
        </div>
    );

    const QuestionComponent = () => {
        const question = questions[currentQuestion];
        const progress = ((currentQuestion + 1) / questions.length) * 100;

        return (
            <div className="test-question">
                <div className="question-header">
                    <div className="progress-bar">
                        <div className="progress-fill" style={{width: `${progress}%`}}></div>
                    </div>
                    <div className="question-counter">
                        Pregunta {currentQuestion + 1} de {questions.length}
                    </div>
                </div>
                <div className="question-content">
                    <h3>{question.question}</h3>
                    <div className="options">
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                className="option-btn"
                                onClick={() => handleAnswer(question.id, option.value)}
                            >
                                <div className="option-content">
                                    <span>{option.label}</span>
                                    <i className="fas fa-arrow-right"></i>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const ProcessingComponent = () => (
        <div className="test-processing">
            <div className="processing-content">
                <div className="processing-spinner">
                    <div className="spinner"></div>
                </div>
                <h3>Analizando tus respuestas...</h3>
                <p>Nuestro sistema de inteligencia artificial está procesando tu perfil vocacional</p>
                <div className="processing-steps">
                    <div className="step active">
                        <i className="fas fa-user-check"></i>
                        <span>Analizando perfil</span>
                    </div>
                    <div className="step active">
                        <i className="fas fa-brain"></i>
                        <span>Procesando IA</span>
                    </div>
                    <div className="step">
                        <i className="fas fa-chart-pie"></i>
                        <span>Generando resultados</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const ResultsComponent = () => (
        <div className="test-results">
            <div className="results-header">
                <div className="results-icon">
                    <i className="fas fa-trophy"></i>
                </div>
                <h3>¡Resultados de tu Test Vocacional!</h3>
                <p>Basado en tu perfil, estas son las carreras más compatibles contigo:</p>
            </div>
            
            <div className="results-content">
                {results?.map((career, index) => (
                    <div key={career.key} className={`career-result ${index === 0 ? 'best-match' : ''}`}>
                        <div className="result-header">
                            <div className="result-icon" style={{background: career.color}}>
                                <i className={career.icon}></i>
                            </div>
                            <div className="result-info">
                                <div className="compatibility">
                                    <span>{career.compatibility}% Compatible</span>
                                    {index === 0 && <span className="best-badge">Mejor opción</span>}
                                </div>
                                <div className="compatibility-bar">
                                    <div 
                                        className="compatibility-fill" 
                                        style={{width: `${career.compatibility}%`, background: career.color}}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="result-content">
                            <h4>{career.name}</h4>
                            <p>{career.description}</p>
                            <div className="career-details">
                                <div className="detail">
                                    <i className="fas fa-clock"></i>
                                    <span>Duración: {career.duration}</span>
                                </div>
                                <div className="detail">
                                    <i className="fas fa-tools"></i>
                                    <span>Habilidades: {career.skills.slice(0, 2).join(', ')}</span>
                                </div>
                            </div>
                            <div className="opportunities">
                                <h5>Oportunidades laborales:</h5>
                                <div className="opportunities-list">
                                    {career.opportunities.slice(0, 3).map((opp, i) => (
                                        <span key={i} className="opportunity-tag">{opp}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="results-actions">
                <button 
                    className="btn btn-primary"
                    onClick={() => scrollToSection('informacion')}
                >
                    <i className="fas fa-phone"></i>
                    Contactar para más información
                </button>
                <button 
                    className="btn btn-outline-primary"
                    onClick={() => {
                        setCurrentStep('intro');
                        setCurrentQuestion(0);
                        setAnswers({});
                        setResults(null);
                    }}
                >
                    <i className="fas fa-redo"></i>
                    Realizar test nuevamente
                </button>
            </div>
        </div>
    );

    // Render principal
    return (
        <div className="vocational-test">
            {currentStep === 'intro' && <IntroComponent />}
            {currentStep === 'questions' && <QuestionComponent />}
            {isProcessing && <ProcessingComponent />}
            {currentStep === 'results' && <ResultsComponent />}
        </div>
    );
}

// Renderizar el componente
const testContainer = document.getElementById('vocational-test-root');
if (testContainer) {
    ReactDOM.render(<VocationalTest />, testContainer);
}

// CSS adicional para el test vocacional
const testStyles = `
<style>
.vocational-test {
    max-width: 800px;
    margin: 0 auto;
}

.test-intro {
    text-align: center;
    padding: 3rem 2rem;
}

.intro-icon {
    font-size: 4rem;
    color: var(--primary-orange);
    margin-bottom: 1.5rem;
}

.intro-content h3 {
    font-family: var(--font-display);
    font-size: 2.5rem;
    color: var(--text-dark);
    margin-bottom: 1rem;
}

.intro-content p {
    font-size: 1.2rem;
    color: var(--text-gray);
    margin-bottom: 2rem;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
}

.test-features {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2.5rem;
    flex-wrap: wrap;
}

.feature {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-gray);
    font-weight: 500;
}

.feature i {
    color: var(--primary-blue);
}

.test-question {
    background: white;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-soft);
    overflow: hidden;
}

.question-header {
    background: linear-gradient(135deg, var(--primary-blue), var(--dark-blue));
    color: white;
    padding: 1.5rem;
}

.progress-bar {
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    margin-bottom: 1rem;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: var(--primary-orange);
    transition: width 0.3s ease;
}

.question-counter {
    font-weight: 600;
    opacity: 0.9;
}

.question-content {
    padding: 2.5rem;
}

.question-content h3 {
    font-family: var(--font-display);
    font-size: 1.5rem;
    color: var(--text-dark);
    margin-bottom: 2rem;
    line-height: 1.4;
}

.options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.option-btn {
    background: var(--bg-light);
    border: 2px solid transparent;
    border-radius: var(--border-radius);
    padding: 1.5rem;
    text-align: left;
    transition: all 0.3s ease;
    cursor: pointer;
    font-size: 1rem;
}

.option-btn:hover {
    background: white;
    border-color: var(--primary-blue);
    transform: translateY(-2px);
    box-shadow: var(--shadow-soft);
}

.option-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.option-content span {
    color: var(--text-dark);
    font-weight: 500;
}

.option-content i {
    color: var(--primary-orange);
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
}

.option-btn:hover .option-content i {
    opacity: 1;
    transform: translateX(0);
}

.test-processing {
    text-align: center;
    padding: 4rem 2rem;
}

.processing-spinner {
    margin-bottom: 2rem;
}

.spinner {
    width: 80px;
    height: 80px;
    border: 4px solid var(--bg-light);
    border-top: 4px solid var(--primary-orange);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto;
}

.processing-content h3 {
    font-family: var(--font-display);
    font-size: 2rem;
    color: var(--text-dark);
    margin-bottom: 1rem;
}

.processing-content p {
    color: var(--text-gray);
    margin-bottom: 3rem;
}

.processing-steps {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
}

.step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    opacity: 0.5;
    transition: opacity 0.3s ease;
}

.step.active {
    opacity: 1;
}

.step i {
    font-size: 2rem;
    color: var(--primary-blue);
}

.test-results {
    padding: 2rem 0;
}

.results-header {
    text-align: center;
    margin-bottom: 3rem;
}

.results-icon {
    font-size: 4rem;
    color: var(--primary-orange);
    margin-bottom: 1.5rem;
}

.results-header h3 {
    font-family: var(--font-display);
    font-size: 2.5rem;
    color: var(--text-dark);
    margin-bottom: 1rem;
}

.results-header p {
    font-size: 1.2rem;
    color: var(--text-gray);
}

.career-result {
    background: white;
    border-radius: var(--border-radius);
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: var(--shadow-soft);
    border: 2px solid transparent;
    transition: all 0.3s ease;
}

.career-result:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-strong);
}

.career-result.best-match {
    border-color: var(--primary-orange);
    position: relative;
}

.career-result.best-match::before {
    content: '👑';
    position: absolute;
    top: -10px;
    right: 20px;
    font-size: 2rem;
}

.result-header {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
    align-items: center;
}

.result-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    flex-shrink: 0;
}

.result-info {
    flex: 1;
}

.compatibility {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;
    align-items: center;
}

.compatibility span:first-child {
    font-weight: 600;
    color: var(--text-dark);
}

.best-badge {
    background: var(--primary-orange);
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
}

.compatibility-bar {
    width: 100%;
    height: 8px;
    background: var(--bg-light);
    border-radius: 4px;
    overflow: hidden;
}

.compatibility-fill {
    height: 100%;
    transition: width 0.8s ease;
}

.result-content h4 {
    font-family: var(--font-display);
    font-size: 1.3rem;
    color: var(--text-dark);
    margin-bottom: 0.75rem;
}

.result-content p {
    color: var(--text-gray);
    margin-bottom: 1rem;
}

.career-details {
    display: flex;
    gap: 2rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
}

.detail {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--text-gray);
}

.detail i {
    color: var(--primary-blue);
}

.opportunities h5 {
    font-size: 1rem;
    color: var(--text-dark);
    margin-bottom: 0.75rem;
    font-weight: 600;
}

.opportunities-list {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.opportunity-tag {
    background: var(--light-orange);
    color: var(--primary-orange);
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
}

.results-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 3rem;
    flex-wrap: wrap;
}

@media (max-width: 768px) {
    .test-features {
        flex-direction: column;
        gap: 1rem;
    }
    
    .question-content {
        padding: 2rem 1.5rem;
    }
    
    .option-btn {
        padding: 1rem;
    }
    
    .career-result {
        padding: 1.5rem;
    }
    
    .result-header {
        flex-direction: column;
        text-align: center;
    }
    
    .career-details {
        flex-direction: column;
        gap: 1rem;
    }
    
    .results-actions {
        flex-direction: column;
    }
    
    .processing-steps {
        flex-direction: column;
        gap: 1rem;
    }
}
</style>
`;

// Inyectar estilos del test
if (!document.querySelector('#test-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'test-styles';
    styleElement.innerHTML = testStyles.replace(/<style>|<\/style>/g, '');
    document.head.appendChild(styleElement);
}