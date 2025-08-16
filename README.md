# 📚 EdHack API - Documentación Completa de Endpoints

## 🌟 Información General

- **Base URL:** `http://localhost:5000/api`
- **Autenticación:** Simple por nombre y rol
- **Formato:** JSON
- **CORS:** Habilitado para todos los orígenes
- **Métodos:** GET, POST, PUT, DELETE

---

## 🏥 Health Check & Sistema

### `GET /api/health`
**Descripción:** Verificar que la API está funcionando

**Request:**
```bash
curl http://localhost:5000/api/health
```

**Response:**
```json
{
    "success": true,
    "message": "API funcionando correctamente",
    "data": {
        "status": "healthy",
        "version": "1.0.0",
        "timestamp": "2025-08-16T10:30:00Z",
        "database": "connected",
        "ai": "ready"
    }
}
```

---

## 🔐 Autenticación

### `POST /api/auth/login`
**Descripción:** Login/registro de usuario

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "role": "STUDENT"
  }'
```

**Request Body:**
```json
{
    "name": "string",           // Nombre del usuario
    "role": "STUDENT|TEACHER"   // Rol del usuario
}
```

**Response (Éxito):**
```json
{
    "success": true,
    "message": "Login exitoso",
    "data": {
        "user": {
            "id": "uuid-123-456",
            "display_name": "Juan Pérez",
            "email": "juan.perez@edhack.com",
            "role": "student",
            "created_at": "2025-08-16T10:30:00Z"
        },
        "is_new_user": false
    }
}
```

**Response (Error):**
```json
{
    "success": false,
    "message": "Error en autenticación",
    "error": "Detalles del error"
}
```

---

## 👥 Gestión de Usuarios

### `GET /api/users/role/{role}`
**Descripción:** Obtener usuarios por rol

**Request:**
```bash
curl http://localhost:5000/api/users/role/STUDENT
```

**Parameters:**
- `role`: `STUDENT` o `TEACHER`

**Response:**
```json
{
    "success": true,
    "message": "Usuarios obtenidos",
    "data": [
        {
            "id": "uuid-123",
            "display_name": "Ana García",
            "email": "ana@edhack.com",
            "role": "student",
            "created_at": "2025-08-16T10:00:00Z"
        }
    ]
}
```

### `GET /api/users/{user_id}`
**Descripción:** Obtener información de usuario específico

**Request:**
```bash
curl http://localhost:5000/api/users/uuid-123-456
```

**Response:**
```json
{
    "success": true,
    "message": "Usuario encontrado",
    "data": {
        "id": "uuid-123-456",
        "display_name": "Juan Pérez",
        "email": "juan@edhack.com",
        "role": "student",
        "created_at": "2025-08-16T10:30:00Z"
    }
}
```

---

## 📝 Onboarding

### `GET /api/onboarding/questions`
**Descripción:** Obtener todas las preguntas de onboarding

**Request:**
```bash
curl http://localhost:5000/api/onboarding/questions
```

**Response:**
```json
{
    "success": true,
    "message": "Preguntas obtenidas",
    "data": [
        {
            "id": "uuid-q1",
            "prompt": "¿Cuál es tu materia favorita?",
            "answer_type": "single_choice",
            "options": {
                "A": "Matemáticas",
                "B": "Ciencias",
                "C": "Historia",
                "D": "Literatura"
            },
            "is_active": true,
            "created_at": "2025-08-16T09:00:00Z"
        }
    ]
}
```

### `POST /api/onboarding/questions`
**Descripción:** Crear nueva pregunta de onboarding

**Request:**
```bash
curl -X POST http://localhost:5000/api/onboarding/questions \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "¿Cuántos años tienes?",
    "answer_type": "number",
    "options": null
  }'
```

**Request Body:**
```json
{
    "prompt": "string",                    // Texto de la pregunta
    "answer_type": "text|number|single_choice|multi_choice",
    "options": {                           // Solo para choice types
        "A": "Opción 1",
        "B": "Opción 2"
    }
}
```

**Response:**
```json
{
    "success": true,
    "message": "Pregunta creada exitosamente",
    "data": {
        "id": "uuid-new-question",
        "prompt": "¿Cuántos años tienes?",
        "answer_type": "number",
        "options": null,
        "is_active": true,
        "created_at": "2025-08-16T11:00:00Z"
    }
}
```

### `GET /api/onboarding/responses/{student_id}`
**Descripción:** Obtener respuestas de onboarding de un estudiante

**Request:**
```bash
curl http://localhost:5000/api/onboarding/responses/uuid-student-123
```

**Response:**
```json
{
    "success": true,
    "message": "Respuestas obtenidas",
    "data": [
        {
            "id": "uuid-response-1",
            "student_id": "uuid-student-123",
            "question_id": "uuid-q1",
            "answer": {"selected": "A"},
            "answered_at": "2025-08-16T10:30:00Z"
        }
    ]
}
```

### `POST /api/onboarding/responses`
**Descripción:** Guardar respuesta de onboarding

**Request:**
```bash
curl -X POST http://localhost:5000/api/onboarding/responses \
  -H "Content-Type: application/json" \
  -d '{
    "student_id": "uuid-student-123",
    "question_id": "uuid-q1",
    "answer": {"selected": "B"}
  }'
```

**Request Body:**
```json
{
    "student_id": "string",     // UUID del estudiante
    "question_id": "string",    // UUID de la pregunta
    "answer": {                 // Respuesta en formato JSON
        "selected": "B",        // Para single_choice
        "value": 25,           // Para number
        "text": "Mi respuesta" // Para text
    }
}
```

**Response:**
```json
{
    "success": true,
    "message": "Respuesta guardada",
    "data": {
        "id": "uuid-new-response",
        "student_id": "uuid-student-123",
        "question_id": "uuid-q1",
        "answer": {"selected": "B"},
        "answered_at": "2025-08-16T11:15:00Z"
    }
}
```

---

## 📚 Niveles

### `GET /api/levels`
**Descripción:** Obtener todos los niveles disponibles

**Request:**
```bash
curl http://localhost:5000/api/levels
```

**Response:**
```json
{
    "success": true,
    "message": "Niveles obtenidos",
    "data": [
        {
            "id": "uuid-level-1",
            "level_name": "Nivel 1",
            "order_index": 1,
            "xp_required": 0,
            "category": "previo",
            "created_at": "2025-08-16T08:00:00Z"
        },
        {
            "id": "uuid-level-2",
            "level_name": "Nivel 2",
            "order_index": 2,
            "xp_required": 100,
            "category": "previo",
            "created_at": "2025-08-16T08:00:00Z"
        }
    ]
}
```

### `GET /api/levels/{level_id}`
**Descripción:** Obtener información de un nivel específico

**Request:**
```bash
curl http://localhost:5000/api/levels/uuid-level-1
```

**Response:**
```json
{
    "success": true,
    "message": "Nivel encontrado",
    "data": {
        "id": "uuid-level-1",
        "level_name": "Nivel 1",
        "order_index": 1,
        "xp_required": 0,
        "category": "previo",
        "created_at": "2025-08-16T08:00:00Z"
    }
}
```

### `GET /api/levels/{level_id}/example-texts`
**Descripción:** Obtener textos de ejemplo de un nivel

**Request:**
```bash
curl http://localhost:5000/api/levels/uuid-level-1/example-texts
```

**Response:**
```json
{
    "success": true,
    "message": "Textos de ejemplo obtenidos",
    "data": [
        {
            "id": "uuid-text-1",
            "level_id": "uuid-level-1",
            "slot_no": 1,
            "title": "Nivel 1 · Ejemplo 1",
            "content": "Este es un texto de ejemplo para nivel 1...",
            "paragraphs": 3,
            "is_active": true,
            "version": 1,
            "created_at": "2025-08-16T08:00:00Z"
        }
    ]
}
```

### `POST /api/levels/{level_id}/example-texts`
**Descripción:** Crear/actualizar texto de ejemplo para un nivel

**Request:**
```bash
curl -X POST http://localhost:5000/api/levels/uuid-level-1/example-texts \
  -H "Content-Type: application/json" \
  -d '{
    "slot_no": 1,
    "title": "Mi texto personalizado",
    "content": "Párrafo 1...\n\nPárrafo 2...\n\nPárrafo 3...",
    "paragraphs": 3
  }'
```

**Request Body:**
```json
{
    "slot_no": 1,                           // Número de slot (1-4)
    "title": "string",                      // Título del texto
    "content": "string",                    // Contenido (3-5 párrafos)
    "paragraphs": 3                        // Número de párrafos
}
```

**Response:**
```json
{
    "success": true,
    "message": "Texto de ejemplo guardado",
    "data": {
        "id": "uuid-text-new",
        "level_id": "uuid-level-1",
        "slot_no": 1,
        "title": "Mi texto personalizado",
        "content": "Párrafo 1...\n\nPárrafo 2...\n\nPárrafo 3...",
        "paragraphs": 3,
        "is_active": true,
        "version": 1,
        "created_at": "2025-08-16T11:30:00Z"
    }
}
```

---

## 📖 Pasajes y Contenido

### `GET /api/passages/{passage_id}`
**Descripción:** Obtener información de un pasaje específico

**Request:**
```bash
curl http://localhost:5000/api/passages/uuid-passage-123
```

**Response:**
```json
{
    "success": true,
    "message": "Pasaje encontrado",
    "data": {
        "id": "uuid-passage-123",
        "student_id": "uuid-student-123",
        "level_id": "uuid-level-1",
        "text": "Este es el contenido del pasaje generado por IA...",
        "language": "es",
        "generation_meta": {
            "model": "gpt-4o-mini",
            "temperature": 0.7,
            "onboarding_based": true
        },
        "model_name": "gpt-4o-mini",
        "created_at": "2025-08-16T11:00:00Z"
    }
}
```

### `GET /api/passages/{passage_id}/questions`
**Descripción:** Obtener preguntas de un pasaje

**Request:**
```bash
curl http://localhost:5000/api/passages/uuid-passage-123/questions
```

**Response:**
```json
{
    "success": true,
    "message": "Preguntas obtenidas",
    "data": [
        {
            "id": "uuid-question-1",
            "passage_id": "uuid-passage-123",
            "question_text": "¿Cuál es la idea principal del texto?",
            "question_type": "single_choice",
            "options": {
                "A": "Opción A",
                "B": "Opción B",
                "C": "Opción C",
                "D": "Opción D"
            },
            "difficulty": 2,
            "answer_key": {"correct": "A"},
            "created_at": "2025-08-16T11:05:00Z"
        }
    ]
}
```

### `POST /api/passages/answers`
**Descripción:** Guardar respuesta a pregunta de pasaje

**Request:**
```bash
curl -X POST http://localhost:5000/api/passages/answers \
  -H "Content-Type: application/json" \
  -d '{
    "passage_question_id": "uuid-question-1",
    "student_id": "uuid-student-123",
    "answer": {"selected": "A"}
  }'
```

**Request Body:**
```json
{
    "passage_question_id": "string",    // UUID de la pregunta
    "student_id": "string",             // UUID del estudiante
    "answer": {                         // Respuesta del estudiante
        "selected": "A",                // Para multiple choice
        "text": "Mi respuesta"          // Para preguntas abiertas
    }
}
```

**Response:**
```json
{
    "success": true,
    "message": "Respuesta evaluada y guardada",
    "data": {
        "id": "uuid-answer-new",
        "passage_question_id": "uuid-question-1",
        "student_id": "uuid-student-123",
        "answer": {"selected": "A"},
        "is_correct": true,
        "score": 10.0,
        "feedback": "¡Correcto! Excelente comprensión del texto.",
        "answered_at": "2025-08-16T11:45:00Z"
    }
}
```

---

## 🤖 Inteligencia Artificial

### `POST /api/ai/generate-personalized-passage`
**Descripción:** Generar pasaje personalizado con IA

**Request:**
```bash
curl -X POST http://localhost:5000/api/ai/generate-personalized-passage \
  -H "Content-Type: application/json" \
  -d '{
    "student_id": "uuid-student-123",
    "level_id": "uuid-level-1"
  }'
```

**Request Body:**
```json
{
    "student_id": "string",     // UUID del estudiante
    "level_id": "string"        // UUID del nivel
}
```

**Response:**
```json
{
    "success": true,
    "message": "Pasaje generado exitosamente",
    "data": {
        "passage_id": "uuid-new-passage",
        "text": "Contenido personalizado generado por IA basado en las respuestas de onboarding del estudiante...",
        "metadata": {
            "model": "gpt-4o-mini",
            "personalization_factors": ["materia_favorita", "nivel_lectura"],
            "generation_time": 3.2,
            "word_count": 245
        }
    }
}
```

### `POST /api/ai/generate-passage-questions`
**Descripción:** Generar preguntas para un pasaje con IA

**Request:**
```bash
curl -X POST http://localhost:5000/api/ai/generate-passage-questions \
  -H "Content-Type: application/json" \
  -d '{
    "passage_id": "uuid-passage-123",
    "num_questions": 3
  }'
```

**Request Body:**
```json
{
    "passage_id": "string",     // UUID del pasaje
    "num_questions": 3          // Número de preguntas a generar (1-5)
}
```

**Response:**
```json
{
    "success": true,
    "message": "Preguntas generadas exitosamente",
    "data": {
        "questions": [
            {
                "id": "uuid-q1",
                "question_text": "¿Cuál es el tema principal del texto?",
                "question_type": "single_choice",
                "options": {
                    "A": "La historia",
                    "B": "La ciencia",
                    "C": "El arte",
                    "D": "La música"
                },
                "difficulty": 2,
                "answer_key": {"correct": "A"}
            }
        ],
        "metadata": {
            "generation_time": 2.1,
            "model": "gpt-4o-mini"
        }
    }
}
```

### `POST /api/ai/generate-example-text`
**Descripción:** Generar texto de ejemplo para nivel con IA

**Request:**
```bash
curl -X POST http://localhost:5000/api/ai/generate-example-text \
  -H "Content-Type: application/json" \
  -d '{
    "level_id": "uuid-level-1",
    "topic": "ciencias naturales",
    "paragraphs": 4
  }'
```

**Request Body:**
```json
{
    "level_id": "string",       // UUID del nivel
    "topic": "string",          // Tema del texto
    "paragraphs": 4             // Número de párrafos (3-5)
}
```

**Response:**
```json
{
    "success": true,
    "message": "Texto de ejemplo generado",
    "data": {
        "text": "Párrafo 1 sobre ciencias naturales...\n\nPárrafo 2...",
        "title": "Las Ciencias Naturales: Una Introducción",
        "metadata": {
            "word_count": 320,
            "reading_level": "previo",
            "generation_time": 2.8
        }
    }
}
```

---

## 📊 Progreso y Estadísticas

### `GET /api/students/{student_id}/stats`
**Descripción:** Obtener estadísticas de un estudiante

**Request:**
```bash
curl http://localhost:5000/api/students/uuid-student-123/stats
```

**Response:**
```json
{
    "success": true,
    "message": "Estadísticas obtenidas",
    "data": {
        "general": {
            "total_xp": 450,
            "streak_days": 7,
            "coins": 120,
            "last_activity_at": "2025-08-16T10:30:00Z"
        },
        "progress": [
            {
                "level_id": "uuid-level-1",
                "level_name": "Nivel 1",
                "status": "completed",
                "xp_earned": 100,
                "stars": 3,
                "completed_at": "2025-08-15T14:30:00Z"
            }
        ],
        "recent_activity": [
            {
                "type": "passage_completed",
                "description": "Completó texto personalizado",
                "xp_gained": 25,
                "timestamp": "2025-08-16T10:30:00Z"
            }
        ]
    }
}
```

### `GET /api/students/{student_id}/progress`
**Descripción:** Obtener progreso detallado de un estudiante

**Request:**
```bash
curl http://localhost:5000/api/students/uuid-student-123/progress
```

**Response:**
```json
{
    "success": true,
    "message": "Progreso obtenido",
    "data": [
        {
            "id": "uuid-progress-1",
            "student_id": "uuid-student-123",
            "level_id": "uuid-level-1",
            "status": "completed",
            "xp_earned": 100,
            "stars": 3,
            "started_at": "2025-08-15T10:00:00Z",
            "completed_at": "2025-08-15T14:30:00Z"
        }
    ]
}
```

### `GET /api/students/{student_id}/answers/{question_id}`
**Descripción:** Obtener respuesta específica de un estudiante

**Request:**
```bash
curl http://localhost:5000/api/students/uuid-student-123/answers/uuid-question-1
```

**Response:**
```json
{
    "success": true,
    "message": "Respuesta encontrada",
    "data": {
        "id": "uuid-answer-1",
        "student_id": "uuid-student-123",
        "question_id": "uuid-question-1",
        "answer": {"selected": "A"},
        "is_correct": true,
        "score": 10.0,
        "feedback": "¡Correcto! Excelente comprensión.",
        "answered_at": "2025-08-16T11:45:00Z",
        "question_details": {
            "question_text": "¿Cuál es la idea principal?",
            "correct_answer": "A",
            "difficulty": 2
        }
    }
}
```

---

## 👨‍🏫 Administración (Profesores)

### `GET /api/admin/system-summary`
**Descripción:** Obtener resumen general del sistema

**Request:**
```bash
curl http://localhost:5000/api/admin/system-summary
```

**Response:**
```json
{
    "success": true,
    "message": "Resumen obtenido",
    "data": {
        "users": {
            "total": 25,
            "students": 22,
            "teachers": 3,
            "new_this_week": 5
        },
        "content": {
            "levels": 10,
            "example_texts": 35,
            "passages_generated": 150,
            "questions_created": 450
        },
        "activity": {
            "active_students_today": 8,
            "passages_completed_today": 12,
            "total_xp_earned_today": 850
        },
        "ai_usage": {
            "passages_generated_today": 5,
            "questions_generated_today": 15,
            "api_calls_remaining": 875
        }
    }
}
```

### `GET /api/admin/students-performance`
**Descripción:** Obtener rendimiento de todos los estudiantes

**Request:**
```bash
curl http://localhost:5000/api/admin/students-performance
```

**Response:**
```json
{
    "success": true,
    "message": "Rendimiento obtenido",
    "data": [
        {
            "student": {
                "id": "uuid-student-1",
                "display_name": "Ana García",
                "email": "ana@edhack.com"
            },
            "stats": {
                "total_xp": 450,
                "levels_completed": 3,
                "current_streak": 7,
                "avg_score": 8.5,
                "last_activity": "2025-08-16T10:30:00Z"
            },
            "recent_answers": [
                {
                    "question_text": "¿Cuál es la idea principal?",
                    "answer": "A",
                    "is_correct": true,
                    "score": 10.0,
                    "answered_at": "2025-08-16T10:30:00Z"
                }
            ]
        }
    ]
}
```

---

## 🏆 Recompensas y Puntajes

### `GET /api/rewards`
**Descripción:** Obtener todas las recompensas disponibles

**Request:**
```bash
curl http://localhost:5000/api/rewards
```

**Response:**
```json
{
    "success": true,
    "message": "Recompensas obtenidas",
    "data": [
        {
            "id": "uuid-reward-1",
            "reward_name": "Primera Lectura",
            "reward_type": "badge",
            "value": 1,
            "metadata": {
                "icon": "📚",
                "description": "Completaste tu primera lectura"
            },
            "created_at": "2025-08-16T08:00:00Z"
        }
    ]
}
```

### `GET /api/students/{student_id}/rewards`
**Descripción:** Obtener recompensas de un estudiante

**Request:**
```bash
curl http://localhost:5000/api/students/uuid-student-123/rewards
```

**Response:**
```json
{
    "success": true,
    "message": "Recompensas del estudiante obtenidas",
    "data": [
        {
            "id": "uuid-user-reward-1",
            "student_id": "uuid-student-123",
            "reward": {
                "id": "uuid-reward-1",
                "reward_name": "Primera Lectura",
                "reward_type": "badge",
                "value": 1,
                "metadata": {"icon": "📚"}
            },
            "granted_at": "2025-08-15T14:30:00Z"
        }
    ]
}
```

### `GET /api/students/{student_id}/scoring-events`
**Descripción:** Obtener historial de eventos de puntaje

**Request:**
```bash
curl http://localhost:5000/api/students/uuid-student-123/scoring-events
```

**Response:**
```json
{
    "success": true,
    "message": "Eventos de puntaje obtenidos",
    "data": [
        {
            "id": "uuid-event-1",
            "student_id": "uuid-student-123",
            "source_type": "passage_answer",
            "source_id": "uuid-answer-1",
            "delta_xp": 25,
            "delta_coins": 5,
            "created_at": "2025-08-16T10:30:00Z",
            "description": "Respuesta correcta en Nivel 1"
        }
    ]
}
```

---

## ❌ Manejo de Errores

### Códigos de Estado HTTP

- **200**: Éxito
- **201**: Creado exitosamente
- **400**: Error en la solicitud (datos inválidos)
- **404**: Recurso no encontrado
- **500**: Error interno del servidor

### Estructura de Error Estándar

```json
{
    "success": false,
    "message": "Descripción del error",
    "error": "Detalles técnicos del error",
    "code": "ERROR_CODE",
    "timestamp": "2025-08-16T11:00:00Z"
}
```

### Errores Comunes

**Usuario no encontrado:**
```json
{
    "success": false,
    "message": "Usuario no encontrado",
    "error": "No existe usuario con ID: uuid-123",
    "code": "USER_NOT_FOUND"
}
```

**Datos inválidos:**
```json
{
    "success": false,
    "message": "Datos de solicitud inválidos",
    "error": "El campo 'role' debe ser 'STUDENT' o 'TEACHER'",
    "code": "INVALID_INPUT"
}
```

**Error de IA:**
```json
{
    "success": false,
    "message": "Error en generación de IA",
    "error": "API de OpenAI no disponible",
    "code": "AI_SERVICE_ERROR"
}
```

**Error de base de datos:**
```json
{
    "success": false,
    "message": "Error de base de datos",
    "error": "No se pudo conectar a Supabase",
    "code": "DATABASE_ERROR"
}
```

---

## 🚀 Ejemplos de Uso Completos

### Flujo Completo de Estudiante

```javascript
// 1. Login
const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'María López', role: 'STUDENT' })
});
const { data: { user } } = await loginResponse.json();

// 2. Obtener preguntas de onboarding
const questionsResponse = await fetch('http://localhost:5000/api/onboarding/questions');
const { data: questions } = await questionsResponse.json();

// 3. Responder onboarding
for (const question of questions) {
    await fetch('http://localhost:5000/api/onboarding/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            student_id: user.id,
            question_id: question.id,
            answer: { selected: 'A' }
        })
    });
}

// 4. Obtener niveles
const levelsResponse = await fetch('http://localhost:5000/api/levels');
const { data: levels } = await levelsResponse.json();

// 5. Generar contenido personalizado
const passageResponse = await fetch('http://localhost:5000/api/ai/generate-personalized-passage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        student_id: user.id,
        level_id: levels[0].id
    })
});
const { data: passage } = await passageResponse.json();

// 6. Generar preguntas del pasaje
const questionsGenResponse = await fetch('http://localhost:5000/api/ai/generate-passage-questions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        passage_id: passage.passage_id,
        num_questions: 3
    })
});
const { data: { questions: passageQuestions } } = await questionsGenResponse.json();

// 7. Responder preguntas del pasaje
for (const question of passageQuestions) {
    await fetch('http://localhost:5000/api/passages/answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            passage_question_id: question.id,
            student_id: user.id,
            answer: { selected: 'A' }
        })
    });
}

// 8. Ver progreso
const statsResponse = await fetch(`http://localhost:5000/api/students/${user.id}/stats`);
const { data: stats } = await statsResponse.json();
console.log('Progreso:', stats);
```

### Flujo Completo de Profesor

```javascript
// 1. Login como profesor
const teacherLogin = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Prof. García', role: 'TEACHER' })
});
const { data: { user: teacher } } = await teacherLogin.json();

// 2. Ver resumen del sistema
const summaryResponse = await fetch('http://localhost:5000/api/admin/system-summary');
const { data: summary } = await summaryResponse.json();

// 3. Ver rendimiento de estudiantes
const performanceResponse = await fetch('http://localhost:5000/api/admin/students-performance');
const { data: performance } = await performanceResponse.json();

// 4. Crear pregunta de onboarding
const newQuestionResponse = await fetch('http://localhost:5000/api/onboarding/questions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        prompt: '¿Cuál es tu género literario favorito?',
        answer_type: 'single_choice',
        options: {
            'A': 'Ficción',
            'B': 'No ficción',
            'C': 'Poesía',
            'D': 'Drama'
        }
    })
});

// 5. Crear texto de ejemplo para nivel
const exampleTextResponse = await fetch('http://localhost:5000/api/levels/uuid-level-1/example-texts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        slot_no: 1,
        title: 'Historia de la Astronomía',
        content: 'Párrafo 1...\n\nPárrafo 2...\n\nPárrafo 3...',
        paragraphs: 3
    })
});

console.log('Sistema de profesor configurado exitosamente');
```

---

## 📋 Checklist de Integración

### Para Desarrolladores Frontend

- [ ] **Configurar base URL**: `http://localhost:5000/api`
- [ ] **Implementar manejo de errores** para respuestas con `success: false`
- [ ] **Guardar información de usuario** después del login exitoso
- [ ] **Implementar flujo de onboarding** completo
- [ ] **Manejar estados de carga** para operaciones de IA (pueden tomar tiempo)
- [ ] **Implementar paginación** si planeas mostrar muchos datos
- [ ] **Validar datos** antes de enviar requests

### Para Desarrolladores Backend

- [ ] **Variables de entorno** configuradas correctamente
- [ ] **Base de datos** Supabase conectada
- [ ] **API de OpenAI** configurada con créditos
- [ ] **CORS** habilitado para tu dominio frontend
- [ ] **Logs** activados para debugging
- [ ] **Manejo de errores** robusto implementado

---

## 🔧 Configuración de Desarrollo

### Variables de Entorno Requeridas

```bash
# .env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu_supabase_anon_key
OPENAI_API_KEY=sk-tu_openai_api_key

# Opcionales
SECRET_KEY=tu_secret_key_para_flask
FLASK_DEBUG=True
API_HOST=0.0.0.0
API_PORT=5000
CORS_ORIGINS=*
```

### Comandos de Desarrollo

```bash
# Instalar dependencias
pip install -r requirements.txt

# Ejecutar en modo desarrollo
python start_api.py --debug --port 5000

# Ejecutar tests
python test_simple_api.py

# Verificar conexiones
python verify_connections.py
```

---

## 🌐 Despliegue en Producción

### Consideraciones de Seguridad

1. **CORS**: Limitar orígenes permitidos
2. **Variables de entorno**: Usar secrets seguros
3. **HTTPS**: Siempre usar SSL en producción
4. **Rate limiting**: Implementar límites de requests
5. **Autenticación**: Considerar JWT para autenticación robusta

### Ejemplo de Configuración de Producción

```bash
# .env.production
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu_supabase_service_role_key
OPENAI_API_KEY=sk-tu_openai_production_key
SECRET_KEY=supersecretkey123456789
FLASK_DEBUG=False
API_HOST=0.0.0.0
API_PORT=80
CORS_ORIGINS=https://tu-frontend.com,https://www.tu-frontend.com
```

---

¡Tu API de EdHack está completamente documentada y lista para usar! 🚀

**Próximos pasos:**
1. Integra estos endpoints en tu frontend
2. Prueba cada funcionalidad paso a paso
3. Implementa manejo de errores robusto
4. ¡Construye una experiencia educativa increíble!

Para soporte o preguntas específicas, revisa los logs del servidor o prueba los endpoints con las herramientas de desarrollo de tu navegador.