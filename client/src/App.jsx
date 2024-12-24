import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient';
import Home from './pages/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import SingleCard from './components/Card.jsx';
import { isAuthenticated } from './utils/auth.js';

const App = () => (
  <ApolloProvider client={client}>
    {/* <Router basename="/flash-cards"> */}
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/cards"
          element={isAuthenticated() ? <SingleCard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  </ApolloProvider>
);

export default App;