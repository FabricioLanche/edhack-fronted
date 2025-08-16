import React, { useState, useEffect } from 'react';
import { usePersonalization } from '../context/PersonalizationContext';
import type { PersonalizationQuestion } from '../context/PersonalizationContext';
import type { ScreenProps } from '../interfaces';
import FormField from '../components/FormField';
import NavigationButton from '../components/NavigationButton';

// Preguntas de ejemplo - en producción vendrían de una API o configuración
const PERSONALIZATION_QUESTIONS: PersonalizationQuestion[] = [
  {
    id: 'name',
    question: '¿Cómo te gusta que te llamen?',
    type: 'text',
    required: true,
    placeholder: 'Ej: María, Dr. González, etc.'
  },
  {
    id: 'communication_style',
    question: '¿Qué estilo de comunicación prefieres?',
    type: 'select',
    required: true,
    options: [
      'Formal y profesional',
      'Casual y amigable',
      'Directo y conciso',
      'Detallado y explicativo'
    ]
  },
  {
    id: 'interests',
    question: '¿Cuáles son tus principales intereses o hobbies?',
    type: 'text',
    placeholder: 'Ej: lectura, deportes, tecnología, cocina...'
  },
  {
    id: 'goals',
    question: '¿Qué objetivos tienes o en qué te gustaría que te ayude?',
    type: 'audio',
    placeholder: 'Describe tus metas y cómo puedo asistirte...'
  },
  {
    id: 'expertise',
    question: '¿En qué áreas tienes experiencia o conocimiento?',
    type: 'text',
    placeholder: 'Ej: marketing, programación, diseño, medicina...'
  },
  {
    id: 'learning_style',
    question: '¿Cómo prefieres recibir información?',
    type: 'select',
    required: true,
    options: [
      'Ejemplos prácticos',
      'Explicaciones paso a paso',
      'Conceptos generales primero',
      'Comparaciones y analogías',
      'Formato visual/esquemas'
    ]
  },
  {
    id: 'context',
    question: '¿Hay algo específico sobre tu situación o contexto que deba tener en cuenta?',
    type: 'audio',
    placeholder: 'Información adicional que consideres relevante...'
  }
];

const PersonalizationScreen: React.FC<ScreenProps> = ({ navigate }) => {
  const {
    updateAnswer,
    getAnswer,
    isQuestionAnswered,
    getCompletionPercentage,
    clearData
  } = usePersonalization();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const totalQuestions = PERSONALIZATION_QUESTIONS.length;
  const completionPercentage = getCompletionPercentage();
  const answeredQuestions = PERSONALIZATION_QUESTIONS.filter(q => isQuestionAnswered(q.id)).length;

  const handleAnswerChange = (questionId: string, answer: string, inputType: 'text' | 'select' | 'audio'): void => {
    updateAnswer(questionId, answer, inputType);
  };

  const handleNext = (): void => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = (): void => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinish = (): void => {
    setShowSuccess(true);
    setTimeout(() => {
      navigate('home');
    }, 2000);
  };

  const canFinish = answeredQuestions >= Math.ceil(totalQuestions * 0.7); // Al menos 70% completado

  const currentQuestion = PERSONALIZATION_QUESTIONS[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('home')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Personalización</h1>
            </div>
            
            {/* Progress indicator */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                {answeredQuestions}/{totalQuestions}
              </span>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">¡Perfecto!</h3>
            <p className="text-gray-600">Tu perfil ha sido guardado exitosamente.</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar con progreso */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Progreso</h3>
              
              <div className="space-y-3">
                {PERSONALIZATION_QUESTIONS.map((question, index) => (
                  <div
                    key={question.id}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      index === currentQuestionIndex 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setCurrentQuestionIndex(index)}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      isQuestionAnswered(question.id)
                        ? 'bg-green-500 text-white'
                        : index === currentQuestionIndex
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {isQuestionAnswered(question.id) ? '✓' : index + 1}
                    </div>
                    <span className={`text-sm truncate ${
                      index === currentQuestionIndex ? 'text-blue-700 font-medium' : 'text-gray-600'
                    }`}>
                      {question.question}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Completado</span>
                  <span>{completionPercentage}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main form */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Current question */}
              <FormField
                question={currentQuestion}
                value={getAnswer(currentQuestion.id) || ''}
                onChange={(value, inputType) => handleAnswerChange(currentQuestion.id, value, inputType)}
                className="mb-8"
              />

              {/* Navigation buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex gap-3">
                  <NavigationButton
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    variant="outline"
                    className="flex-1 sm:flex-initial"
                  >
                    ← Anterior
                  </NavigationButton>
                  
                  {currentQuestionIndex < totalQuestions - 1 ? (
                    <NavigationButton
                      onClick={handleNext}
                      variant="primary"
                      className="flex-1 sm:flex-initial"
                    >
                      Siguiente →
                    </NavigationButton>
                  ) : (
                    <NavigationButton
                      onClick={handleFinish}
                      disabled={!canFinish}
                      variant="primary"
                      className="flex-1 sm:flex-initial"
                    >
                      Finalizar
                    </NavigationButton>
                  )}
                </div>

                {/* Clear data button */}
                <NavigationButton
                  onClick={clearData}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Limpiar todo
                </NavigationButton>
              </div>

              {/* Completion message */}
              {!canFinish && answeredQuestions > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-amber-800">
                        Responde al menos {Math.ceil(totalQuestions * 0.7)} preguntas para continuar
                      </p>
                      <p className="text-sm text-amber-700 mt-1">
                        Te faltan {Math.ceil(totalQuestions * 0.7) - answeredQuestions} preguntas por responder.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Help text */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-blue-800">
                      💡 Consejo
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      Mientras más información proporciones, mejor podremos personalizar tu experiencia. 
                      Puedes responder usando texto o grabando audio según tu preferencia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizationScreen;