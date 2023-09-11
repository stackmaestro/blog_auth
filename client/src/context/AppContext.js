import React, { useState, createContext } from 'react';

export const AppContext = createContext();
function AppContextProvider({ children }) {
  const [data, setData] = useState({
    allposts: null,
    authorPosts: null,
    comments: null,
  });

  const [commentData, setCommentData] = useState({});
  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        commentData,
        setCommentData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export default AppContextProvider;
