import React, { useState } from 'react';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

export type RouteType = 'login' | 'home';

const Router: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<RouteType>('login');

  const navigate = (route: RouteType): void => {
    setCurrentRoute(route);
  };

  const renderCurrentScreen = (): JSX.Element => {
    switch (currentRoute) {
      case 'login':
        return <LoginScreen navigate={navigate} />;
      case 'home':
        return <HomeScreen navigate={navigate} />;
      default:
        return <LoginScreen navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentScreen()}
    </div>
  );
};

export default Router;