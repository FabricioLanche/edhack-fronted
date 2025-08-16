// screens/TeacherAuthScreen.tsx
import React, { useState } from 'react';
import type { ScreenProps, RouteType } from '../interfaces';
import { useUser } from '../navigation/UserContext';

const TeacherAuthScreen: React.FC<ScreenProps> = ({ navigate }) => {
  const { setHasAccount } = useUser();
  const [showBiometric, setShowBiometric] = useState(false);

  const handleHasAccount = (): void => {
    setHasAccount(true);
    setShowBiometric(true);
    setTimeout(() => navigate('teacher-biometric' as RouteType), 1000);
  };

  const handleNoAccount = (): void => {
    setHasAccount(false);
    navigate('teacher-voice-setup');
  };

  const handleGoBack = (): void => {
    navigate('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Bienvenido Profesor</h1>
          <p className="text-gray-600">Accede a tu dashboard educativo</p>
        </div>

        {/* Authentication Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {!showBiometric ? (
            <>
              <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold text-gray-900">Acceso al Sistema</h2>
                <p className="text-gray-600 text-sm">¿Ya tienes una cuenta en el sistema?</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleHasAccount}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Sí, tengo una cuenta</span>
                  </div>
                </button>

                <button
                  onClick={handleNoAccount}
                  className="w-full bg-white border-2 border-emerald-200 text-emerald-700 p-4 rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200"
                >
                  <div className="flex items-center justify-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="font-medium">Es mi primera vez aquí</span>
                  </div>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Verificando identidad...</h3>
                <p className="text-gray-600 text-sm">Procesando autenticación biométrica</p>
              </div>
            </div>
          )}

          {/* Back Button */}
          <button
            onClick={handleGoBack}
            className="w-full text-gray-500 hover:text-gray-700 transition-colors font-medium"
          >
            ← Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherAuthScreen;