import React from 'react';
import Layout from './Layout';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Layout />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;