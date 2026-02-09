// Chat Assistant with AI Integration for TecNM Chetumal
class ChatAssistant {
    constructor() {
        this.isTyping = false;
        this.conversationHistory = [];
        this.instituteData = this.getInstituteKnowledgeBase();
        this.initializeChat();
    }

    // Initialize chat functionality
    initializeChat() {
        const sendBtn = document.getElementById('chat-send-btn');
        const inputField = document.getElementById('chat-input-field');

        if (sendBtn && inputField) {
            sendBtn.addEventListener('click', () => this.handleSendMessage());
            
            inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleSendMessage();
                }
            });

            // Auto-resize input
            inputField.addEventListener('input', this.autoResizeInput);
        }

        // Load conversation history if exists
        this.loadConversationHistory();
    }

    // Institute knowledge base
    getInstituteKnowledgeBase() {
        return {
            general: {
                name: "Instituto Tecnológico de Chetumal",
                type: "Institución de educación superior tecnológica",
                location: "Chetumal, Quintana Roo, México",
                phone: "+52 983 832 1060",
                email: "vinculacion@itchetumal.edu.mx",
                website: "www.itchetumal.edu.mx",
                address: "Av. Insurgentes 330, Chetumal, Q.R."
            },
            careers: [
                {
                    name: "Ingeniería en Tecnologías de la Información y Comunicaciones",
                    duration: "9 semestres",
                    type: "Ingeniería",
                    description: "Desarrollo de software, redes, ciberseguridad y gestión de TI",
                    requirements: "Bachillerato con conocimientos básicos en matemáticas y física",
                    opportunities: "Desarrollador de software, administrador de redes, consultor en TI"
                },
                {
                    name: "Ingeniería Industrial",
                    duration: "9 semestres", 
                    type: "Ingeniería",
                    description: "Optimización de procesos, calidad, productividad y gestión",
                    requirements: "Bachillerato con aptitudes en matemáticas y física",
                    opportunities: "Ingeniero de procesos, consultor en calidad, gerente de producción"
                },
                {
                    name: "Ingeniería en Gestión Empresarial",
                    duration: "9 semestres",
                    type: "Ingeniería", 
                    description: "Administración, finanzas, mercadotecnia y emprendimiento",
                    requirements: "Bachillerato con interés en administración y liderazgo",
                    opportunities: "Gerente empresarial, consultor, emprendedor"
                },
                {
                    name: "Licenciatura en Administración",
                    duration: "8 semestres",
                    type: "Licenciatura",
                    description: "Gestión administrativa, recursos humanos y desarrollo organizacional",
                    requirements: "Bachillerato con aptitudes administrativas",
                    opportunities: "Administrador, coordinador de RRHH, analista organizacional"
                },
                {
                    name: "Ingeniería Civil",
                    duration: "10 semestres",
                    type: "Ingeniería",
                    description: "Diseño y construcción de infraestructura y edificaciones",
                    requirements: "Bachillerato con sólidos conocimientos en matemáticas y física",
                    opportunities: "Ingeniero civil, supervisor de obra, consultor estructural"
                },
                {
                    name: "Ingeniería Química",
                    duration: "9 semestres",
                    type: "Ingeniería",
                    description: "Procesos químicos, biotecnología y desarrollo de materiales",
                    requirements: "Bachillerato con conocimientos en química y matemáticas",
                    opportunities: "Ingeniero de procesos, investigador, consultor ambiental"
                }
            ],
            admission: {
                process: "Examen de admisión EXANI-II, entrevista y documentación completa",
                periods: "Agosto-Diciembre y Enero-Junio",
                requirements: [
                    "Certificado de bachillerato",
                    "Acta de nacimiento",
                    "CURP",
                    "Fotografías tamaño infantil",
                    "Examen médico",
                    "Comprobante de pago"
                ],
                costs: "Inscripción: $2,500 MXN, Colegiatura semestral: $3,200 MXN"
            },
            services: [
                "Biblioteca digital",
                "Laboratorios especializados",
                "Centro de cómputo",
                "Servicios médicos",
                "Becas académicas",
                "Residencias profesionales",
                "Vinculación empresarial",
                "Educación continua"
            ]
        };
    }

    // Handle sending messages
    async handleSendMessage() {
        const inputField = document.getElementById('chat-input-field');
        const message = inputField.value.trim();

        if (message && !this.isTyping) {
            this.addMessage(message, 'user');
            inputField.value = '';
            this.autoResizeInput();

            // Add to conversation history
            this.conversationHistory.push({ role: 'user', content: message });

            // Show typing indicator
            this.showTypingIndicator();

            try {
                // Get AI response
                const response = await this.getAIResponse(message);
                this.hideTypingIndicator();
                this.addMessage(response, 'bot');
                
                // Add to conversation history
                this.conversationHistory.push({ role: 'assistant', content: response });
                this.saveConversationHistory();
                
            } catch (error) {
                this.hideTypingIndicator();
                const fallbackResponse = this.getFallbackResponse(message);
                this.addMessage(fallbackResponse, 'bot');
                console.error('Chat AI Error:', error);
            }
        }
    }

    // Get AI response using institute context
    async getAIResponse(userMessage) {
        // Create context for the AI
        const systemPrompt = this.createSystemPrompt();
        const contextMessage = this.createContextualPrompt(userMessage);

        // Simulate AI API call (replace with actual OpenAI integration)
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = this.generateContextualResponse(userMessage);
                resolve(response);
            }, 1500 + Math.random() * 1000); // Simulate API delay
        });

        /* 
        // Actual OpenAI API integration would look like this:
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        { role: 'system', content: systemPrompt },
                        ...this.conversationHistory.slice(-10), // Last 10 messages for context
                        { role: 'user', content: contextMessage }
                    ],
                    max_tokens: 300,
                    temperature: 0.7
                })
            });

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            throw new Error('AI service temporarily unavailable');
        }
        */
    }

    // Create system prompt for AI
    createSystemPrompt() {
        return `Eres un asistente virtual especializado del Instituto Tecnológico de Chetumal (TecNM). 
        Tu función es ayudar a estudiantes potenciales con información sobre:
        
        - Carreras y programas educativos
        - Proceso de admisión y requisitos
        - Instalaciones y servicios
        - Costos y becas
        - Contacto e información general
        
        Mantén un tono amigable, profesional y útil. Proporciona información precisa y actualizada.
        Si no tienes información específica, ofrece alternativas de contacto directo.`;
    }

    // Create contextual prompt with institute data
    createContextualPrompt(userMessage) {
        return `Usuario pregunta: "${userMessage}"
        
        Contexto institucional disponible:
        ${JSON.stringify(this.instituteData, null, 2)}
        
        Responde de manera útil y específica basándote en la información institucional.`;
    }

    // Generate contextual response based on user input
    generateContextualResponse(userMessage) {
        const message = userMessage.toLowerCase();

        // Carreras y programas
        if (message.includes('carrera') || message.includes('programa') || message.includes('estudiar')) {
            return this.getCareerResponse(message);
        }

        // Admisión
        if (message.includes('admision') || message.includes('inscribir') || message.includes('requisitos')) {
            return this.getAdmissionResponse();
        }

        // Costos
        if (message.includes('costo') || message.includes('precio') || message.includes('cuota') || message.includes('beca')) {
            return this.getCostResponse();
        }

        // Contacto
        if (message.includes('contacto') || message.includes('telefono') || message.includes('direccion')) {
            return this.getContactResponse();
        }

        // Instalaciones
        if (message.includes('instalacion') || message.includes('laboratorio') || message.includes('biblioteca')) {
            return this.getFacilitiesResponse();
        }

        // Recorrido virtual
        if (message.includes('recorrido') || message.includes('virtual') || message.includes('360')) {
            return "¡Excelente pregunta! Tenemos un recorrido virtual 360° disponible en nuestra plataforma. Puedes explorarlo haciendo clic en el menú 'Recorrido Virtual' o desplazándote hacia la sección correspondiente. Te permitirá conocer nuestras instalaciones desde cualquier lugar. ¿Te gustaría saber algo específico sobre nuestras instalaciones?";
        }

        // Test vocacional
        if (message.includes('test') || message.includes('vocacional') || message.includes('orientacion')) {
            return "Ofrecemos un test vocacional inteligente que te ayudará a descubrir qué carrera se adapta mejor a tu perfil. Puedes acceder a él en la sección 'Test Vocacional' de nuestra plataforma. El test evalúa tus intereses, habilidades y preferencias para recomendarte las carreras más adecuadas. ¿Te gustaría realizarlo ahora?";
        }

        // Respuesta genérica
        return this.getGenericResponse();
    }

    // Specific response methods
    getCareerResponse(message) {
        const careers = this.instituteData.careers.map(career => 
            `• ${career.name} (${career.duration}): ${career.description}`
        ).join('\n');

        if (message.includes('sistemas') || message.includes('computacion') || message.includes('tecnologia')) {
            const itCareer = this.instituteData.careers[0];
            return `Te recomiendo ${itCareer.name}. Es un programa de ${itCareer.duration} que incluye ${itCareer.description}. Las oportunidades laborales incluyen: ${itCareer.opportunities}. ¿Te gustaría conocer más detalles sobre esta carrera?`;
        }

        return `Ofrecemos las siguientes carreras:\n\n${careers}\n\n¿Te interesa alguna carrera en particular? Puedo darte más información específica.`;
    }

    getAdmissionResponse() {
        const admission = this.instituteData.admission;
        const requirements = admission.requirements.map(req => `• ${req}`).join('\n');
        
        return `El proceso de admisión incluye:\n\n📋 **Proceso:** ${admission.process}\n📅 **Períodos:** ${admission.periods}\n💰 **Costos:** ${admission.costs}\n\n**Requisitos:**\n${requirements}\n\n¿Necesitas información sobre algún requisito específico?`;
    }

    getCostResponse() {
        return `💰 **Costos del Instituto:**\n\n• Inscripción: $2,500 MXN\n• Colegiatura semestral: $3,200 MXN\n\n🎓 **Opciones de apoyo:**\n• Becas académicas disponibles\n• Programas de apoyo económico\n• Becas por excelencia académica\n\n¿Te gustaría información sobre el proceso de solicitud de becas?`;
    }

    getContactResponse() {
        const general = this.instituteData.general;
        return `📞 **Información de contacto:**\n\n📍 **Dirección:** ${general.address}\n☎️ **Teléfono:** ${general.phone}\n📧 **Email:** ${general.email}\n🌐 **Sitio web:** ${general.website}\n\n¿En qué más puedo ayudarte?`;
    }

    getFacilitiesResponse() {
        const services = this.instituteData.services.map(service => `• ${service}`).join('\n');
        return `🏫 **Nuestras instalaciones y servicios incluyen:**\n\n${services}\n\nTambién puedes explorar nuestras instalaciones con el recorrido virtual 360°. ¿Te interesa conocer algo específico de nuestras instalaciones?`;
    }

    getGenericResponse() {
        return `¡Hola! Soy el asistente virtual del TecNM Chetumal. Puedo ayudarte con:\n\n• Información sobre carreras\n• Proceso de admisión\n• Costos y becas\n• Instalaciones y servicios\n• Contacto general\n\n¿Sobre qué te gustaría saber más?`;
    }

    // Fallback response for errors
    getFallbackResponse(userMessage) {
        return `Disculpa, estoy experimentando dificultades técnicas momentáneas. Para una respuesta inmediata, puedes contactar directamente a:\n\n📞 ${this.instituteData.general.phone}\n📧 ${this.instituteData.general.email}\n\n¿Hay algo más en lo que pueda intentar ayudarte?`;
    }

    // Add message to chat
    addMessage(content, sender) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;

        const avatarIcon = sender === 'bot' ? 'fas fa-robot' : 'fas fa-user';
        
        messageElement.innerHTML = `
            <div class="message-avatar">
                <i class="${avatarIcon}"></i>
            </div>
            <div class="message-content">${this.formatMessage(content)}</div>
        `;

        messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
    }

    // Format message content
    formatMessage(content) {
        return content
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/(\d+\.\s)/g, '<br>$1');
    }

    // Show typing indicator
    showTypingIndicator() {
        this.isTyping = true;
        const messagesContainer = document.getElementById('chat-messages');
        const typingElement = document.createElement('div');
        typingElement.className = 'message bot-message typing-indicator';
        typingElement.innerHTML = `
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
        messagesContainer.appendChild(typingElement);
        this.scrollToBottom();
    }

    // Hide typing indicator
    hideTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Auto-resize input field
    autoResizeInput() {
        const input = document.getElementById('chat-input-field');
        if (input) {
            input.style.height = 'auto';
            input.style.height = Math.min(input.scrollHeight, 100) + 'px';
        }
    }

    // Scroll to bottom of chat
    scrollToBottom() {
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Save conversation history
    saveConversationHistory() {
        try {
            localStorage.setItem('tecnm_chat_history', JSON.stringify(this.conversationHistory.slice(-20)));
        } catch (error) {
            console.log('Could not save conversation history');
        }
    }

    // Load conversation history
    loadConversationHistory() {
        try {
            const saved = localStorage.getItem('tecnm_chat_history');
            if (saved) {
                this.conversationHistory = JSON.parse(saved);
            }
        } catch (error) {
            console.log('Could not load conversation history');
        }
    }

    // Clear conversation
    clearConversation() {
        this.conversationHistory = [];
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.innerHTML = `
            <div class="message bot-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    ¡Hola! Soy tu asistente virtual del TecNM Chetumal. ¿En qué puedo ayudarte hoy?
                </div>
            </div>
        `;
        this.saveConversationHistory();
    }
}

// Add CSS for typing indicator
const typingCSS = `
<style>
.typing-dots {
    display: flex;
    gap: 4px;
    align-items: center;
    padding: 8px 0;
}

.typing-dots span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--primary-blue);
    animation: typing 1.4s infinite ease-in-out;
}

.typing-dots span:nth-child(1) {
    animation-delay: -0.32s;
}

.typing-dots span:nth-child(2) {
    animation-delay: -0.16s;
}

@keyframes typing {
    0%, 80%, 100% {
        transform: scale(0.8);
        opacity: 0.5;
    }
    40% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>
`;

// Inject typing indicator styles
if (!document.querySelector('#typing-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'typing-styles';
    styleElement.innerHTML = typingCSS.replace(/<style>|<\/style>/g, '');
    document.head.appendChild(styleElement);
}

// Initialize chat assistant when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.chatAssistant = new ChatAssistant();
});

// Export for global access
window.ChatAssistant = ChatAssistant;