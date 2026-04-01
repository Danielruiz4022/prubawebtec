// ============================================================================
// ChatAssistant - Asistente Virtual del Instituto Tecnologico de Chetumal
// TecNM Campus Chetumal | Plataforma Interactiva
// ============================================================================

class ChatAssistant {

    // ------------------------------------------------------------------------
    // Constructor: Initialize state, knowledge base, and UI bindings
    // ------------------------------------------------------------------------
    constructor() {
        this.isTyping = false;
        this.conversationHistory = [];
        this.instituteData = this.getInstituteKnowledgeBase();
        this.initializeChat();
    }

    // ------------------------------------------------------------------------
    // initializeChat: Wire up all UI event listeners
    // ------------------------------------------------------------------------
    initializeChat() {
        const sendBtn = document.getElementById('chat-send-btn');
        const inputField = document.getElementById('chat-input-field');

        // Send button click
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.handleSendMessage());
        }

        // Enter key sends message (Shift+Enter for newline if textarea)
        if (inputField) {
            inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleSendMessage();
                }
            });

            // Auto-resize for textarea inputs
            inputField.addEventListener('input', () => this.autoResizeInput());
        }

        // Quick action buttons (e.g. "Carreras disponibles", "Costos y becas")
        document.querySelectorAll('.quick-btn[data-query]').forEach(btn => {
            btn.addEventListener('click', () => {
                const query = btn.getAttribute('data-query');
                if (query) {
                    this.injectQuickQuery(query);
                }
            });
        });

        // Clear conversation button
        const clearBtn = document.getElementById('chat-clear');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearConversation());
        }

        // Floating chat button (mobile)
        const floatingBtn = document.getElementById('floating-chat-btn');
        if (floatingBtn) {
            floatingBtn.addEventListener('click', () => {
                const chatContainer = document.getElementById('chat-container');
                if (chatContainer) {
                    chatContainer.classList.add('show');
                }
            });
        }

        // Load previous conversation from localStorage
        this.loadConversationHistory();
    }

    // ------------------------------------------------------------------------
    // injectQuickQuery: Simulate sending a quick-action query
    // ------------------------------------------------------------------------
    injectQuickQuery(query) {
        const inputField = document.getElementById('chat-input-field');
        if (inputField) {
            inputField.value = query;
            this.handleSendMessage();
        }
    }

    // ------------------------------------------------------------------------
    // getInstituteKnowledgeBase: Verified institutional data (2022-2025)
    // ------------------------------------------------------------------------
    getInstituteKnowledgeBase() {
        return {
            general: {
                name: 'Instituto Tecnologico de Chetumal',
                shortName: 'ITChetumal',
                system: 'Tecnologico Nacional de Mexico (TecNM)',
                founded: '8 de octubre de 1975',
                predecessor: 'Centro de Estudios Cientificos y Tecnologicos #165 (1972)',
                firstInState: true,
                motto: 'Cultura, Ciencia y Tecnologia para la superacion de Mexico',
                address: 'Av. Insurgentes No. 330, Esq. Andres Quintana Roo, Col. David Gustavo Gutierrez, C.P. 77013, Chetumal, Quintana Roo, Mexico',
                phones: ['(983) 832 2330', '(983) 832 1019, Ext. 112'],
                email: 'comunicacion@itchetumal.edu.mx',
                directorEmail: 'direccion@chetumal.tecnm.mx',
                website: 'www.itchetumal.edu.mx',
                websiteAlt: 'chetumal.tecnm.mx',
                enrollmentPlatform: 'escolar.chetumal.tecnm.mx',
                moodle: 'cursos.chetumal.tecnm.mx/moodle/',
                facebook: '@ITChetumal',
                twitter: '@IT_Chetumal',
                students: '~3,400 estudiantes inscritos (2022)',
                certifications: ['ISO 9001:2015 (Calidad)', 'ISO 14001:2015 (Ambiental)', 'ISO 45001:2018 (Seguridad y Salud)'],
                mission: 'Formar integralmente profesionales de alto desempeno que contribuyan al desarrollo sostenido, sustentable e incluyente del Estado y del Pais.',
                vision: 'Ser una institucion educativa lider que contribuya al desarrollo sostenido, sustentable e incluyente del Estado y del Pais.'
            },

            careers: [
                { name: 'Arquitectura', modality: 'Presencial', semesters: 9, icon: 'fas fa-drafting-compass' },
                { name: 'Contador Publico', modality: 'Presencial y Distancia', semesters: 9, icon: 'fas fa-calculator' },
                { name: 'Ingenieria en Administracion', modality: 'Presencial y Distancia Mixta', semesters: 9, icon: 'fas fa-briefcase' },
                { name: 'Ingenieria Civil', modality: 'Presencial', semesters: 9, icon: 'fas fa-hard-hat' },
                { name: 'Ingenieria Electrica', modality: 'Presencial', semesters: 9, icon: 'fas fa-bolt' },
                { name: 'Ingenieria en Gestion Empresarial', modality: 'Presencial y Distancia', semesters: 9, icon: 'fas fa-chart-line' },
                { name: 'Ingenieria en Sistemas Computacionales', modality: 'Presencial', semesters: 9, icon: 'fas fa-laptop-code' },
                { name: 'Ingenieria en Tecnologias de la Informacion y Comunicaciones', modality: 'Presencial', semesters: 9, icon: 'fas fa-network-wired' },
                { name: 'Licenciatura en Administracion', modality: 'Presencial', semesters: 9, icon: 'fas fa-users-cog' },
                { name: 'Licenciatura en Biologia', modality: 'Presencial', semesters: 9, icon: 'fas fa-dna' }
            ],

            posgrados: [
                { name: 'Maestria en Construccion', pnpc: true },
                { name: 'Maestria en Manejo de Zona Costera', pnpc: true },
                { name: 'Maestria en Urbanismo', pnpc: true },
                { name: 'Doctorado en Ciencias Ambientales', pnpc: true, highlight: 'Unico doctorado ambiental en el sureste de Mexico' }
            ],

            costs: {
                ficha: '$480 MXN',
                nivelacion: '$525 MXN',
                inscripcionSemestral: '$2,322 MXN',
                costoAnual: '$4,644 MXN',
                costoTotalCarrera: '~$20,898 MXN (4.5 anos)'
            },

            admission: {
                exam: 'CENEVAL (EXANI-II)',
                requirements: [
                    'Certificado de bachillerato',
                    'Comprobante de domicilio',
                    'CURP',
                    'Identificacion oficial'
                ],
                process: [
                    'Registrarte como aspirante',
                    'Pagar la ficha de admision ($480 MXN)',
                    'Registrarte al CENEVAL (2 dias habiles despues del pago)',
                    'Descargar y estudiar la guia de estudio',
                    'Presentar el examen con identificacion oficial',
                    'Consultar resultados',
                    'Inscribirte si fuiste admitido'
                ],
                periods: 'Agosto-Diciembre y Enero-Junio'
            },

            services: [
                'Centro de idiomas (ingles presencial, en linea y sabatino)',
                'Biblioteca fisica y virtual',
                'Laboratorios especializados',
                'Centro de computo',
                'Canchas deportivas',
                'WiFi gratuito en todo el campus',
                'Bolsa de trabajo (vinculacion con Banamex, Nextel, INAPESCA, etc.)',
                'Programas de movilidad internacional',
                'Servicios medicos',
                'Seguro de vida contra accidentes gratuito',
                'Becas (excelencia academica, manutencion, madres solteras)',
                'Residencias profesionales',
                'Educacion continua'
            ],

            facilities: [
                'Amplias areas verdes',
                'Edificios conectados',
                'Centro de idiomas',
                'Auditorio',
                'Salas multiusos',
                'Aulas teoricas',
                'Canchas deportivas',
                'Laboratorios especializados',
                'Biblioteca'
            ],

            scholarships: [
                'Beca por excelencia academica',
                'Beca de manutencion',
                'Beca para madres solteras'
            ],

            distanceCareers: [
                'Contador Publico (presencial y distancia)',
                'Ingenieria en Administracion (presencial y distancia mixta)',
                'Ingenieria en Gestion Empresarial (presencial y distancia)'
            ]
        };
    }

    // ------------------------------------------------------------------------
    // handleSendMessage: Core send flow
    // ------------------------------------------------------------------------
    async handleSendMessage() {
        const inputField = document.getElementById('chat-input-field');
        if (!inputField) return;

        const message = inputField.value.trim();
        if (!message || this.isTyping) return;

        // Add user message to UI
        this.addMessage(message, 'user');
        inputField.value = '';
        this.autoResizeInput();

        // Track in conversation history
        this.conversationHistory.push({ role: 'user', content: message });

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate realistic response delay
        const delay = 800 + Math.random() * 1200;

        try {
            const response = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(this.generateContextualResponse(message));
                }, delay);
            });

            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
            this.conversationHistory.push({ role: 'assistant', content: response });
            this.saveConversationHistory();
        } catch (error) {
            this.hideTypingIndicator();
            const fallback = this.getFallbackResponse();
            this.addMessage(fallback, 'bot');
            console.error('ChatAssistant Error:', error);
        }
    }

    // ------------------------------------------------------------------------
    // generateContextualResponse: Intelligent keyword-based routing
    // ------------------------------------------------------------------------
    generateContextualResponse(userMessage) {
        const msg = this.normalizeText(userMessage);

        // --- Greetings ---
        if (this.matchesAny(msg, ['hola', 'buenos dias', 'buenas tardes', 'buenas noches', 'que tal', 'hey', 'saludos', 'buen dia', 'hi', 'hello'])) {
            return this.getGreetingResponse();
        }

        // --- Farewell ---
        if (this.matchesAny(msg, ['adios', 'bye', 'hasta luego', 'nos vemos', 'chao', 'gracias por todo'])) {
            return this.getFarewellResponse();
        }

        // --- Thanks ---
        if (this.matchesAny(msg, ['gracias', 'muchas gracias', 'te agradezco', 'thanks', 'excelente gracias'])) {
            return this.getThanksResponse();
        }

        // --- Specific career: Sistemas Computacionales / TICS ---
        if (this.matchesAny(msg, ['sistemas computacionales', 'sistemas', 'computacion', 'software', 'programacion', 'programar', 'desarrollo web', 'ciberseguridad', 'tics', 'tecnologias de la informacion'])) {
            return this.getSpecificCareerResponse('tech');
        }

        // --- Specific career: Civil ---
        if (this.matchesAny(msg, ['ingenieria civil', 'civil', 'construccion de edificios', 'infraestructura', 'obra'])) {
            return this.getSpecificCareerResponse('civil');
        }

        // --- Specific career: Arquitectura ---
        if (this.matchesAny(msg, ['arquitectura', 'arquitecto', 'diseno arquitectonico', 'planos'])) {
            return this.getSpecificCareerResponse('arquitectura');
        }

        // --- Specific career: Electrica ---
        if (this.matchesAny(msg, ['electrica', 'electricidad', 'ingenieria electrica', 'circuitos', 'energia'])) {
            return this.getSpecificCareerResponse('electrica');
        }

        // --- Specific career: Biologia ---
        if (this.matchesAny(msg, ['biologia', 'biologo', 'medio ambiente', 'ecosistema', 'fauna', 'flora'])) {
            return this.getSpecificCareerResponse('biologia');
        }

        // --- Specific career: Administracion / Gestion Empresarial ---
        if (this.matchesAny(msg, ['administracion', 'gestion empresarial', 'empresa', 'negocios', 'emprender', 'gerencia', 'recursos humanos'])) {
            return this.getSpecificCareerResponse('admin');
        }

        // --- Specific career: Contador Publico ---
        if (this.matchesAny(msg, ['contador', 'contaduria', 'contabilidad', 'fiscal', 'impuestos', 'auditor'])) {
            return this.getSpecificCareerResponse('contador');
        }

        // --- General careers query ---
        if (this.matchesAny(msg, ['carrera', 'carreras', 'estudiar', 'programa', 'programas', 'licenciatura', 'ingenieria', 'oferta academica', 'que puedo estudiar', 'opciones de estudio'])) {
            return this.getCareersResponse();
        }

        // --- Posgrados ---
        if (this.matchesAny(msg, ['posgrado', 'posgrados', 'maestria', 'doctorado', 'postgrado', 'pnpc', 'investigacion'])) {
            return this.getPosgradosResponse();
        }

        // --- Admission ---
        if (this.matchesAny(msg, ['admision', 'inscribir', 'inscripcion', 'requisitos', 'requisito', 'examen', 'ceneval', 'exani', 'nuevo ingreso', 'como entrar', 'como entro', 'ingresar', 'ficha', 'aspirante'])) {
            return this.getAdmissionResponse();
        }

        // --- Costs ---
        if (this.matchesAny(msg, ['costo', 'costos', 'precio', 'precios', 'cuota', 'pago', 'cuanto cuesta', 'mensualidad', 'colegiatura', 'cuanto sale', 'economico'])) {
            return this.getCostsResponse();
        }

        // --- Scholarships ---
        if (this.matchesAny(msg, ['beca', 'becas', 'apoyo economico', 'apoyo', 'ayuda economica'])) {
            return this.getScholarshipsResponse();
        }

        // --- Contact ---
        if (this.matchesAny(msg, ['contacto', 'telefono', 'telefonos', 'direccion', 'correo', 'email', 'donde estan', 'ubicacion', 'como llego', 'mapa'])) {
            return this.getContactResponse();
        }

        // --- Facilities ---
        if (this.matchesAny(msg, ['instalacion', 'instalaciones', 'laboratorio', 'laboratorios', 'biblioteca', 'cancha', 'canchas', 'wifi', 'campus', 'auditorio', 'edificio', 'areas verdes'])) {
            return this.getFacilitiesResponse();
        }

        // --- Services ---
        if (this.matchesAny(msg, ['servicio', 'servicios', 'idioma', 'idiomas', 'ingles', 'centro de idiomas', 'bolsa de trabajo', 'bolsa', 'trabajo', 'empleo', 'movilidad', 'intercambio', 'internacional', 'seguro', 'seguro de vida', 'medico', 'servicio medico'])) {
            return this.getServicesResponse();
        }

        // --- Virtual tour ---
        if (this.matchesAny(msg, ['recorrido', 'virtual', '360', 'tour', 'visitar', 'conocer instalaciones', 'como es el campus'])) {
            return this.getVirtualTourResponse();
        }

        // --- Vocational test ---
        if (this.matchesAny(msg, ['test', 'vocacional', 'orientacion', 'orientacion vocacional', 'que carrera me conviene', 'no se que estudiar', 'que estudiar', 'ayuda a elegir'])) {
            return this.getVocationalTestResponse();
        }

        // --- History ---
        if (this.matchesAny(msg, ['historia', 'fundacion', 'cuando se fundo', 'cuando inicio', 'ano', 'origen', 'antiguedad', 'cuantos anos', 'trayectoria'])) {
            return this.getHistoryResponse();
        }

        // --- Certifications ---
        if (this.matchesAny(msg, ['certificacion', 'certificaciones', 'iso', 'calidad', 'acreditacion', 'acreditaciones', 'norma', 'normas'])) {
            return this.getCertificationsResponse();
        }

        // --- Distance learning ---
        if (this.matchesAny(msg, ['distancia', 'en linea', 'linea', 'online', 'mixta', 'semipresencial', 'virtual carrera', 'a distancia', 'desde casa'])) {
            return this.getDistanceLearningResponse();
        }

        // --- Moodle / platforms ---
        if (this.matchesAny(msg, ['moodle', 'plataforma', 'cursos en linea', 'sistema escolar', 'escolar'])) {
            return this.getPlatformsResponse();
        }

        // --- Mission and Vision ---
        if (this.matchesAny(msg, ['mision', 'vision', 'valores', 'filosofia', 'proposito'])) {
            return this.getMissionVisionResponse();
        }

        // --- Social media ---
        if (this.matchesAny(msg, ['facebook', 'twitter', 'redes sociales', 'redes', 'instagram', 'red social'])) {
            return this.getSocialMediaResponse();
        }

        // --- Residencias profesionales ---
        if (this.matchesAny(msg, ['residencia', 'residencias', 'practicas profesionales', 'practicas', 'servicio social'])) {
            return this.getResidenciasResponse();
        }

        // --- Generic fallback ---
        return this.getGenericResponse();
    }

    // ========================================================================
    // RESPONSE GENERATORS
    // ========================================================================

    getGreetingResponse() {
        const greetings = [
            `Hola! Bienvenido al asistente virtual del **Instituto Tecnologico de Chetumal**.\n\nEstoy aqui para ayudarte con toda la informacion que necesites. Puedo orientarte sobre:\n\n- Nuestras **10 carreras** y **4 posgrados**\n- **Proceso de admision** y requisitos\n- **Costos**, becas y apoyos economicos\n- **Instalaciones** y servicios del campus\n- Informacion de **contacto**\n\nQue te gustaria saber?`,

            `Hola! Soy el asistente virtual del **ITChetumal**, parte del Tecnologico Nacional de Mexico.\n\nMe da gusto atenderte. Puedo ayudarte con informacion sobre carreras, admision, costos, servicios y mucho mas.\n\nEn que puedo orientarte hoy?`
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    getFarewellResponse() {
        return `Ha sido un gusto ayudarte! Si en el futuro tienes mas preguntas sobre el **Instituto Tecnologico de Chetumal**, no dudes en regresar.\n\nRecuerda que tambien puedes contactarnos directamente:\n- Tel: **(983) 832 2330**\n- Email: **comunicacion@itchetumal.edu.mx**\n\nMucho exito!`;
    }

    getThanksResponse() {
        return `De nada! Es un placer poder ayudarte.\n\nSi tienes alguna otra pregunta sobre el **ITChetumal**, estoy aqui para asistirte. Tambien puedes preguntarme sobre:\n\n- Carreras y posgrados\n- Admision y costos\n- Becas y servicios\n- Recorrido virtual del campus\n\nEn que mas puedo ayudarte?`;
    }

    // --- Careers ---

    getCareersResponse() {
        const data = this.instituteData;
        let list = '';
        data.careers.forEach((c, i) => {
            list += `**${i + 1}.** ${c.name} - _${c.modality}_ (${c.semesters} semestres)\n`;
        });

        return `El **ITChetumal** ofrece **10 carreras de licenciatura**, todas con duracion de **9 semestres** (4.5 anos):\n\n${list}\nLas carreras con modalidad a **distancia** te permiten estudiar de forma flexible.\n\nTe interesa alguna carrera en particular? Puedo darte mas detalles sobre cualquiera de ellas.`;
    }

    getSpecificCareerResponse(type) {
        switch (type) {
            case 'tech':
                return `Excelente eleccion! En el area de tecnologia tenemos **dos carreras destacadas**:\n\n**Ingenieria en Sistemas Computacionales (ISC)**\n- Modalidad: Presencial\n- Duracion: 9 semestres\n- Enfoque: Desarrollo de software, bases de datos, inteligencia artificial, redes y arquitectura de computadoras\n\n**Ingenieria en Tecnologias de la Informacion y Comunicaciones (TICS)**\n- Modalidad: Presencial\n- Duracion: 9 semestres\n- Enfoque: Redes, telecomunicaciones, ciberseguridad, gestion de TI y desarrollo de aplicaciones\n\nAmbas carreras tienen una alta demanda laboral. El costo total de la carrera es de aproximadamente **$20,898 MXN**.\n\nQuieres saber mas sobre el proceso de admision o los costos?`;

            case 'civil':
                return `**Ingenieria Civil** es una de nuestras carreras mas solidas:\n\n- Modalidad: **Presencial**\n- Duracion: **9 semestres**\n- Enfoque: Diseno y construccion de infraestructura, estructuras, hidraulica, geotecnia y supervision de obras\n- Campo laboral: Constructoras, gobierno, consultoria, supervision de obra\n\nAdemas, contamos con la **Maestria en Construccion** y la **Maestria en Urbanismo** como opciones de posgrado directamente relacionadas.\n\nTe gustaria conocer los requisitos de admision?`;

            case 'arquitectura':
                return `**Arquitectura** es una carrera muy creativa y demandada:\n\n- Modalidad: **Presencial**\n- Duracion: **9 semestres**\n- Enfoque: Diseno arquitectonico, urbanismo, construccion sostenible, representacion grafica y gestion de proyectos\n- Campo laboral: Despachos de arquitectura, constructoras, gobierno, diseno de interiores, desarrollo inmobiliario\n\nRelacionado: Tambien ofrecemos la **Maestria en Urbanismo** y la **Maestria en Construccion** para continuar tu formacion.\n\nQuieres mas informacion?`;

            case 'electrica':
                return `**Ingenieria Electrica** forma profesionales especializados en energia:\n\n- Modalidad: **Presencial**\n- Duracion: **9 semestres**\n- Enfoque: Sistemas electricos de potencia, instalaciones electricas, automatizacion, energias renovables y control\n- Campo laboral: CFE, empresas de energia, industria, automatizacion, proyectos electricos\n\nEs una carrera con excelente campo laboral, especialmente en el sureste de Mexico.\n\nNecesitas mas detalles?`;

            case 'biologia':
                return `**Licenciatura en Biologia** es ideal para quienes aman la naturaleza y el medio ambiente:\n\n- Modalidad: **Presencial**\n- Duracion: **9 semestres**\n- Enfoque: Ecologia, biodiversidad, manejo de recursos naturales, biotecnologia, biologia marina y conservacion\n- Campo laboral: Centros de investigacion, CONANP, SEMARNAT, consultoria ambiental, educacion\n\nQuintana Roo es un laboratorio natural increible con su selva, arrecifes y zona costera.\n\nAdemas, puedes continuar con el **Doctorado en Ciencias Ambientales**, el unico doctorado ambiental en el sureste de Mexico.\n\nTe interesa saber mas?`;

            case 'admin':
                return `Tenemos **tres carreras** enfocadas en administracion y negocios:\n\n**Ingenieria en Administracion**\n- Modalidad: Presencial y **Distancia Mixta**\n- Enfoque: Planeacion estrategica, procesos, liderazgo y gestion organizacional\n\n**Ingenieria en Gestion Empresarial**\n- Modalidad: Presencial y **Distancia**\n- Enfoque: Emprendimiento, mercadotecnia, finanzas y desarrollo empresarial\n\n**Licenciatura en Administracion**\n- Modalidad: Presencial\n- Enfoque: Recursos humanos, administracion publica y privada, desarrollo organizacional\n\nTodas duran **9 semestres**. Las opciones a distancia te dan mayor flexibilidad para estudiar.\n\nCual te interesa mas?`;

            case 'contador':
                return `**Contador Publico** es una carrera con alta demanda laboral:\n\n- Modalidad: Presencial y **Distancia**\n- Duracion: **9 semestres**\n- Enfoque: Contabilidad financiera, fiscal, auditoria, costos, finanzas y derecho tributario\n- Campo laboral: Despachos contables, empresas privadas, gobierno, SAT, consultoria fiscal, banca\n\nLa modalidad a distancia te permite estudiar con flexibilidad sin sacrificar calidad educativa.\n\nCosto total de la carrera: **~$20,898 MXN**.\n\nQuieres saber sobre el proceso de admision?`;

            default:
                return this.getCareersResponse();
        }
    }

    // --- Posgrados ---

    getPosgradosResponse() {
        const data = this.instituteData;
        let list = '';
        data.posgrados.forEach((p) => {
            list += `- **${p.name}**${p.highlight ? ' - _' + p.highlight + '_' : ''}\n`;
        });

        return `El **ITChetumal** ofrece **4 programas de posgrado**, todos con reconocimiento **PNPC** (Programa Nacional de Posgrados de Calidad):\n\n${list}\nDestacamos especialmente el **Doctorado en Ciencias Ambientales**, que es el **unico doctorado ambiental en todo el sureste de Mexico**.\n\nTodos los posgrados cuentan con investigadores reconocidos y proyectos de impacto regional.\n\nTe gustaria informacion sobre requisitos de ingreso a algun posgrado?`;
    }

    // --- Admission ---

    getAdmissionResponse() {
        const adm = this.instituteData.admission;
        let steps = '';
        adm.process.forEach((step, i) => {
            steps += `**${i + 1}.** ${step}\n`;
        });

        let reqs = '';
        adm.requirements.forEach((r) => {
            reqs += `- ${r}\n`;
        });

        return `**Proceso de Admision al ITChetumal**\n\nEl examen de admision es el **${adm.exam}**.\n\n**Pasos a seguir:**\n${steps}\n**Documentos requeridos:**\n${reqs}\n**Periodos de ingreso:** ${adm.periods}\n\n**Costos iniciales:**\n- Ficha de admision: **$480 MXN**\n- Curso de nivelacion: **$525 MXN**\n- Inscripcion al semestre: **$2,322 MXN**\n\nPuedes realizar tu registro en: **escolar.chetumal.tecnm.mx**\n\nTienes alguna duda especifica sobre el proceso?`;
    }

    // --- Costs ---

    getCostsResponse() {
        const c = this.instituteData.costs;
        return `**Costos del ITChetumal**\n\nNuestro instituto ofrece educacion de calidad a costos muy accesibles:\n\n- Ficha de admision: **${c.ficha}**\n- Curso de nivelacion: **${c.nivelacion}**\n- Inscripcion semestral: **${c.inscripcionSemestral}**\n- Costo anual: **${c.costoAnual}**\n- **Costo total de la carrera (4.5 anos): ${c.costoTotalCarrera}**\n\nEsto hace del ITChetumal una de las opciones mas accesibles de educacion superior en Quintana Roo.\n\nAdemas, contamos con **becas** por excelencia academica, de manutencion y para madres solteras.\n\nQuieres mas informacion sobre las becas disponibles?`;
    }

    // --- Scholarships ---

    getScholarshipsResponse() {
        const data = this.instituteData;
        let list = '';
        data.scholarships.forEach((b) => {
            list += `- ${b}\n`;
        });

        return `**Becas y Apoyos Economicos**\n\nEn el ITChetumal buscamos que la situacion economica no sea un obstaculo para tu educacion. Ofrecemos:\n\n${list}\nEstas becas pueden cubrir parcial o totalmente tu inscripcion semestral de **$2,322 MXN**.\n\nRecuerda que el costo total de una carrera completa es de aproximadamente **$20,898 MXN**, lo cual ya es muy accesible comparado con universidades privadas.\n\nPara mas informacion sobre becas, comunicate al **(983) 832 2330** o al correo **comunicacion@itchetumal.edu.mx**.`;
    }

    // --- Contact ---

    getContactResponse() {
        const g = this.instituteData.general;
        return `**Informacion de Contacto**\n\n**Direccion:**\n${g.address}\n\n**Telefonos:**\n- ${g.phones[0]}\n- ${g.phones[1]}\n\n**Correos electronicos:**\n- General: **${g.email}**\n- Direccion: **${g.directorEmail}**\n\n**Sitios web:**\n- Portal oficial: **${g.website}**\n- TecNM Campus: **${g.websiteAlt}**\n\n**Redes sociales:**\n- Facebook: **${g.facebook}**\n- Twitter: **${g.twitter}**\n\n**Plataformas:**\n- Sistema escolar: **${g.enrollmentPlatform}**\n- Moodle (cursos): **${g.moodle}**\n\nEstamos para servirte!`;
    }

    // --- Facilities ---

    getFacilitiesResponse() {
        const data = this.instituteData;
        let list = '';
        data.facilities.forEach((f) => {
            list += `- ${f}\n`;
        });

        return `**Instalaciones del ITChetumal**\n\nNuestro campus cuenta con infraestructura completa para tu formacion:\n\n${list}\nEl campus ofrece un ambiente ideal para estudiar, con amplias areas verdes y todos los edificios conectados para facil acceso.\n\nTe recomiendo explorar nuestro **recorrido virtual 360** para conocer las instalaciones desde cualquier lugar. Puedes acceder a el en la seccion "Recorrido 360" de esta pagina.\n\nQuieres saber sobre algun espacio en particular?`;
    }

    // --- Services ---

    getServicesResponse() {
        const data = this.instituteData;
        let list = '';
        data.services.forEach((s) => {
            list += `- ${s}\n`;
        });

        return `**Servicios del ITChetumal**\n\nPonemos a tu disposicion una amplia gama de servicios:\n\n${list}\nNuestra **bolsa de trabajo** te conecta con empresas como Banamex, Nextel, INAPESCA y muchas mas, para que puedas iniciar tu vida profesional antes de egresar.\n\nEl **centro de idiomas** ofrece cursos de ingles en modalidad presencial, en linea y sabatina, adaptandose a tu horario.\n\nSobre que servicio te gustaria saber mas?`;
    }

    // --- Virtual Tour ---

    getVirtualTourResponse() {
        return `**Recorrido Virtual 360**\n\nTenemos un recorrido virtual interactivo donde puedes explorar todo nuestro campus desde cualquier lugar!\n\nPuedes ver:\n- Edificios y aulas\n- Laboratorios\n- Biblioteca\n- Areas verdes\n- Canchas deportivas\n- Centro de idiomas\n- Y mucho mas\n\nPara acceder, desplazate a la seccion **"Recorrido 360"** en esta misma pagina, o haz clic en el boton "Recorrido 360" en el menu de navegacion.\n\nPuedes arrastrar para explorar, hacer zoom con el scroll y hasta activar modo VR!\n\nQuieres saber algo mas sobre nuestras instalaciones?`;
    }

    // --- Vocational Test ---

    getVocationalTestResponse() {
        return `**Test Vocacional Inteligente**\n\nNo estas seguro de que carrera elegir? Nuestro test vocacional puede ayudarte!\n\nEl test evalua tus:\n- Intereses personales\n- Habilidades y aptitudes\n- Preferencias de trabajo\n- Perfil academico\n\nCon base en tus respuestas, te recomendara las carreras del ITChetumal que mejor se adaptan a tu perfil.\n\nPuedes realizarlo ahora mismo en la seccion **"Test Vocacional"** de esta pagina. Es rapido, gratuito y sin compromiso.\n\nTe gustaria saber mas sobre alguna carrera especifica mientras tanto?`;
    }

    // --- History ---

    getHistoryResponse() {
        return `**Historia del ITChetumal**\n\nEl Instituto Tecnologico de Chetumal tiene una rica historia como pionero educativo:\n\n**1972** - Se funda el **Centro de Estudios Cientificos y Tecnologicos #165** en Chetumal, nuestro predecesor.\n\n**8 de octubre de 1975** - Inicia labores oficialmente el Instituto Tecnologico Regional de Chetumal, convirtiendose en la **primera institucion de educacion superior en todo el estado de Quintana Roo**.\n\n**Hoy** - Somos parte del **Tecnologico Nacional de Mexico (TecNM)**, con:\n- **10 carreras** de licenciatura\n- **4 posgrados** con reconocimiento PNPC\n- **~3,400 estudiantes** inscritos\n- Certificaciones **ISO 9001, 14001 y 45001**\n- Casi **50 anos** formando profesionales de excelencia\n\nNuestro lema: **"Cultura, Ciencia y Tecnologia para la superacion de Mexico"**\n\nQuieres conocer mas sobre nuestra oferta academica actual?`;
    }

    // --- Certifications ---

    getCertificationsResponse() {
        return `**Certificaciones y Acreditaciones**\n\nEl ITChetumal cuenta con **triple certificacion internacional ISO**:\n\n- **ISO 9001:2015** - Sistema de Gestion de Calidad\n  Garantiza que nuestros procesos educativos y administrativos cumplen estandares internacionales de calidad.\n\n- **ISO 14001:2015** - Sistema de Gestion Ambiental\n  Demuestra nuestro compromiso con el cuidado del medio ambiente y la sustentabilidad.\n\n- **ISO 45001:2018** - Sistema de Gestion de Seguridad y Salud en el Trabajo\n  Asegura que el campus ofrece un entorno seguro para estudiantes y personal.\n\nAdemas, nuestros **4 posgrados** cuentan con reconocimiento del **PNPC** (Programa Nacional de Posgrados de Calidad).\n\nEstas certificaciones reflejan nuestro compromiso con la excelencia educativa.\n\nTe gustaria saber mas sobre algun tema?`;
    }

    // --- Distance Learning ---

    getDistanceLearningResponse() {
        const data = this.instituteData;
        let list = '';
        data.distanceCareers.forEach((c) => {
            list += `- ${c}\n`;
        });

        return `**Carreras a Distancia y Modalidad Mixta**\n\nEl ITChetumal ofrece opciones flexibles para quienes no pueden asistir de forma presencial todos los dias:\n\n${list}\nEstas modalidades te permiten:\n- Estudiar desde casa o cualquier lugar\n- Combinar estudio y trabajo\n- Acceder a materiales en la plataforma **Moodle** (cursos.chetumal.tecnm.mx/moodle/)\n- Contar con el mismo plan de estudios y validez oficial que la modalidad presencial\n\nTodas las carreras duran **9 semestres** y tienen la misma calidad academica.\n\nTe interesa inscribirte a alguna de estas carreras?`;
    }

    // --- Platforms ---

    getPlatformsResponse() {
        return `**Plataformas Digitales del ITChetumal**\n\nContamos con varias plataformas para estudiantes y aspirantes:\n\n- **Sistema Escolar:** escolar.chetumal.tecnm.mx\n  Para tramites de inscripcion, calificaciones y servicios escolares.\n\n- **Moodle (Plataforma de Cursos):** cursos.chetumal.tecnm.mx/moodle/\n  Para clases en linea, materiales didacticos y actividades.\n\n- **Portal Oficial:** www.itchetumal.edu.mx\n  Informacion general, noticias y convocatorias.\n\n- **TecNM Campus:** chetumal.tecnm.mx\n  Pagina institucional dentro del sistema TecNM.\n\nSi tienes problemas para acceder a alguna plataforma, puedes comunicarte al **(983) 832 2330**.`;
    }

    // --- Mission and Vision ---

    getMissionVisionResponse() {
        const g = this.instituteData.general;
        return `**Mision y Vision del ITChetumal**\n\n**Mision:**\n${g.mission}\n\n**Vision:**\n${g.vision}\n\n**Lema:**\n"${g.motto}"\n\nEstos principios guian todas nuestras acciones para formar profesionales integrales que impulsen el desarrollo de Quintana Roo y de Mexico.\n\nTe gustaria conocer mas sobre nuestra historia o nuestras certificaciones de calidad?`;
    }

    // --- Social Media ---

    getSocialMediaResponse() {
        const g = this.instituteData.general;
        return `**Redes Sociales del ITChetumal**\n\nSiguenos para estar al dia con noticias, convocatorias y eventos:\n\n- **Facebook:** ${g.facebook} (facebook.com/ITChetumal)\n- **Twitter:** ${g.twitter}\n\nTambien puedes visitar nuestros sitios web oficiales:\n- **${g.website}**\n- **${g.websiteAlt}**\n\nEn nuestras redes publicamos informacion sobre:\n- Convocatorias de nuevo ingreso\n- Eventos academicos y culturales\n- Becas y apoyos\n- Noticias institucionales\n\nHay algo mas en que pueda ayudarte?`;
    }

    // --- Residencias profesionales ---

    getResidenciasResponse() {
        return `**Residencias Profesionales**\n\nLas residencias profesionales son un requisito para titulacion y una gran oportunidad para aplicar tus conocimientos en el campo laboral.\n\n**Caracteristicas:**\n- Se realizan a partir del **7mo u 8vo semestre**\n- Duracion: **4 a 6 meses**\n- Puedes realizarlas en empresas, gobierno o instituciones\n- Contamos con convenios de **vinculacion** con empresas como Banamex, Nextel, INAPESCA, entre otras\n\n**Nuestra oficina de Vinculacion** te asesora en:\n- Buscar empresa o institucion\n- Tramites y documentacion\n- Seguimiento durante la residencia\n\nPara mas informacion, contacta a la oficina de vinculacion al **(983) 832 2330**.\n\nTe gustaria saber sobre algun otro servicio?`;
    }

    // --- Fallback / Generic ---

    getGenericResponse() {
        return `Gracias por tu pregunta! Puedo ayudarte con muchos temas sobre el **Instituto Tecnologico de Chetumal**.\n\nAqui tienes algunas opciones:\n\n- **"Carreras"** - Conoce nuestras 10 carreras de licenciatura\n- **"Posgrados"** - Maestrias y doctorado con reconocimiento PNPC\n- **"Admision"** - Proceso, requisitos y examen CENEVAL\n- **"Costos"** - Inscripcion, cuotas y costo total\n- **"Becas"** - Apoyos economicos disponibles\n- **"Contacto"** - Telefonos, correos y direccion\n- **"Servicios"** - Idiomas, bolsa de trabajo, movilidad, seguro\n- **"Instalaciones"** - Campus, laboratorios, biblioteca\n- **"Recorrido virtual"** - Tour 360 del campus\n- **"Test vocacional"** - Descubre tu carrera ideal\n- **"Historia"** - Trayectoria del instituto desde 1975\n- **"Certificaciones"** - ISO 9001, 14001, 45001\n\nEscribe cualquiera de estas palabras o hazme tu pregunta directamente!`;
    }

    getFallbackResponse() {
        return `Disculpa, estoy experimentando una dificultad tecnica momentanea.\n\nPara una respuesta inmediata puedes contactarnos directamente:\n\n- Tel: **(983) 832 2330**\n- Tel: **(983) 832 1019**, Ext. 112\n- Email: **comunicacion@itchetumal.edu.mx**\n- Web: **www.itchetumal.edu.mx**\n\nIntenta de nuevo en unos momentos o escribe tu pregunta de otra forma.`;
    }

    // ========================================================================
    // UI METHODS
    // ========================================================================

    // ------------------------------------------------------------------------
    // addMessage: Append a message bubble to the chat
    // ------------------------------------------------------------------------
    addMessage(content, sender) {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;

        const messageEl = document.createElement('div');
        messageEl.className = `message ${sender}-message`;

        const avatarIcon = sender === 'bot' ? 'fas fa-robot' : 'fas fa-user';

        messageEl.innerHTML = `
            <div class="message-avatar">
                <i class="${avatarIcon}"></i>
            </div>
            <div class="message-content">
                <div class="message-text">${this.formatMessage(content)}</div>
            </div>
        `;

        messagesContainer.appendChild(messageEl);
        this.scrollToBottom();
    }

    // ------------------------------------------------------------------------
    // formatMessage: Convert markdown-like syntax to HTML
    // ------------------------------------------------------------------------
    formatMessage(content) {
        let html = content;

        // Escape basic HTML to prevent injection
        html = html.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        // Bold: **text**
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

        // Italic: _text_ (but not inside URLs or words_with_underscores)
        html = html.replace(/(?<!\w)_(.+?)_(?!\w)/g, '<em>$1</em>');

        // Line breaks
        html = html.replace(/\n/g, '<br>');

        // Unordered list items: lines starting with "- "
        html = html.replace(/(^|<br>)- (.+?)(?=<br>|$)/g, '$1<span class="chat-list-item">&#8226; $2</span>');

        return html;
    }

    // ------------------------------------------------------------------------
    // showTypingIndicator / hideTypingIndicator
    // ------------------------------------------------------------------------
    showTypingIndicator() {
        this.isTyping = true;
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;

        const typingEl = document.createElement('div');
        typingEl.className = 'message bot-message typing-indicator';
        typingEl.id = 'typing-indicator';
        typingEl.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingEl);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const typingEl = document.getElementById('typing-indicator');
        if (typingEl) {
            typingEl.remove();
        }
    }

    // ------------------------------------------------------------------------
    // autoResizeInput: Adjust input/textarea height dynamically
    // ------------------------------------------------------------------------
    autoResizeInput() {
        const input = document.getElementById('chat-input-field');
        if (input && input.tagName === 'TEXTAREA') {
            input.style.height = 'auto';
            input.style.height = Math.min(input.scrollHeight, 120) + 'px';
        }
    }

    // ------------------------------------------------------------------------
    // scrollToBottom: Smooth scroll to the latest message
    // ------------------------------------------------------------------------
    scrollToBottom() {
        const messagesContainer = document.getElementById('chat-messages');
        if (messagesContainer) {
            messagesContainer.scrollTo({
                top: messagesContainer.scrollHeight,
                behavior: 'smooth'
            });
        }
    }

    // ------------------------------------------------------------------------
    // saveConversationHistory / loadConversationHistory
    // ------------------------------------------------------------------------
    saveConversationHistory() {
        try {
            const toSave = this.conversationHistory.slice(-30);
            localStorage.setItem('tecnm_chat_history', JSON.stringify(toSave));
        } catch (e) {
            // localStorage may be unavailable or full
        }
    }

    loadConversationHistory() {
        try {
            const saved = localStorage.getItem('tecnm_chat_history');
            if (saved) {
                this.conversationHistory = JSON.parse(saved);
                // Restore visible messages from history
                if (this.conversationHistory.length > 0) {
                    this.restoreMessages();
                }
            }
        } catch (e) {
            this.conversationHistory = [];
        }
    }

    restoreMessages() {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;

        // Only restore if there are saved messages and the container has only the default welcome
        const existingMessages = messagesContainer.querySelectorAll('.message');
        if (existingMessages.length > 1) return;

        this.conversationHistory.forEach(entry => {
            const sender = entry.role === 'user' ? 'user' : 'bot';
            this.addMessage(entry.content, sender);
        });
    }

    // ------------------------------------------------------------------------
    // clearConversation: Reset chat to initial state
    // ------------------------------------------------------------------------
    clearConversation() {
        this.conversationHistory = [];
        this.saveConversationHistory();

        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;

        messagesContainer.innerHTML = `
            <div class="message bot-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <div class="message-text">
                        Hola! Soy el asistente virtual del Instituto Tecnologico de Chetumal. Puedo ayudarte con:
                    </div>
                    <div class="quick-actions">
                        <button class="quick-btn" data-query="carreras">Carreras disponibles</button>
                        <button class="quick-btn" data-query="admision">Proceso de admision</button>
                        <button class="quick-btn" data-query="costos">Costos y becas</button>
                        <button class="quick-btn" data-query="contacto">Contacto</button>
                    </div>
                </div>
            </div>
        `;

        // Re-bind quick action buttons after clearing
        messagesContainer.querySelectorAll('.quick-btn[data-query]').forEach(btn => {
            btn.addEventListener('click', () => {
                const query = btn.getAttribute('data-query');
                if (query) {
                    this.injectQuickQuery(query);
                }
            });
        });
    }

    // ========================================================================
    // UTILITY METHODS
    // ========================================================================

    // Normalize text: lowercase, strip accents, trim
    normalizeText(text) {
        return text
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    // Check if the message matches any keyword
    matchesAny(normalizedMessage, keywords) {
        return keywords.some(keyword => {
            const normalizedKeyword = this.normalizeText(keyword);
            return normalizedMessage.includes(normalizedKeyword);
        });
    }
}

// ============================================================================
// Initialize when DOM is ready
// ============================================================================
document.addEventListener('DOMContentLoaded', function () {
    window.chatAssistant = new ChatAssistant();
});

// Export for global access
window.ChatAssistant = ChatAssistant;
