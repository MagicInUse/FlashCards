import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './pages/Profile';
import Cards from './pages/Cards';
import AddCard from './pages/AddCard';
import EditCard from './pages/EditCard';
import DeleteCard from './pages/DeleteCard';
import NotFound from './pages/errors/NotFound';
import { isAuthenticated } from './utils/auth';

const App = () => (
  <ApolloProvider client={client}>
    <Router basename={process.env.NODE_ENV === 'production' ? '/medical-cards' : ''}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={isAuthenticated() ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/cards"
          element={isAuthenticated() ? <Cards /> : <Navigate to="/" />}
        />
        <Route
          path="/add"
          element={isAuthenticated() ? <AddCard /> : <Navigate to="/" />}
        />
        <Route
          path="/edit"
          element={isAuthenticated() ? <EditCard /> : <Navigate to="/" />}
        />
        <Route
          path="/delete"
          element={isAuthenticated() ? <DeleteCard /> : <Navigate to="/" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </ApolloProvider>
);

export default App;