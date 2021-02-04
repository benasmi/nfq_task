import React from 'react';
import '../components/ActiveReservationHeader.css';

export interface IActiveReservationHeader {
  specialistName: string;
  specialistSurname: string;
  activeReservation: string;
}

const ActiveReservationHeader: React.FC<IActiveReservationHeader> = (payload: IActiveReservationHeader) => {
  return (
    <div>
      <div>{`${payload.specialistName} ${payload.specialistSurname}`}</div>
      <div />
      <div>${payload.activeReservation}</div>
    </div>
  );
};

export default ActiveReservationHeader;
