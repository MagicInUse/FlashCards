import React from 'react';

const Register = ({ 
  username, 
  password, 
  repeatPassword,
  setUsername, 
  setPassword, 
  setRepeatPassword,
  passwordsMatch 
}) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
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
    <input
      className="login-form-text"
      type="password"
      value={repeatPassword}
      onChange={(e) => setRepeatPassword(e.target.value)}
      placeholder="Repeat Password"
      style={{ borderColor: passwordsMatch ? 'initial' : 'red' }}
    />
    {!passwordsMatch && (
      <span style={{ color: 'red', fontSize: '0.8em' }}>
        Passwords do not match!
      </span>
    )}
  </div>
);

export default Register;