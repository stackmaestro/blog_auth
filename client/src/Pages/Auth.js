import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationForm from '../Components/AuthenticationForm';
import useAuth from '../hooks/useAuth';
import Loader from '../Components/Loader';

function Auth() {
  const { user, authenticating } = useAuth();
  const navigate = useNavigate('');

  React.useEffect(() => {
    if (!authenticating && user) {
      navigate('/posts');
    }
  }, [authenticating, user, navigate]);

  if (authenticating) {
    return <Loader />;
  }

  return (
    <div className="container h-100">
      <div className="auth-form-wrapper mx-auto  d-flex flex-column justify-content-center align-items-center h-100">
        <AuthenticationForm />
      </div>
    </div>
  );
}

export default Auth;
