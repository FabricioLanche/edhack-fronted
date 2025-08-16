import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// Tipos para el formulario de personalización
export interface PersonalizationAnswer {
  questionId: string;
  answer: string;
  inputType: 'text' | 'select' | 'audio';
}

export interface PersonalizationQuestion {
  id: string;
  question: string;
  type: 'text' | 'select' | 'audio';
  options?: string[];
  required?: boolean;
  placeholder?: string;
}

export interface PersonalizationData {
  answers: PersonalizationAnswer[];
  completedAt?: Date;
  isComplete: boolean;
}

interface PersonalizationContextType {
  data: PersonalizationData;
  updateAnswer: (questionId: string, answer: string, inputType: PersonalizationAnswer['inputType']) => void;
  clearData: () => void;
  saveData: () => void;
  loadData: () => void;
  getAnswer: (questionId: string) => string | undefined;
  isQuestionAnswered: (questionId: string) => boolean;
  getCompletionPercentage: () => number;
}

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

export const usePersonalization = (): PersonalizationContextType => {
  const context = useContext(PersonalizationContext);
  if (!context) {
    throw new Error('usePersonalization must be used within PersonalizationProvider');
  }
  return context;
};

interface PersonalizationProviderProps {
  children: ReactNode;
  totalQuestions?: number;
}

const STORAGE_KEY = 'personalization_data';

export const PersonalizationProvider: React.FC<PersonalizationProviderProps> = ({ 
  children, 
  totalQuestions = 0 
}) => {
  const [data, setData] = useState<PersonalizationData>({
    answers: [],
    isComplete: false
  });

  // Cargar datos al inicializar
  useEffect(() => {
    loadData();
  }, []);

  const updateAnswer = (questionId: string, answer: string, inputType: PersonalizationAnswer['inputType']): void => {
    setData(prevData => {
      const existingAnswerIndex = prevData.answers.findIndex(a => a.questionId === questionId);
      
      let newAnswers: PersonalizationAnswer[];
      
      if (existingAnswerIndex >= 0) {
        // Actualizar respuesta existente
        newAnswers = prevData.answers.map((a, index) => 
          index === existingAnswerIndex 
            ? { ...a, answer, inputType }
            : a
        );
      } else {
        // Agregar nueva respuesta
        newAnswers = [...prevData.answers, { questionId, answer, inputType }];
      }

      const isComplete = totalQuestions > 0 && newAnswers.length >= totalQuestions;

      return {
        ...prevData,
        answers: newAnswers,
        isComplete,
        completedAt: isComplete ? new Date() : prevData.completedAt
      };
    });
  };

  const clearData = (): void => {
    const emptyData: PersonalizationData = {
      answers: [],
      isComplete: false
    };
    setData(emptyData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const saveData = (): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving personalization data:', error);
    }
  };

  const loadData = (): void => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const parsedData: PersonalizationData = JSON.parse(storedData);
        setData(parsedData);
      }
    } catch (error) {
      console.error('Error loading personalization data:', error);
    }
  };

  const getAnswer = (questionId: string): string | undefined => {
    const answer = data.answers.find(a => a.questionId === questionId);
    return answer?.answer;
  };

  const isQuestionAnswered = (questionId: string): boolean => {
    return data.answers.some(a => a.questionId === questionId && a.answer.trim() !== '');
  };

  const getCompletionPercentage = (): number => {
    if (totalQuestions === 0) return 0;
    return Math.round((data.answers.length / totalQuestions) * 100);
  };

  // Guardar automáticamente cuando cambien los datos
  useEffect(() => {
    saveData();
  }, [data]);

  const value: PersonalizationContextType = {
    data,
    updateAnswer,
    clearData,
    saveData,
    loadData,
    getAnswer,
    isQuestionAnswered,
    getCompletionPercentage
  };

  return (
    <PersonalizationContext.Provider value={value}>
      {children}
    </PersonalizationContext.Provider>
  );
};