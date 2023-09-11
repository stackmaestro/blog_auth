import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import Auth from './Pages/Auth';
import Posts from './Pages/Posts';
import MyPosts from './Pages/MyPosts';
import PostDetails from './Components/Posts/PostDetails';
import Layout from './Layout/Layout';
import NotFound from './Pages/NotFound';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const routes = useRoutes([
    { path: '/', element: <Navigate to="/auth" /> },
    { path: '/auth', element: <Auth /> },
    {
      path: '/posts',
      element: <Posts />,
    },
    {
      path: '/post/:id',
      element: <PostDetails />,
    },
    {
      path: '/posts/:author',
      element: (
        <ProtectedRoute>
          <MyPosts />
        </ProtectedRoute>
      ),
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return <Layout>{routes}</Layout>;
}

export default App;
