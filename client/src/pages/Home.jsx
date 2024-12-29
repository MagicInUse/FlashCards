import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, REGISTER_USER } from '../utils/mutations';
import Login from '../components/Login';
import Register from '../components/Register';

const Home = () => {
  const [newUser, setNewUser] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const navigate = useNavigate();
  const [loginUser, { error: loginError }] = useMutation(LOGIN_USER);
  const [registerUser, { error: registerError }] = useMutation(REGISTER_USER);

  const validatePasswords = (pass, repeat) => {
    setPasswordsMatch(pass === repeat);
    return pass === repeat;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newUser) {
        await registerUser({ 
          variables: { 
            username, 
            password, 
            authLevel: 0 
          } 
        });
        setNewUser(false);
      } else {
        const { data } = await loginUser({ 
          variables: { 
            username, 
            password 
          } 
        });
        localStorage.setItem('token', data.loginUser.token);
        navigate('/cards');
      }
      setUsername('');
      setPassword('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to the Flash Card App</h1>
      <br />
      <form onSubmit={handleSubmit}>
        {newUser ? (
          <Register
            username={username}
            password={password}
            repeatPassword={repeatPassword}
            setUsername={setUsername}
            setPassword={setPassword}
            setRepeatPassword={setRepeatPassword}
            passwordsMatch={passwordsMatch}
          />
        ) : (
          <Login
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        )}
        <button type="submit">
          {newUser ? 'Register' : 'Login'}
        </button>
        {loginError && !newUser && <p>Error logging in</p>}
        {registerError && newUser && <p>Error registering</p>}
      </form>
      <label style={{ marginTop: '10px', display: 'block' }}>
        <input
          type="checkbox"
          checked={newUser}
          onChange={(e) => setNewUser(e.target.checked)}
        />
        {` New User`}
      </label>
    </div>
  );
};

export default Home;