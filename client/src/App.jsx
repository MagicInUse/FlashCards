import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient';
import Home from './pages/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Cards from './pages/Cards.jsx';
import { isAuthenticated } from './utils/auth.js';

const App = () => (
  <ApolloProvider client={client}>
    <Router basename={process.env.NODE_ENV === 'production' ? '/medical-cards' : ''}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/cards"
          element={isAuthenticated() ? <Cards /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  </ApolloProvider>
);

export default App;