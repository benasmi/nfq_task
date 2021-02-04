import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { isAuthenticated } from '../utils/cookieService';
import { Redirect } from 'react-router-dom';

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
    <div style={{ flexDirection: 'column', display: 'flex', padding: 32 }}>
      {' '}
      <label>
        Username:
        <input type='text' name='username' value={loginConfig.username} onChange={handleChange} />{' '}
      </label>{' '}
      <label>
        Password:
        <input type='password' name='password' value={loginConfig.password} onChange={handleChange} />{' '}
      </label>
      <input style={{ width: 100 }} type='submit' value='login' onClick={handleLogin} />
    </div>
  );
};
export default LoginPage;
