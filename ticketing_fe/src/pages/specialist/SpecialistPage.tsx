import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import './SpecialistPage.css';
import { AuthContext } from '../../contexts/AuthContext';
import { AxiosError } from 'axios';
import { Specialist } from '../../networking/api/worker';
import WaitingReservationHeader from '../../components/WaitingReservationHeader';

interface ISpecialist {
  activeTicket: string | null;
  queTickets: [string];
}

const SpecialistPage: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [currentQue, setCurrentQue] = useState<ISpecialist | null>(null);

  useEffect(() => {
    getCurrentQue();
  }, []);

  function getCurrentQue(): void {
    Specialist.getCurrentQue()
      .then(response => {
        const data = response.data as ISpecialist;
        setCurrentQue(data);
      })
      .catch((err: AxiosError<Error>) => {
        console.log(err);
      });
  }

  function closeTicket(): void {
    const activeTicket = currentQue?.activeTicket as string;
    Specialist.closeTicket(activeTicket)
      .then(() => {
        getCurrentQue();
      })
      .catch((err: AxiosError<Error>) => {
        console.log(err);
      });
  }

  function activateTicket(): void {
    const nextTicket = currentQue?.queTickets[0] as string;
    Specialist.activateTicket(nextTicket)
      .then(() => {
        getCurrentQue();
      })
      .catch((err: AxiosError<Error>) => {
        console.log(err);
      });
  }

  function SpecialistBody(): any {
    return (
      <div className='specialistBody'>
        <div>
          {authContext?.profile?.name} {authContext?.profile?.surname}
        </div>
        <p style={{ color: currentQue?.activeTicket ? 'green' : 'white' }}>{currentQue?.activeTicket ? currentQue.activeTicket : '---'}</p>
      </div>
    );
  }

  return (
    <div className='mainScreen'>
      <SpecialistBody />
      <div>
        <button key={100} onClick={getCurrentQue}>
          Refresh
        </button>
        {currentQue?.activeTicket && (
          <button key={1000} onClick={closeTicket}>
            Close ticket {currentQue.activeTicket}
          </button>
        )}
      </div>

      <div>
        {!currentQue?.activeTicket && currentQue?.queTickets && currentQue?.queTickets.length > 0 && (
          <button key={50} onClick={activateTicket}>
            Proceed with next client
          </button>
        )}
      </div>

      <div>
        {currentQue?.queTickets.map(value => {
          return <WaitingReservationHeader key={value} reservationCode={value} />;
        })}
        {currentQue && currentQue?.queTickets.length < 1 && <p id='queEmpty'> Que is empty </p>}
      </div>
    </div>
  );
};

export default SpecialistPage;
