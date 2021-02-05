import React from 'react';
import { IViableReservation } from './IssueTicketPage';
import './CurrentReservation.css';
import moment from 'moment';

interface IReservation {
  payload: IViableReservation;
}

const CurrentReservation: React.FC<IReservation> = reservation => {
  function Ticket() {
    const { specialist, reservationCode, issuedAt, status } = reservation.payload;
    const que = status.que - 1;
    return (
      <div className='ticketBody'>
        <div>
          {specialist.name} {specialist.surname}
        </div>
        <div id='date'>{moment(issuedAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
        <div className='line' />
        <div style={{ color: que > 0 ? 'red' : '#4CAF50' }}>{reservationCode}</div>
        <div>Que: {status.que - 1}</div>
      </div>
    );
  }

  console.log(reservation.payload);
  return (
    <div className='mainScreen'>
      <Ticket />
      <div>
        <button key={100}>Refresh</button>
        <button key={1000}>Cancel</button>
      </div>
    </div>
  );
};

export default CurrentReservation;
