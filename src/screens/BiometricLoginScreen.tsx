import React, { useState } from 'react';
import type { ScreenProps } from '../interfaces';
import Camera from '../components/Camera';
import { useUser } from '../navigation/UserContext';

const BiometricLoginScreen: React.FC<ScreenProps> = ({ navigate }) => {
  const { setUser } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string>('');

  const handlePhotoCapture = async (imageData: string): Promise<void> => {
    setCapturedImage(imageData);
    setIsProcessing(true);

    try {
      // Simulate biometric verification process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create mock user profile
      const mockUser = {
        id: 'student-123',
        name: 'Ana García',
        email: 'ana.garcia@estudiante.com',
        type: 'student' as const,
        hasAccount: true,
        biometricData: imageData,
        createdAt: new Date()
      };

      setUser(mockUser);
      navigate('levels');
    } catch (error) {
      console.error('Biometric verification failed:', error);
      setIsProcessing(false);
    }
  };

  const handleBack = (): void => {
    navigate('student-auth');
  };

  const handleRetry = (): void => {
    setCapturedImage('');
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
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
          
          <h1 className="text-xl font-semibold text-gray-900">Acceso Biométrico</h1>
          <div className="w-16"></div>
        </div>

        {/* Status */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-600">
            {isProcessing ? 'Verificando identidad...' : 'Posiciona tu rostro en el área indicada'}
          </p>
        </div>

        {/* Camera Section */}
        {!capturedImage && !isProcessing && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <Camera
              onCapture={handlePhotoCapture}
              className="aspect-[4/3] w-full"
            />
          </div>
        )}

        {/* Processing State */}
        {isProcessing && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
            {capturedImage && (
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-100">
                <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
              </div>
            )}
            
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-gray-600">Verificando tu identidad...</p>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!capturedImage && !isProcessing && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-blue-800">Instrucciones:</p>
                <ul className="text-sm text-blue-700 mt-1 space-y-1">
                  <li>• Mantén tu rostro dentro del círculo</li>
                  <li>• Asegúrate de tener buena iluminación</li>
                  <li>• Mira directamente a la cámara</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BiometricLoginScreen;