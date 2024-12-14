import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient';
import Home from './pages/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Card from './components/Card.jsx';
import { isAuthenticated } from './utils/auth.jsx';

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/cards"
          element={isAuthenticated() ? <Card /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  </ApolloProvider>
);

export default App;