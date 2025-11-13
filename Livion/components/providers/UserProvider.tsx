import React, { createContext, useContext } from 'react';
import { useMockData } from './MockDataProvider';

export const UserContext = createContext({ user: { id: '', name: '', role: 'patient' } });

export const UserProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const mock = useMockData();
  return <UserContext.Provider value={{user: mock.user}}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);