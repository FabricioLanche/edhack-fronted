import React, { useState, useEffect } from 'react';
import type { ScreenProps } from '../interfaces';
import { speechRecognitionService, type SpeechRecognitionResult } from '../services/speechRecognition';
import { useUser } from '../navigation/UserContext';

const VoiceRegistrationScreen: React.FC<ScreenProps> = ({ navigate }) => {
  const { setUser } = useUser();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Setup speech recognition callbacks
    speechRecognitionService.onResult((result: SpeechRecognitionResult) => {
      setTranscript(prev => {
        const newTranscript = result.isFinal ? 
          prev + result.transcript + ' ' : 
          prev + result.transcript;
        
        console.log('📝 Transcript actualizado:', newTranscript);
        return newTranscript;
      });
    });

    speechRecognitionService.onError((errorMsg: string) => {
      setError(errorMsg);
      setIsListening(false);
    });

    return () => {
      if (speechRecognitionService.isListening) {
        speechRecognitionService.stopListening();
      }
    };
  }, []);

  const handleStartListening = async (): Promise<void> => {
    if (!speechRecognitionService.isSupported) {
      setError('Tu navegador no soporta reconocimiento de voz');
      return;
    }

    try {
      setError('');
      await speechRecognitionService.startListening();
      setIsListening(true);
    } catch (err) {
      setError('Error al iniciar el reconocimiento de voz');
      console.error('Error:', err);
    }
  };

  const handleStopListening = (): void => {
    speechRecognitionService.stopListening();
    setIsListening(false);
    
    if (transcript.trim().length > 0) {
      console.log('🎤 Grabación completada. Transcript final:', transcript);
      setIsComplete(true);
    }
  };

  const handleFinishRegistration = (): void => {
    // Create mock user profile with voice data
    const mockUser = {
      id: 'student-new-' + Date.now(),
      name: 'Nuevo Estudiante',
      email: 'nuevo@estudiante.com',
      type: 'student' as const,
      hasAccount: false,
      voiceProfile: transcript,
      createdAt: new Date()
    };

    console.log('👤 Usuario registrado:', mockUser);
    setUser(mockUser);
    navigate('levels');
  };

  const handleBack = (): void => {
    if (speechRecognitionService.isListening) {
      speechRecognitionService.stopListening();
    }
    navigate('student-auth');
  };

  const handleClear = (): void => {
    setTranscript('');
    setIsComplete(false);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>
          
          <h1 className="text-xl font-semibold text-gray-900">Registro por Voz</h1>
          <div className="w-16"></div>
        </div>

        {/* Voice Agent */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center mx-auto relative">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            {isListening && (
              <div className="absolute inset-0 bg-emerald-400 rounded-full animate-pulse opacity-50"></div>
            )}
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Agente Virtual</h2>
            <p className="text-gray-600">
              {isListening ? 'Te estoy escuchando...' : 'Presiona el botón para hablar conmigo'}
            </p>
          </div>

          {/* Voice Control */}
          <div className="space-y-4">
            {!isListening ? (
              <button
                onClick={handleStartListening}
                disabled={!speechRecognitionService.isSupported}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <span className="text-lg font-medium">Comenzar a hablar</span>
                </div>
              </button>
            ) : (
              <button
                onClick={handleStopListening}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg"
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="w-6 h-6 bg-white rounded animate-pulse"></div>
                  <span className="text-lg font-medium">Detener grabación</span>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Transcript Display */}
        {transcript && (
          <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Tu mensaje:</h3>
              <button
                onClick={handleClear}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Limpiar
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 min-h-[100px]">
              <p className="text-gray-700 leading-relaxed">
                {transcript || 'Tu mensaje aparecerá aquí...'}
              </p>
            </div>

            {isComplete && (
              <button
                onClick={handleFinishRegistration}
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Finalizar registro
              </button>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-emerald-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-medium text-emerald-800">Sugerencias:</p>
              <ul className="text-sm text-emerald-700 mt-1 space-y-1">
                <li>• Preséntate y cuenta sobre ti</li>
                <li>• Menciona tus objetivos de aprendizaje</li>
                <li>• Habla sobre tus materias favoritas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceRegistrationScreen;