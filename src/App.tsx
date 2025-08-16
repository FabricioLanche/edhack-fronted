import React from 'react';
import Router from './navigation/Router';
import { NavigationProvider } from '../src/navigation/NavigationContext';

const App: React.FC = () => {
  return (
    <NavigationProvider>
      <div className="App">
        <Router />
      </div>
    </NavigationProvider>
  );
};

export default App;