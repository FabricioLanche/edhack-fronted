import React, { useState, useEffect } from 'react';
import type { ScreenProps } from '../interfaces';
import { useUser } from '../navigation/UserContext';
import { apiService, LocalStorageService, type Level, type ExampleText } from '../services/api';

const LevelsScreen: React.FC<ScreenProps> = ({ navigate }) => {
  const { currentUser, logout } = useUser();
  const [levels, setLevels] = useState<Level[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [exampleTexts, setExampleTexts] = useState<ExampleText[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTexts, setIsLoadingTexts] = useState(false);

  useEffect(() => {
    loadLevels();
  }, []);

  const loadLevels = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Try to load from API first
      const response = await apiService.getLevels();
      if (response.success && response.data) {
        setLevels(response.data);
        LocalStorageService.setLevels(response.data);
      }
    } catch (error) {
      console.error('Error loading levels from API:', error);
      // Fallback to localStorage
      const cachedLevels = LocalStorageService.getLevels();
      if (cachedLevels) {
        setLevels(cachedLevels);
      } else {
        // If no cached levels, use mock data
        setLevels(getMockLevels());
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getMockLevels = (): Level[] => [
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
      created_at: '2024-01-01'
    },
    {
      id: 'intermediate-1',
      name: 'Conversación Práctica',
      description: 'Practica diálogos cotidianos',
      difficulty: 'intermediate',
      created_at: '2024-01-01'
    },
    {
      id: 'intermediate-2',
      name: 'Gramática Avanzada',
      description: 'Domina estructuras complejas',
      difficulty: 'intermediate',
      created_at: '2024-01-01'
    },
    {
      id: 'advanced-1',
      name: 'Expresión Avanzada',
      description: 'Desarrolla fluidez completa',
      difficulty: 'advanced',
      created_at: '2024-01-01'
    }
  ];

  const loadExampleTexts = async (levelId: string): Promise<void> => {
    setIsLoadingTexts(true);
    try {
      const response = await apiService.getExampleTexts(levelId);
      if (response.success && response.data) {
        setExampleTexts(response.data);
        LocalStorageService.setExampleTexts(levelId, response.data);
      }
    } catch (error) {
      console.error('Error loading example texts:', error);
      // Fallback to localStorage
      const cachedTexts = LocalStorageService.getExampleTexts(levelId);
      if (cachedTexts) {
        setExampleTexts(cachedTexts);
      } else {
        setExampleTexts([]);
      }
    } finally {
      setIsLoadingTexts(false);
    }
  };

  const handleLevelClick = async (level: Level): Promise<void> => {
    setSelectedLevel(level);
    await loadExampleTexts(level.id);
  };

  const handleBackToLevels = (): void => {
    setSelectedLevel(null);
    setExampleTexts([]);
  };

  const handleLogout = (): void => {
    LocalStorageService.clearUserData();
    logout();
    navigate('home');
  };

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyLabel = (difficulty: string): string => {
    switch (difficulty) {
      case 'beginner': return 'Principiante';
      case 'intermediate': return 'Intermedio';
      case 'advanced': return 'Avanzado';
      default: return 'Desconocido';
    }
  };

  const getDifficultyIcon = (difficulty: string): string => {
    switch (difficulty) {
      case 'beginner': return '🌱';
      case 'intermediate': return '🌿';
      case 'advanced': return '🌳';
      default: return '📚';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando niveles...</p>
        </div>
      </div>
    );
  }

  // Show level detail view
  if (selectedLevel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleBackToLevels}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{selectedLevel.name}</h1>
                  <p className="text-gray-600">{selectedLevel.description}</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Textos de Práctica</h2>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedLevel.difficulty)}`}>
                {getDifficultyIcon(selectedLevel.difficulty)} {getDifficultyLabel(selectedLevel.difficulty)}
              </div>
            </div>

            {isLoadingTexts ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Cargando textos...</p>
              </div>
            ) : exampleTexts.length > 0 ? (
              <div className="space-y-6">
                {exampleTexts.map((text) => (
                  <div key={text.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Texto {text.slot_no}</h3>
                        <p className="text-sm text-gray-600">{text.paragraphs} párrafos</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(text.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="prose max-w-none">
                      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {text.content}
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        Comenzar Práctica
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay actividades disponibles</h3>
                <p className="text-gray-600 mb-4">
                  Aún no se han generado textos de práctica para este nivel.
                </p>
                <p className="text-sm text-gray-500">
                  Contacta a tu profesor para que genere contenido para este nivel.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show levels list view
  const completedLevels = levels.filter(level => level.difficulty === 'beginner').length;
  const totalProgress = levels.length > 0 ? Math.round((completedLevels / levels.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('home')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mis Niveles</h1>
                <p className="text-gray-600">Estudiante: {currentUser?.name}</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Progreso Total</p>
                <div className="text-3xl font-bold text-indigo-600">{totalProgress}%</div>
              </div>
              <div className="text-4xl">📈</div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Niveles Completados</p>
                <div className="text-3xl font-bold text-green-600">{completedLevels}</div>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Disponibles</p>
                <div className="text-3xl font-bold text-purple-600">{levels.length - completedLevels}</div>
              </div>
              <div className="text-4xl">🎯</div>
            </div>
          </div>
        </div>

        {/* Levels Grid */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Niveles Disponibles</h2>
          
          {levels.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay niveles disponibles</h3>
              <p className="text-gray-600">
                Aún no se han configurado niveles de aprendizaje.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {levels.map((level) => (
                <div
                  key={level.id}
                  onClick={() => handleLevelClick(level)}
                  className="border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{getDifficultyIcon(level.difficulty)}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {level.name}
                        </h3>
                        <p className="text-sm text-gray-600">{level.description}</p>
                      </div>
                    </div>
                    
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(level.difficulty)}`}>
                      {getDifficultyLabel(level.difficulty)}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Creado: {new Date(level.created_at).toLocaleDateString()}
                    </div>
                    
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LevelsScreen;
