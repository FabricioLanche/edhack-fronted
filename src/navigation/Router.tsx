import React, { useState, type JSX } from 'react';
import HomeScreen from '../screens/HomeScreen';
import StudentAuthScreen from '../screens/StudentAuthScreen';
import BiometricLoginScreen from '../screens/BiometricLoginScreen';
import VoiceRegistrationScreen from '../screens/VoiceRegistrationScreen';
import LevelsScreen from '../screens/LevelsScreen';
import { UserProvider } from '../navigation/UserContext';

export type RouteType = 'home' | 'student-auth' | 'teacher-auth' | 'biometric-login' | 'voice-registration' | 'levels';

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
        // TODO: Implement TeacherAuthScreen
        return <div className="min-h-screen flex items-center justify-center bg-emerald-50">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-gray-900">Interfaz de Profesor</h1>
            <p className="text-gray-600">Próximamente...</p>
            <button 
              onClick={() => navigate('home')}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Volver al inicio
            </button>
          </div>
        </div>;
      case 'biometric-login':
        return <BiometricLoginScreen navigate={navigate} />;
      case 'voice-registration':
        return <VoiceRegistrationScreen navigate={navigate} />;
      case 'levels':
        return <LevelsScreen navigate={navigate} />;
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