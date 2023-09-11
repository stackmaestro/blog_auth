import React from 'react';
import ApiService from '../../api/ApiService';

function useAuthProvider() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [authenticating, setAuthenticating] = React.useState(true);

  const signUp = async (data) => ApiService.signUp(data);

  const login = async (data) => {
    setLoading(true);
    const result = await ApiService.signIn(data);
    if (result.errors) {
      setLoading(false);
      return result;
    }
    setUser(result.user);
    setLoading(false);
    return result;
  };

  const logout = async () => {
    await ApiService.signOut();
    setUser(null);
  };

  const isAuthenticated = async (data = {}) => {
    const result = await ApiService.isAuthenticated(data);
    if (result?.errors) return null;
    return result;
  };

  React.useEffect(() => {
    const fetchUser = async () => {
      const result = await isAuthenticated();
      setUser(result);
      setAuthenticating(false);
    };
    if (!user && authenticating) {
      fetchUser();
    }
  }, [user, authenticating]);

  return {
    user,
    signUp,
    login,
    logout,
    authenticating,
    isAuthenticated,
    loading,
  };
}

export default useAuthProvider;
