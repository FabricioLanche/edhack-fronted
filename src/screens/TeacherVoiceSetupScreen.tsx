// screens/TeacherVoiceSetupScreen.tsx
import React, { useState } from 'react';
import type { ScreenProps, TeacherProfile } from '../interfaces';
import { useUser } from '../navigation/UserContext';

const TeacherVoiceSetupScreen: React.FC<ScreenProps> = ({ navigate }) => {
  const { setUser } = useUser();
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [teacherName, setTeacherName] = useState('');
  const [className, setClassName] = useState('');

  const setupQuestions = [
    "Por favor, díganos su nombre completo para el registro.",
    "¿Cómo se llama la materia o clase que enseña?",
    "Descríbanos brevemente su metodología de enseñanza y el tipo de textos que suele trabajar con sus estudiantes.",
    "¿Qué espera lograr con sus estudiantes usando esta herramienta de comprensión lectora por voz?",
    "Perfecto. Su perfil de profesor ha sido configurado correctamente."
  ];

  const handleStartRecording = (): void => {
    setIsRecording(true);
    // Simulate recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      setHasRecorded(true);
    }, 3000);
  };

  const handleNextStep = (): void => {
    if (currentStep < setupQuestions.length - 2) {
      setCurrentStep(prev => prev + 1);
      setHasRecorded(false);
    } else {
      // Complete setup
      setCurrentStep(prev => prev + 1);
      setTimeout(() => {
        const newTeacher: TeacherProfile = {
          id: `teacher_${Date.now()}`,
          name: teacherName || 'Prof. Demo',
          email: `${(teacherName || 'demo').toLowerCase().replace(' ', '.')}@example.com`,
          type: 'teacher',
          hasAccount: false,
          className: className || 'Comprensión Lectora',
          classDescription: 'Clase enfocada en mejorar las habilidades de comprensión lectora mediante técnicas de voz.',
          voiceSetup: true,
          avatar: '👨‍🏫',
          createdAt: new Date()
        };
        setUser(newTeacher);
        navigate('teacher-dashboard');
      }, 2000);
    }
  };

  const handleGoBack = (): void => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setHasRecorded(false);
    } else {
      navigate('teacher-auth');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Progress Bar */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Configuración del Perfil</span>
            <span className="text-sm text-emerald-600">{currentStep + 1} de {setupQuestions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / setupQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Configuración de Voz</h1>
            <p className="text-gray-600">Configure su perfil para personalizar la experiencia de sus estudiantes</p>
          </div>

          {currentStep < setupQuestions.length - 1 ? (
            <>
              {/* Question */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-800 leading-relaxed">{setupQuestions[currentStep]}</p>
                </div>
              </div>

              {/* Input fields for first two questions */}
              {currentStep === 0 && (
                <input
                  type="text"
                  placeholder="Ej: María González Pérez"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              )}

              {currentStep === 1 && (
                <input
                  type="text"
                  placeholder="Ej: Comprensión Lectora 5to Grado"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              )}

              {/* Voice Recording for questions 2-3 */}
              {currentStep >= 2 && (
                <div className="space-y-4">
                  <div className="text-center">
                    <button
                      onClick={handleStartRecording}
                      disabled={isRecording}
                      className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all duration-200 ${
                        isRecording 
                          ? 'bg-red-500 animate-pulse' 
                          : hasRecorded 
                            ? 'bg-emerald-500' 
                            : 'bg-emerald-600 hover:bg-emerald-700 hover:scale-105'
                      } shadow-lg`}
                    >
                      {isRecording ? (
                        <div className="w-6 h-6 bg-white rounded-sm"></div>
                      ) : hasRecorded ? (
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      )}
                    </button>
                    
                    <p className="text-sm text-gray-600 mt-2">
                      {isRecording 
                        ? 'Grabando... Habla ahora' 
                        : hasRecorded 
                          ? '¡Respuesta grabada!'
                          : 'Presiona para responder por voz'
                      }
                    </p>
                  </div>

                  {isRecording && (
                    <div className="flex justify-center">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-emerald-500 rounded-full animate-pulse"
                            style={{
                              height: `${Math.random() * 20 + 10}px`,
                              animationDelay: `${i * 0.1}s`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-4">
                <button
                  onClick={handleGoBack}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Anterior
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={(currentStep <= 1 && (currentStep === 0 ? !teacherName : !className)) || (currentStep >= 2 && !hasRecorded)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {currentStep === setupQuestions.length - 2 ? 'Finalizar' : 'Siguiente'}
                </button>
              </div>
            </>
          ) : (
            /* Completion Screen */
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">¡Configuración Completada!</h3>
                <p className="text-gray-600">Su perfil ha sido configurado exitosamente. Redirigiendo al dashboard...</p>
              </div>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherVoiceSetupScreen;