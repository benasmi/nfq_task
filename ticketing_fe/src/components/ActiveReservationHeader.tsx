import React from 'react';
import '../components/ActiveReservationHeader.css';

export interface IActiveReservationHeader {
  specialistName: string;
  specialistSurname: string;
  activeReservation: string | null;
}

const ActiveReservationHeader: React.FC<IActiveReservationHeader> = (payload: IActiveReservationHeader) => {
  const { specialistName, specialistSurname, activeReservation } = payload;
  return (
    <div className='activeHeader'>
      <div>{`${specialistName} ${specialistSurname}`}</div>
      <div className='activeReservation'>{activeReservation ? activeReservation : '---'}</div>
    </div>
  );
};

export default ActiveReservationHeader;
