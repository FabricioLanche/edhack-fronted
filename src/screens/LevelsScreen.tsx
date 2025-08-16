import React from 'react';
import type { ScreenProps, Level } from '../interfaces';
import { useUser } from '../navigation/UserContext';

// Mock levels data
const LEVELS: Level[] = [
  {
    id: 'beginner-1',
    title: 'Fundamentos Básicos',
    description: 'Aprende los conceptos fundamentales',
    difficulty: 'beginner',
    isUnlocked: true,
    progress: 85,
    icon: '🌱'
  },
  {
    id: 'beginner-2',
    title: 'Vocabulario Esencial',
    description: 'Construye tu vocabulario base',
    difficulty: 'beginner',
    isUnlocked: true,
    progress: 60,
    icon: '📚'
  },
  {
    id: 'intermediate-1',
    title: 'Conversación Práctica',
    description: 'Practica diálogos cotidianos',
    difficulty: 'intermediate',
    isUnlocked: true,
    progress: 30,
    icon: '💬'
  },
  {
    id: 'intermediate-2',
    title: 'Gramática Avanzada',
    description: 'Domina estructuras complejas',
    difficulty: 'intermediate',
    isUnlocked: false,
    progress: 0,
    icon: '📝'
  },
  {
    id: 'advanced-1',
    title: 'Expresión Avanzada',
    description: 'Desarrolla fluidez completa',
    difficulty: 'advanced',
    isUnlocked: false,
    progress: 0,
    icon: '🎯'
  }
];

const LevelsScreen: React.FC<ScreenProps> = ({ navigate }) => {
  const { currentUser, logout } = useUser();

  const handleLevelClick = (level: Level): void => {
    if (level.isUnlocked) {
      console.log('🎮 Iniciando nivel:', level.title);
      // Here you would navigate to the actual lesson/game
    }
  };

  const handleLogout = (): void => {
    logout();
    navigate('home');
  };

  const getDifficultyColor = (difficulty: Level['difficulty']): string => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyLabel = (difficulty: Level['difficulty']): string => {
    switch (difficulty) {
      case 'beginner': return 'Principiante';
      case 'intermediate': return 'Intermedio';
      case 'advanced': return 'Avanzado';
      default: return 'Desconocido';
    }
  };

  const completedLevels = LEVELS.filter(level => level.progress === 100).length;
  const totalProgress = Math.round(LEVELS.reduce((acc, level) => acc + level.progress, 0) / LEVELS.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">
                  {currentUser?.name.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  ¡Hola {currentUser?.name || 'Estudiante'}!
                </h1>
                <p className="text-gray-600">Tu progreso: {totalProgress}%</p>
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

      {/* Progress Summary */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">{completedLevels}</div>
              <div className="text-gray-600">Niveles completados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{LEVELS.length - completedLevels}</div>
              <div className="text-gray-600">Por completar</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{totalProgress}%</div>
              <div className="text-gray-600">Progreso total</div>
            </div>
          </div>
          
          {/* Overall progress bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progreso general</span>
              <span>{totalProgress}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
                style={{ width: `${totalProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEVELS.map((level, index) => (
            <div
              key={level.id}
              onClick={() => handleLevelClick(level)}
              className={`bg-white rounded-2xl shadow-lg p-6 transition-all duration-200 ${
                level.isUnlocked 
                  ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1' 
                  : 'opacity-60 cursor-not-allowed'
              }`}
            >
              {/* Level Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{level.icon}</div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(level.difficulty)}`}>
                  {getDifficultyLabel(level.difficulty)}
                </div>
              </div>

              {/* Level Info */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">{level.title}</h3>
                <p className="text-gray-600 text-sm">{level.description}</p>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Progreso</span>
                    <span>{level.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300"
                      style={{ width: `${level.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2 text-sm">
                  {level.isUnlocked ? (
                    level.progress === 100 ? (
                      <>
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-green-600 font-medium">Completado</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="text-blue-600 font-medium">Disponible</span>
                      </>
                    )
                  ) : (
                    <>
                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-500">Bloqueado</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelsScreen;