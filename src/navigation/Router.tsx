import React, { useState, type JSX } from 'react';
import HomeScreen from '../screens/HomeScreen';
import StudentAuthScreen from '../screens/StudentAuthScreen';
import TeacherAuthScreen from '../screens/TeacherAuthScreen';
import TeacherDashboardScreen from '../screens/TeacherDashboardScreen';
import TeacherVoiceSetupScreen from '../screens/TeacherVoiceSetupScreen';
import StudentDetailScreen from '../screens/StudentDetailScreen';
import BiometricLoginScreen from '../screens/BiometricLoginScreen';
import VoiceRegistrationScreen from '../screens/VoiceRegistrationScreen';
import LevelsScreen from '../screens/LevelsScreen';
import { UserProvider } from '../navigation/UserContext';
import type { RouteType } from '../interfaces';

const Router: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<RouteType>('home');

  const navigate = (route: RouteType): void => {
    setCurrentRoute(route);
  };

  const renderCurrentScreen = (): JSX.Element => {
    switch (currentRoute) {
      case 'home':
        return <HomeScreen navigate={navigate} />;
      case 'student-auth':
        return <StudentAuthScreen navigate={navigate} />;
      case 'teacher-auth':
        return <TeacherAuthScreen navigate={navigate} />;
      case 'teacher-dashboard':
        return <TeacherDashboardScreen navigate={navigate} />;
      case 'teacher-voice-setup':
        return <TeacherVoiceSetupScreen navigate={navigate} />;
      case 'teacher-biometric':
        return <BiometricLoginScreen navigate={navigate} />;
      case 'student-detail':
        return <StudentDetailScreen navigate={navigate} studentId="1" />;
      case 'biometric-login':
        return <BiometricLoginScreen navigate={navigate} />;
      case 'voice-registration':
        return <VoiceRegistrationScreen navigate={navigate} />;
      case 'levels':
        return <LevelsScreen navigate={navigate} />;
      case 'text-templates':
        return <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-gray-900">Plantillas de Texto</h1>
            <p className="text-gray-600">Módulo en desarrollo...</p>
            <button 
              onClick={() => navigate('teacher-dashboard')}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Volver al Dashboard
            </button>
          </div>
        </div>;
      default:
        return <HomeScreen navigate={navigate} />;
    }
  };

  return (
    <UserProvider>
      <div className="min-h-screen">
        {renderCurrentScreen()}
      </div>
    </UserProvider>
  );
};

export default Router;