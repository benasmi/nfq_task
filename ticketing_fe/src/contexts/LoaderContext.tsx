import React, { useEffect, useState } from 'react';
import './LoaderContext.css';

export interface ILoaderContext {
  loading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

export const LoaderContext = React.createContext<ILoaderContext | null>(null);

const LoaderContextProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  function showLoader() {
    setLoading(true);
  }
  function hideLoader() {
    setLoading(false);
  }

  return (
    <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
      {children}
      {loading && <div className='loader' />}
    </LoaderContext.Provider>
  );
};

export default LoaderContextProvider;
