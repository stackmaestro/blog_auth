import React from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import useAuth from '../hooks/useAuth';
import { authSchema, loginSchema } from '../utils/Schemas';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

function AuthenticationForm() {
  const [isLogin, setislogin] = React.useState(false);
  const [error, setError] = React.useState('');
  const submitButtonText = isLogin ? 'Log In' : 'Sign Up';
  const toggleButtonText = isLogin ? 'Create Account' : 'Already Have Account';
  const { login, signUp, loading } = useAuth();
  const navigate = useNavigate();

  const toggleForm = (resetForm) => {
    setError('');
    resetForm();
    setislogin((prev) => !prev);
  };

  const handleSubmit = async (values, { resetForm }) => {
    setError('');
    const result = isLogin ? await login(values) : await signUp(values);
    if (result.errors) {
      setError(result.errors[0].msg);
    } else if (isLogin) navigate(`/posts/${result.user.name}`);
    else {
      resetForm(initialValues);
      toggleForm(resetForm);
    }
  };

  return (
    <>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={isLogin ? loginSchema : authSchema}
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <>
            <Form className="auth-form">
              <h2 className="mb-5 text-center">{submitButtonText}</h2>
              {!isLogin && <InputField label="Name" name="name" type="text" />}
              <InputField label="Email" name="email" type="email" />
              <InputField label="Password" name="password" type="password" />
              <div className="d-flex w-100 justify-content-end">
                <button className="btn btn-primary mt-3" type="submit">
                  {submitButtonText}
                </button>
              </div>
            </Form>
            <button
              type="button"
              className="btn btn-dark mt-3"
              onClick={() => {
                toggleForm(resetForm);
              }}
              disabled={loading}
            >
              {toggleButtonText}
            </button>
          </>
        )}
      </Formik>
    </>
  );
}

export default AuthenticationForm;
