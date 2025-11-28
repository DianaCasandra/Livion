// components/providers/UserProvider.tsx
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ThemedText } from '../atoms/ThemedText';

export type UserRole = 'patient' | 'clinician' | 'admin';

export type User = {
  isAuthenticated: boolean;
  role: UserRole;
  name?: string;
  email?: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loginAsPatient: () => void;
  loginAsClinician: () => void;
  loginAsAdmin: () => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setUser({
  //       isAuthenticated: false,
  //       role: 'patient'
  //     });
  //     setIsLoading(false);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
  // No default user
   setUser(null);
  setIsLoading(false);
  }, []);

  const loginAsPatient = () => {
    setUser({
      isAuthenticated: true,
      role: 'patient',
      name: 'Patient User'
    });
  };

  const loginAsClinician = () => {
    setUser({
      isAuthenticated: true,
      role: 'clinician',
      name: 'Clinician User'
    });
  };

  const loginAsAdmin = () => {
    setUser({
      isAuthenticated: true,
      role: 'admin',
      name: 'Admin User'
    });
  };

  const logout = () => {
    setUser({
      isAuthenticated: false,
      role: 'patient'
    });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a' }}>
        <ActivityIndicator size="large" color="#ffffff" />
        <ThemedText style={{ marginTop: 10 }} color="secondary">Loading...</ThemedText>
      </View>
    );
  }

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser,
      loginAsPatient,
      loginAsClinician,
      loginAsAdmin,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};