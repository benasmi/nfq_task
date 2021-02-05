import React from 'react';
import { IViableReservation } from './IssueTicketPage';
import './CurrentReservation.css';
import moment from 'moment';

interface IReservation {
  payload: IViableReservation;
  onRefresh: () => void;
  onCancel: () => void;
}

const CurrentReservation: React.FC<IReservation> = reservation => {
  function Ticket() {
    const { specialist, reservationCode, issuedAt, status } = reservation.payload;
    const que = calculateRealQue();
    return (
      <div className='ticketBody'>
        <div>
          {specialist.name} {specialist.surname}
        </div>
        <div id='date'>{moment(issuedAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
        <div className='line' />
        <div style={{ color: que > 0 ? 'red' : '#4CAF50' }}>{reservationCode}</div>
        <div>Que: {que}</div>
      </div>
    );
  }

  function calculateRealQue(): number {
    const { status } = reservation.payload;
    return status.que == 1 && status.active ? 0 : status.que;
  }

  return (
    <div className='mainScreen'>
      <Ticket />
      <div>
        <button key={100} onClick={reservation.onRefresh}>
          Refresh
        </button>
        <button key={1000} onClick={reservation.onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CurrentReservation;
