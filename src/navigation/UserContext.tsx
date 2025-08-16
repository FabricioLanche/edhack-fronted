import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { UserProfile, UserType, UserContextType } from '../interfaces';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'app_user_data';

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [userType, setCurrentUserType] = useState<UserType | null>(null);
  const [hasAccount, setHasAccountState] = useState<boolean>(false);

  const setUser = (user: UserProfile): void => {
    setCurrentUser(user);
    setCurrentUserType(user.type);
    
    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const setUserType = (type: UserType): void => {
    setCurrentUserType(type);
  };

  const setHasAccount = (hasAcc: boolean): void => {
    setHasAccountState(hasAcc);
  };

  const logout = (): void => {
    setCurrentUser(null);
    setCurrentUserType(null);
    setHasAccountState(false);
    
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  };

  const value: UserContextType = {
    currentUser,
    userType,
    setUser,
    setUserType,
    logout,
    hasAccount,
    setHasAccount
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};