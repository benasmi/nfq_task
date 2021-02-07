import React, { createContext, useEffect, useState } from 'react';
import { Auth } from '../networking/api/auth';
import { getCookie, setCookie } from '../utils/cookieService';
import { AxiosError } from 'axios';
import { ILoginPage } from '../pages/login/LoginPage';

interface IUserProfile {
  name: string;
  surname: string;
  admin: boolean;
}

interface AuthContextI {
  profile: IUserProfile | null;
  login: (loginConfig: ILoginPage) => void;
}

interface IJwtResponse {
  jwtToken: string;
}

export const AuthContext = React.createContext<AuthContextI | null>(null);

const AuthContextProvider: React.FC = ({ children }) => {
  const [profile, setProfile] = useState<IUserProfile | null>(null);

  useEffect(() => {
    (async function init() {
      const jwt = await getCookie('jwt');
      if (jwt !== '') {
        getProfile();
      }
    })();
  }, []);

  async function login(loginConfig: ILoginPage) {
    Auth.login(loginConfig)
      .then(response => {
        const jwtResponse = response.data as IJwtResponse;
        setCookie('jwt', jwtResponse.jwtToken);
        getProfile();
      })
      .catch((err: AxiosError<Error>) => {
        console.log('error');
      });
  }

  function getProfile(): void {
    Auth.profile()
      .then(response => {
        const userProfile = response.data as IUserProfile;
        setProfile(userProfile);
      })
      .catch((err: AxiosError<Error>) => {
        console.log(err);
      });
  }

  return <AuthContext.Provider value={{ profile, login }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
