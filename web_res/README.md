# Plataforma Interactiva TecNM Chetumal

## Descripción

Plataforma web interactiva para la promoción educativa del Instituto Tecnológico de Chetumal con recorridos virtuales 360°, asistente virtual con IA y test vocacional inteligente.

## Características Principales

✨ **Recorrido Virtual 360°**: Exploración inmersiva de las instalaciones del instituto
🤖 **Asistente Virtual con IA**: Chat inteligente para resolver consultas educativas  
🎯 **Test Vocacional**: Evaluación personalizada para recomendación de carreras
📱 **Diseño Responsive**: Optimizado para dispositivos móviles y escritorio
🎨 **Interfaz Moderna**: Diseño profesional con colores institucionales
🔒 **Accesible**: Cumple estándares WCAG 2.1

## Tecnologías Utilizadas

- **Frontend**: React 18, Bootstrap 5, HTML5, CSS3, JavaScript ES6
- **Fonts**: Google Fonts (Playfair Display, Source Sans 3)
- **Icons**: Font Awesome 6
- **Virtual Tour**: Integración con Kuula
- **IA**: Sistema preparado para integración con OpenAI API

## Estructura del Proyecto

```
tecnm-chetumal-platform/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos principales
├── js/
│   ├── main.js            # Funcionalidad principal
│   ├── chat-assistant.js  # Asistente virtual con IA
│   └── vocational-test.js # Test vocacional React
└── README.md              # Este archivo
```

## Instalación y Configuración

### 1. Configuración Básica

1. **Descarga los archivos**: Descarga todos los archivos del proyecto
2. **Estructura de carpetas**: Mantén la estructura de directorios como se muestra arriba
3. **Servidor web**: Coloca los archivos en un servidor web (Apache, Nginx, etc.)

### 2. Configuración del Recorrido Virtual

El recorrido virtual está integrado con Kuula. Para personalizar:

```html
<!-- En index.html, línea ~257 -->
<iframe 
    class="ku-embed" 
    frameborder="0" 
    allow="xr-spatial-tracking; gyroscope; accelerometer" 
    allowfullscreen 
    scrolling="no" 
    src="TU_URL_DE_KUULA_AQUI">
</iframe>
```

### 3. Configuración del Asistente Virtual con IA

Para integrar con OpenAI API (GPT-4):

1. **Backend API** (Node.js ejemplo):
```javascript
// server.js
app.post('/api/chat', async (req, res) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: req.body.messages,
            max_tokens: 300,
            temperature: 0.7
        });
        
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'AI service error' });
    }
});
```

2. **Frontend**: Descomenta las líneas 112-130 en `chat-assistant.js`

### 4. Personalización de Colores

Para cambiar los colores institucionales, modifica las variables CSS en `css/styles.css`:

```css
:root {
    --primary-blue: #TU_AZUL_AQUI;
    --primary-orange: #TU_NARANJA_AQUI;
    /* ... más colores */
}
```

## Funcionalidades Detalladas

### 🏠 Página Principal
- Hero section animado con estadísticas del instituto
- Navegación suave entre secciones
- Efectos visuales modernos
- Tarjetas flotantes animadas

### 🌐 Recorrido Virtual 360°
- Integración completa con Kuula
- Controles intuitivos de navegación
- Instrucciones de uso visibles
- Modo VR compatible

### 🎯 Test Vocacional
- 8 preguntas categorizadas:
  - Intereses profesionales
  - Habilidades naturales  
  - Ambiente de trabajo preferido
  - Estilo de resolución de problemas
  - Objetivos profesionales
  - Preferencias de aprendizaje
  - Materias favoritas
  - Tipo de personalidad

- **Sistema de Puntuación**: Cada respuesta tiene pesos específicos para diferentes carreras
- **IA de Recomendación**: Algoritmo que calcula compatibilidad basada en perfil del usuario
- **Resultados Visuales**: Gráficos de compatibilidad y descripción detallada de carreras

### 🤖 Asistente Virtual
- **Base de Conocimientos**: Información completa del instituto
- **Contexto Inteligente**: Mantiene historial de conversación
- **Respuestas Categorizadas**:
  - Información de carreras
  - Proceso de admisión
  - Costos y becas
  - Instalaciones y servicios
  - Contacto

### 📱 Diseño Responsive
- **Mobile First**: Optimizado para dispositivos móviles
- **Breakpoints**: 576px, 768px, 992px, 1200px
- **Elementos Adaptativos**: 
  - Navegación colapsible
  - Chat redimensionable
  - Tarjetas apilables
  - Formularios responsive

## Personalización Avanzada

### Agregar Nuevas Carreras

1. **Test Vocacional** (`js/vocational-test.js`, línea 85):
```javascript
const careers = {
    nueva_carrera: {
        name: 'Nombre de la Carrera',
        description: 'Descripción breve',
        duration: 'X semestres',
        opportunities: ['Oportunidad 1', 'Oportunidad 2'],
        skills: ['Habilidad 1', 'Habilidad 2'],
        icon: 'fas fa-icon',
        color: '#color'
    }
};
```

2. **Grid de Carreras** (`js/main.js`, línea 95):
```javascript
const careersData = [
    {
        id: X,
        name: "Nombre de la Carrera",
        duration: "X semestres",
        type: "Tipo",
        description: "Descripción",
        icon: "fas fa-icon",
        color: "#color"
    }
];
```

3. **Base de Conocimiento del Chat** (`js/chat-assistant.js`, línea 30):
```javascript
careers: [
    {
        name: "Nueva Carrera",
        duration: "X semestres",
        type: "Tipo",
        description: "Descripción completa",
        requirements: "Requisitos",
        opportunities: "Oportunidades laborales"
    }
]
```

### Modificar Preguntas del Test

En `js/vocational-test.js`, línea 10:

```javascript
const questions = [
    {
        id: 9, // Nuevo ID
        category: 'nueva_categoria',
        question: '¿Tu nueva pregunta?',
        options: [
            { 
                value: 'opcion1', 
                label: 'Texto de la opción', 
                weight: { 
                    carrera1: 3, 
                    carrera2: 2 
                } 
            }
        ]
    }
];
```

## Optimización y SEO

### Mejoras de Rendimiento
- **Lazy Loading**: Implementar para imágenes y componentes
- **Minificación**: Comprimir CSS y JS para producción
- **CDN**: Usar CDN para librerías externas
- **Caching**: Configurar cache del navegador

### SEO Básico
```html
<!-- Meta tags recomendados -->
<meta name="description" content="Instituto Tecnológico de Chetumal - Plataforma interactiva con recorridos virtuales 360° y test vocacional">
<meta name="keywords" content="TecNM, Chetumal, tecnológico, carreras, ingeniería, educación superior">
<meta name="author" content="TecNM Chetumal">

<!-- Open Graph -->
<meta property="og:title" content="TecNM Chetumal - Plataforma Educativa Interactiva">
<meta property="og:description" content="Descubre tu futuro profesional con nuestros recorridos virtuales y test vocacional">
<meta property="og:type" content="website">
```

## Integración con Sistemas

### CRM Institucional
```javascript
// Ejemplo de integración con CRM
function sendLeadToCRM(leadData) {
    fetch('/api/crm/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
    });
}
```

### Google Analytics
```html
<!-- Agregar antes del </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_TRACKING_ID');
</script>
```

## Mantenimiento y Actualizaciones

### Actualización de Contenido
1. **Carreras**: Modificar archivos JavaScript correspondientes
2. **Información de Contacto**: Actualizar base de conocimiento del chat
3. **Costos**: Actualizar en chat-assistant.js y páginas informativas

### Monitoreo
- **Analytics**: Revisar métricas de uso regularmente
- **Chat Logs**: Analizar consultas frecuentes para mejorar respuestas
- **Test Results**: Analizar resultados para optimizar algoritmo de recomendación

### Backups
- Respaldar archivos de configuración
- Mantener versiones de las bases de conocimiento
- Guardar logs de conversaciones (opcional)

## Soporte y Contacto

**Desarrollado por**: Jorge Daniel Ruiz Medina  
**Institución**: TecNM Instituto Tecnológico de Chetumal  
**Proyecto**: Residencia Profesional 2025  

Para soporte técnico o consultas sobre la plataforma, contactar al departamento de Tecnologías de la Información del instituto.

## Licencia

Este proyecto ha sido desarrollado como parte de la residencia profesional del TecNM Chetumal. Todos los derechos reservados al Instituto Tecnológico de Chetumal.

---

*Última actualización: Diciembre 2025*