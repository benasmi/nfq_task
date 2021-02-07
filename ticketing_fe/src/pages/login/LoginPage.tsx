import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { isAuthenticated } from '../../utils/cookieService';
import { Redirect } from 'react-router-dom';

import './LoginPage.css';

export interface ILoginPage {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [loginConfig, setLoginConfig] = useState<ILoginPage>({ username: '', password: '' });
  const authContext = useContext(AuthContext);

  function handleLogin(): void {
    authContext?.login(loginConfig);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setLoginConfig(oldVal => {
      return {
        ...oldVal,
        [name]: value,
      };
    });
  }

  if (isAuthenticated()) {
    return <Redirect to='/system' />;
  }

  return (
    <div className='loginDiv'>
      <input id='credentialField' type='text' name='username' placeholder='Username' value={loginConfig.username} onChange={handleChange} />{' '}
      <input
        id='credentialField'
        type='password'
        name='password'
        placeholder='Password'
        value={loginConfig.password}
        onChange={handleChange}
      />{' '}
      <button type='submit' onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};
export default LoginPage;
