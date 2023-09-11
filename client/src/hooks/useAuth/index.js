import React, { createContext, useContext } from 'react';
import useAuthProvider from './useAuthProvider';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
const useAuth = () => useContext(authContext);

export default useAuth;
