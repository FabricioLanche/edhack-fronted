import React from 'react';
import type { ScreenProps } from '../interfaces';
import { useUser } from '../navigation/UserContext';

const HomeScreen: React.FC<ScreenProps> = ({ navigate }) => {
  const { setUserType } = useUser();

  const handleStudentClick = (): void => {
    setUserType('student');
    navigate('student-auth');
  };

  const handleTeacherClick = (): void => {
    setUserType('teacher');
    navigate('teacher-auth');
  };

  const handleDirectTeacherDashboard = (): void => {
    setUserType('teacher');
    navigate('teacher-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Chavin IA</h1>
          <p className="text-lg text-gray-600">Aprende con tu voz, enseña con tecnología</p>
        </div>

        {/* Demo Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">Demo</h2>
            <p className="text-gray-600">Selecciona tu perfil para comenzar</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleStudentClick}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-lg font-medium">Soy Alumno</span>
              </div>
            </button>

            <button
              onClick={handleTeacherClick}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="text-lg font-medium">Soy Profesor</span>
              </div>
            </button>
          </div>

          {/* Quick Access */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-3 text-center">Acceso Rápido (Demo)</p>
            <button
              onClick={handleDirectTeacherDashboard}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white p-3 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 text-sm"
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="font-medium">Dashboard Profesor</span>
              </div>
            </button>
          </div>
        </div>

        {/* Features Preview */}
        <div className="text-center space-y-4">
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="space-y-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                🎤
              </div>
              <p>Reconocimiento<br />de Voz</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto">
                📚
              </div>
              <p>Comprensión<br />Lectora</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                📊
              </div>
              <p>Análisis de<br />Progreso</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;