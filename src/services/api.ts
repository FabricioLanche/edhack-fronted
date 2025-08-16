// services/api.ts
import axios from 'axios';

// Base configuration - Using proxy to avoid CORS issues
const BASE_URL = '/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
  total_time_spent: number;
  last_activity: string;
}

export interface SystemSummary {
  total_students: number;
  total_teachers: number;
  total_passages: number;
  total_questions: number;
  avg_student_progress: number;
}

// API Service Class
class ApiService {
  // Health Check
  async healthCheck(): Promise<ApiResponse<{ status: string; ai: string }>> {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Authentication
  async login(name: string, role: 'STUDENT' | 'TEACHER'): Promise<ApiResponse<{ user: User }>> {
    try {
      const response = await api.post('/auth/login', { name, role });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Users
  async getUsersByRole(role: 'STUDENT' | 'TEACHER'): Promise<ApiResponse<User[]>> {
    try {
      const response = await api.get(`/users/role/${role}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getUserById(userId: string): Promise<ApiResponse<User>> {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Levels
  async getLevels(): Promise<ApiResponse<Level[]>> {
    try {
      const response = await api.get('/levels');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getLevelById(levelId: string): Promise<ApiResponse<Level>> {
    try {
      const response = await api.get(`/levels/${levelId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Example Texts
  async getExampleTexts(levelId: string): Promise<ApiResponse<ExampleText[]>> {
    try {
      const response = await api.get(`/levels/${levelId}/example-texts`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createExampleText(levelId: string, slotNo: number, paragraphs: number): Promise<ApiResponse<ExampleText>> {
    try {
      const response = await api.post(`/levels/${levelId}/example-texts`, {
        slot_no: slotNo,
        paragraphs: paragraphs
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // AI Generation
  async generateExampleText(levelId: string, paragraphs: number): Promise<ApiResponse<{ content: string }>> {
    try {
      const response = await api.post('/ai/generate-example-text', {
        level_id: levelId,
        paragraphs: paragraphs
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async generatePersonalizedPassage(studentId: string, levelId: string): Promise<ApiResponse<any>> {
    try {
      const response = await api.post('/ai/generate-personalized-passage', {
        student_id: studentId,
        level_id: levelId
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async generatePassageQuestions(passageId: string, numQuestions: number = 3): Promise<ApiResponse<any>> {
    try {
      const response = await api.post('/ai/generate-passage-questions', {
        passage_id: passageId,
        num_questions: numQuestions
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Students Stats
  async getStudentStats(studentId: string): Promise<ApiResponse<StudentStats>> {
    try {
      const response = await api.get(`/students/${studentId}/stats`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getStudentProgress(studentId: string): Promise<ApiResponse<any[]>> {
    try {
      const response = await api.get(`/students/${studentId}/progress`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Admin (Teachers)
  async getSystemSummary(): Promise<ApiResponse<SystemSummary>> {
    try {
      const response = await api.get('/admin/system-summary');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getStudentsPerformance(): Promise<ApiResponse<any[]>> {
    try {
      const response = await api.get('/admin/students-performance');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Onboarding
  async getOnboardingQuestions(): Promise<ApiResponse<any[]>> {
    try {
      const response = await api.get('/onboarding/questions');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getOnboardingResponses(studentId: string): Promise<ApiResponse<any[]>> {
    try {
      const response = await api.get(`/onboarding/responses/${studentId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async saveOnboardingResponse(studentId: string, questionId: string, response: string): Promise<ApiResponse<any>> {
    try {
      const apiResponse = await api.post('/onboarding/responses', {
        student_id: studentId,
        question_id: questionId,
        response: response
      });
      return apiResponse.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error handling
  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      const errorCode = error.response?.data?.error || 'API_ERROR';
      return new Error(`${errorCode}: ${message}`);
    }
    return new Error('Unknown error occurred');
  }
}

// Create and export singleton instance
export const apiService = new ApiService();

// Helper functions for localStorage management
export const LocalStorageService = {
  // Store API data locally
  setLevels: (levels: Level[]) => {
    localStorage.setItem('edhack_levels', JSON.stringify(levels));
  },

  getLevels: (): Level[] | null => {
    const data = localStorage.getItem('edhack_levels');
    return data ? JSON.parse(data) : null;
  },

  setExampleTexts: (levelId: string, texts: ExampleText[]) => {
    localStorage.setItem(`edhack_texts_${levelId}`, JSON.stringify(texts));
  },

  getExampleTexts: (levelId: string): ExampleText[] | null => {
    const data = localStorage.getItem(`edhack_texts_${levelId}`);
    return data ? JSON.parse(data) : null;
  },

  setCurrentUser: (user: User) => {
    localStorage.setItem('edhack_current_user', JSON.stringify(user));
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem('edhack_current_user');
    return data ? JSON.parse(data) : null;
  },

  clearUserData: () => {
    localStorage.removeItem('edhack_current_user');
  },

  // Store system summary for teacher dashboard
  setSystemSummary: (summary: SystemSummary) => {
    localStorage.setItem('edhack_system_summary', JSON.stringify(summary));
  },

  getSystemSummary: (): SystemSummary | null => {
    const data = localStorage.getItem('edhack_system_summary');
    return data ? JSON.parse(data) : null;
  }
};

export default apiService;