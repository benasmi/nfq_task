import React, { createContext, useState } from 'react';

interface UserProfileI {
  name: string;
  surname: string;
  isAdmin: boolean;
}

interface AuthContextI {
  profile: UserProfileI | null;
}

export const AuthContext = React.createContext<AuthContextI | null>(null);

const AuthContextProvider: React.FC = ({ children }) => {
  const [profile, setProfile] = useState<UserProfileI | null>(null);

  return <AuthContext.Provider value={{ profile }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
