import React, { useEffect, useState } from 'react';
import { getCookie } from '../../utils/cookieService';
import ActiveReservationHeader, { IActiveReservationHeader } from '../../components/ActiveReservationHeader';
import './DashboardPage.css';
import ActiveQue from '../../components/ActiveQue';

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

  let eventSource: EventSource | undefined = undefined;

  useEffect(() => {
    if (!listening) {
      const token = getCookie('jwt');
      console.log('using token', token);

      eventSource = new EventSource('http://localhost:8080/dashboard/stream', { withCredentials: true });
      eventSource.onmessage = event => {
        const data = JSON.parse(event.data) as IDashboardData[];
        setDashboard(data);
        console.log('Event data', event.data);
        // console.log('Parsed data', data);
      };

      eventSource.onerror = err => {
        console.error('EventSource failed:', err);
        eventSource?.close();
      };
      setListening(true);
    }
    return () => {
      eventSource?.close();
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
