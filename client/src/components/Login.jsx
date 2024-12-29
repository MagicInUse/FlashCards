import React from 'react';

const Login = ({ username, password, setUsername, setPassword }) => (
  <form style={{ display: 'flex', flexDirection: 'column' }}>
    <input
      className="login-form-text"
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder="Username"
    />
    <input
      className="login-form-text"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
    />
  </form>
);

export default Login;