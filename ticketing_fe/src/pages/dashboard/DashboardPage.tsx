import React, { useEffect, useState } from 'react';
import { getCookie } from '../../utils/cookieService';
import ActiveReservationHeader from '../../components/ActiveReservationHeader';

const DashboardPage: React.FC = () => {
  const [listening, setListening] = useState<boolean>(false);
  let eventSource: EventSource | undefined = undefined;

  useEffect(() => {
    if (!listening) {
      const token = getCookie('jwt');
      console.log('using token', token);

      eventSource = new EventSource('http://localhost:8080/dashboard/stream', { withCredentials: true });
      eventSource.onmessage = event => {
        console.log(event.data);
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
    <div>
      <ActiveReservationHeader specialistName='Petras' specialistSurname='Petraitis' activeReservation='EFFQ' />
      <ActiveReservationHeader specialistName='Vardenis' specialistSurname='Pavardenis' activeReservation='EQKS' />
    </div>
  );
};
export default DashboardPage;
