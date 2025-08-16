// services/mockApi.ts - Mock data service for development

// Types for API responses
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface Level {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  created_at: string;
}

export interface ExampleText {
  id: string;
  level_id: string;
  slot_no: number;
  content: string;
  paragraphs: number;
  created_at: string;
}

export interface User {
  id: string;
  name: string;
  role: 'STUDENT' | 'TEACHER';
  created_at: string;
  is_new_user?: boolean;
}

export interface StudentStats {
  student_id: string;
  total_passages: number;
  completed_passages: number;
  average_score: number;
  last_activity: string;
}

export interface SystemSummary {
  total_students: number;
  total_passages: number;
  total_levels: number;
  average_completion_rate: number;
}

// Mock data
const MOCK_LEVELS: Level[] = [
  {
    id: 'beginner-1',
    name: 'Fundamentos Básicos',
    description: 'Aprende los conceptos fundamentales',
    difficulty: 'beginner',
    created_at: '2024-01-01'
  },
  {
    id: 'beginner-2',
    name: 'Vocabulario Esencial',
    description: 'Construye tu vocabulario base',
    difficulty: 'beginner',
    created_at: '2024-01-02'
  },
  {
    id: 'intermediate-1',
    name: 'Conversación Práctica',
    description: 'Practica diálogos cotidianos',
    difficulty: 'intermediate',
    created_at: '2024-01-03'
  },
  {
    id: 'intermediate-2',
    name: 'Gramática Avanzada',
    description: 'Domina estructuras complejas',
    difficulty: 'intermediate',
    created_at: '2024-01-04'
  },
  {
    id: 'advanced-1',
    name: 'Expresión Avanzada',
    description: 'Desarrolla fluidez completa',
    difficulty: 'advanced',
    created_at: '2024-01-05'
  }
];

const MOCK_TEXTS: ExampleText[] = [
  {
    id: 'text-1',
    level_id: 'beginner-1',
    slot_no: 1,
    content: 'Hola, mi nombre es María. Soy estudiante de español. Me gusta aprender idiomas nuevos porque es muy interesante y útil para mi futuro.\n\nVivo en una ciudad pequeña pero muy bonita. Todos los días voy a la escuela y estudio mucho. Por las tardes, me gusta leer libros y escuchar música.',
    paragraphs: 2,
    created_at: '2024-01-01'
  },
  {
    id: 'text-2',
    level_id: 'beginner-1',
    slot_no: 2,
    content: 'El clima hoy está muy agradable. El sol brilla y no hay nubes en el cielo. Es un día perfecto para salir al parque y disfrutar de la naturaleza.\n\nLos niños están jugando en el patio mientras sus padres conversan sentados en las bancas. Todo el mundo parece estar feliz y relajado.',
    paragraphs: 2,
    created_at: '2024-01-01'
  },
  {
    id: 'text-3',
    level_id: 'intermediate-1',
    slot_no: 1,
    content: 'La tecnología ha transformado completamente la manera en que nos comunicamos. Antes, las cartas tardaban semanas en llegar a su destino, pero ahora podemos enviar mensajes instantáneos a cualquier parte del mundo.\n\nSin embargo, algunos expertos argumentan que esta facilidad de comunicación también ha creado nuevos problemas. Las personas pueden sentirse abrumadas por la cantidad constante de información y notificaciones.\n\nEs importante encontrar un equilibrio entre aprovechar las ventajas de la tecnología y mantener tiempo para desconectarse y disfrutar de actividades más tranquilas.',
    paragraphs: 3,
    created_at: '2024-01-03'
  }
];

const MOCK_USERS: User[] = [
  {
    id: 'student-1',
    name: 'Ana García',
    role: 'STUDENT',
    created_at: '2024-01-01',
    is_new_user: false
  },
  {
    id: 'student-2',
    name: 'Carlos López',
    role: 'STUDENT',
    created_at: '2024-01-02',
    is_new_user: false
  },
  {
    id: 'teacher-1',
    name: 'Prof. María Rodríguez',
    role: 'TEACHER',
    created_at: '2024-01-01',
    is_new_user: false
  }
];

const MOCK_STATS: StudentStats[] = [
  {
    student_id: 'student-1',
    total_passages: 15,
    completed_passages: 12,
    average_score: 87.5,
    last_activity: '2024-01-15'
  },
  {
    student_id: 'student-2',
    total_passages: 10,
    completed_passages: 8,
    average_score: 92.3,
    last_activity: '2024-01-14'
  }
];

const MOCK_SYSTEM_SUMMARY: SystemSummary = {
  total_students: 25,
  total_passages: 45,
  total_levels: 5,
  average_completion_rate: 78.5
};

// Simulate API delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API service
export const mockApiService = {
  // Levels
  async getLevels(): Promise<ApiResponse<Level[]>> {
    await delay();
    return {
      success: true,
      message: 'Levels retrieved successfully',
      data: MOCK_LEVELS
    };
  },

  async createLevel(level: Omit<Level, 'id' | 'created_at'>): Promise<ApiResponse<Level>> {
    await delay();
    const newLevel: Level = {
      ...level,
      id: `level-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    return {
      success: true,
      message: 'Level created successfully',
      data: newLevel
    };
  },

  // Example Texts
  async getExampleTexts(levelId: string): Promise<ApiResponse<ExampleText[]>> {
    await delay();
    const texts = MOCK_TEXTS.filter(text => text.level_id === levelId);
    return {
      success: true,
      message: 'Example texts retrieved successfully',
      data: texts
    };
  },

  async createExampleText(text: Omit<ExampleText, 'id' | 'created_at'>): Promise<ApiResponse<ExampleText>> {
    await delay();
    const newText: ExampleText = {
      ...text,
      id: `text-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    return {
      success: true,
      message: 'Example text created successfully',
      data: newText
    };
  },

  // Users
  async getUsers(): Promise<ApiResponse<User[]>> {
    await delay();
    return {
      success: true,
      message: 'Users retrieved successfully',
      data: MOCK_USERS
    };
  },

  async getStudents(): Promise<ApiResponse<User[]>> {
    await delay();
    const students = MOCK_USERS.filter(user => user.role === 'STUDENT');
    return {
      success: true,
      message: 'Students retrieved successfully',
      data: students
    };
  },

  async createUser(user: Omit<User, 'id' | 'created_at'>): Promise<ApiResponse<User>> {
    await delay();
    const newUser: User = {
      ...user,
      id: `user-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    return {
      success: true,
      message: 'User created successfully',
      data: newUser
    };
  },

  // Student Stats
  async getStudentStats(): Promise<ApiResponse<StudentStats[]>> {
    await delay();
    return {
      success: true,
      message: 'Student stats retrieved successfully',
      data: MOCK_STATS
    };
  },

  // System Summary
  async getSystemSummary(): Promise<ApiResponse<SystemSummary>> {
    await delay();
    return {
      success: true,
      message: 'System summary retrieved successfully',
      data: MOCK_SYSTEM_SUMMARY
    };
  },

  // Text Generation (Mock)
  async generateText(params: {
    level_id: string;
    slot_no: number;
    paragraphs: number;
    topic?: string;
  }): Promise<ApiResponse<ExampleText>> {
    await delay(1000); // Simulate longer generation time
    
    const topics = [
      'La importancia de la educación',
      'Tecnología en la vida moderna',
      'Cuidado del medio ambiente',
      'Tradiciones culturales',
      'Deportes y salud'
    ];
    
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const content = `Este es un texto generado sobre ${params.topic || randomTopic}.\n\nContiene ${params.paragraphs} párrafos como fue solicitado. El contenido está adaptado para el nivel especificado y proporciona material educativo apropiado para los estudiantes.`;
    
    const newText: ExampleText = {
      id: `generated-${Date.now()}`,
      level_id: params.level_id,
      slot_no: params.slot_no,
      content,
      paragraphs: params.paragraphs,
      created_at: new Date().toISOString()
    };

    return {
      success: true,
      message: 'Text generated successfully',
      data: newText
    };
  }
};

// Local Storage service for caching
export const LocalStorageService = {
  // Levels
  setLevels(levels: Level[]): void {
    localStorage.setItem('edhack_levels', JSON.stringify(levels));
  },

  getLevels(): Level[] | null {
    const stored = localStorage.getItem('edhack_levels');
    return stored ? JSON.parse(stored) : null;
  },

  // Example Texts
  setExampleTexts(levelId: string, texts: ExampleText[]): void {
    localStorage.setItem(`edhack_texts_${levelId}`, JSON.stringify(texts));
  },

  getExampleTexts(levelId: string): ExampleText[] | null {
    const stored = localStorage.getItem(`edhack_texts_${levelId}`);
    return stored ? JSON.parse(stored) : null;
  },

  // Users
  setCurrentUser(user: User): void {
    localStorage.setItem('edhack_current_user', JSON.stringify(user));
  },

  getCurrentUser(): User | null {
    const stored = localStorage.getItem('edhack_current_user');
    return stored ? JSON.parse(stored) : null;
  },

  // Clear all data
  clearUserData(): void {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('edhack_'));
    keys.forEach(key => localStorage.removeItem(key));
  }
};

// Export the mock service as the main API service
export const apiService = mockApiService;
