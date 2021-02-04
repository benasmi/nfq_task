import React from 'react';
import '../components/ActiveQue.css';
import ActiveReservationHeader, { IActiveReservationHeader } from './ActiveReservationHeader';
import WaitingReservationHeader from './WaitingReservationHeader';

export interface IActiveQue {
  activeHeader: IActiveReservationHeader;
  que: [string];
}

const ActiveQue: React.FC<IActiveQue> = (payload: IActiveQue) => {
  const { specialistName, specialistSurname, activeReservation } = payload.activeHeader;
  return (
    <div className='activeQue'>
      <ActiveReservationHeader
        specialistName={specialistName}
        specialistSurname={specialistSurname}
        activeReservation={activeReservation}
      />
      {payload.que.map(row => {
        return <WaitingReservationHeader key={row} reservationCode={row} />;
      })}
    </div>
  );
};

export default ActiveQue;
