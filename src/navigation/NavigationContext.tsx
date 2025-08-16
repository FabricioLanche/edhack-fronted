import React, { createContext, useContext, useState, type ReactNode } from 'react';

export type RouteType = 'login' | 'home';

interface NavigationContextType {
  currentRoute: RouteType;
  navigate: (route: RouteType) => void;
  goBack: () => void;
  canGoBack: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<RouteType>('login');
  const [history, setHistory] = useState<RouteType[]>(['login']);

  const navigate = (route: RouteType): void => {
    setCurrentRoute(route);
    setHistory(prev => [...prev, route]);
  };

  const goBack = (): void => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      const previousRoute = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentRoute(previousRoute);
    }
  };

  const value: NavigationContextType = {
    currentRoute,
    navigate,
    goBack,
    canGoBack: history.length > 1
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};