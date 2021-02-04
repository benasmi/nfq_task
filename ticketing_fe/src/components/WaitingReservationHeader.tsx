import React from 'react';
import './WaitingReservationHeader.css';

export interface IWaitingReservationHeader {
  reservationCode: string;
}

const WaitingReservationHeader: React.FC<IWaitingReservationHeader> = (payload: IWaitingReservationHeader) => {
  return <div className='queHeader'>{payload.reservationCode}</div>;
};

export default WaitingReservationHeader;
