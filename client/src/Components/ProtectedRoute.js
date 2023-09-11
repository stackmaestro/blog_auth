import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from './Loader';

function ProtectedRoute({ children }) {
  const { user, authenticating } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!authenticating && !user) {
      navigate('/auth');
    }
  }, [authenticating, user, navigate]);

  if (authenticating) {
    return <Loader />;
  }

  if (!authenticating && user) {
    return children;
  }
}

export default ProtectedRoute;
