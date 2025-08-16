import React from 'react';
import type { ScreenProps } from '../interfaces';
import { useUser } from '../navigation/UserContext';

const StudentAuthScreen: React.FC<ScreenProps> = ({ navigate }) => {
  const { setHasAccount } = useUser();

  const handleHasAccount = (): void => {
    setHasAccount(true);
    navigate('biometric-login');
  };

  const handleNoAccount = (): void => {
    setHasAccount(false);
    navigate('voice-registration');
  };

  const handleBack = (): void => {
    navigate('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <button
            onClick={handleBack}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>
          
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900">Acceso Estudiante</h1>
          <p className="text-gray-600">¿Ya tienes una cuenta registrada?</p>
        </div>

        {/* Options */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-4">
          <button
            onClick={handleHasAccount}
            className="w-full bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-lg font-medium">Ya tengo una cuenta</span>
            </div>
          </button>

          <button
            onClick={handleNoAccount}
            className="w-full border-2 border-blue-200 text-blue-700 p-4 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
          >
            <div className="flex items-center justify-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-lg font-medium">Quiero crearme una cuenta</span>
            </div>
          </button>
        </div>

        {/* Info */}
        <div className="text-center text-sm text-gray-500">
          <p>El acceso biométrico usa reconocimiento facial para mayor seguridad</p>
        </div>
      </div>
    </div>
  );
};

export default StudentAuthScreen;