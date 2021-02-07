import React, { useContext, useEffect, useState } from 'react';
import { getCookie } from '../../utils/cookieService';
import ActiveReservationHeader, { IActiveReservationHeader } from '../../components/ActiveReservationHeader';
import './DashboardPage.css';
import ActiveQue from '../../components/ActiveQue';
import { LoaderContext } from '../../contexts/LoaderContext';

interface IDashboardData {
  userId: number;
  name: string;
  surname: string;
  activeReservation: string;
  reservationsInQue: [string];
}

const DashboardPage: React.FC = () => {
  const [listening, setListening] = useState<boolean>(false);
  const [dashboard, setDashboard] = useState<IDashboardData[]>([]);
  const loaderContext = useContext(LoaderContext);
  let eventSource: EventSource | undefined = undefined;

  useEffect(() => {
    if (!listening) {
      loaderContext?.showLoader();
      const token = getCookie('jwt');
      console.log('using token', token);

      eventSource = new EventSource('http://http://176.223.134.114:8080/dashboard/stream', { withCredentials: true });
      eventSource.onmessage = event => {
        const data = JSON.parse(event.data) as IDashboardData[];
        setDashboard(data);
      };

      eventSource.onopen = () => {
        loaderContext?.hideLoader();
      };

      eventSource.onerror = err => {
        console.error('EventSource failed:', err);
        eventSource?.close();
        loaderContext?.hideLoader();
      };
      setListening(true);
    }
    return () => {
      eventSource?.close();
      loaderContext?.hideLoader();
      console.log('event closed');
    };
  }, []);

  return (
    <div className='dashboard'>
      {dashboard.map(value => {
        const activeHeader: IActiveReservationHeader = {
          specialistName: value.name,
          specialistSurname: value.surname,
          activeReservation: value.activeReservation,
        };
        return <ActiveQue key={`${value.name}@${value.surname}`} activeHeader={activeHeader} que={value.reservationsInQue} />;
      })}
    </div>
  );
};
export default DashboardPage;
