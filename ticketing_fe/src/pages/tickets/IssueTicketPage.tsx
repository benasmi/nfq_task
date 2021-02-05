import React, { useContext, useEffect, useState } from 'react';
import './IssueTicketPage.css';
import { Auth } from '../../networking/api/auth';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookieService';
import { AxiosError } from 'axios';
import { LoaderContext } from '../../contexts/LoaderContext';
import { Tickets } from '../../networking/api/tickets';
import CurrentReservation from './CurrentReservation';

interface IAvailableSpecialist {
  name: string;
  surname: string;
  userId: number;
}

export interface ITicketStatus {
  isActive: boolean;
  isClosed: boolean;
  que: number;
}

export interface IViableReservation {
  reservationCode: string;
  issuedAt: string;
  status: ITicketStatus;
  specialist: IAvailableSpecialist;
}

const IssueTicketPage: React.FC = () => {
  const [availableSpecialist, setAvailableSpecialist] = useState<IAvailableSpecialist[]>([]);
  const [currentReservation, setCurrentReservation] = useState<IViableReservation | null>(null);

  const loaderContext = useContext(LoaderContext);

  useEffect(() => {
    loaderContext?.showLoader();

    const reservationCode = getCookie('reservationCode');
    console.log('reservationCode', reservationCode);

    if (!reservationCode) {
      fetchAvailableSpecialists();
    } else {
      getTicketOverview(reservationCode);
    }
  }, []);

  function selectSpecialist(id: number): void {
    console.log('Created ticket', id);
    createTicket(id);
  }

  function AvailableSpecialists(): any {
    return availableSpecialist.map(specialist => {
      return (
        <button id='specialist' key={specialist.userId} onClick={_ => selectSpecialist(specialist.userId)}>
          {specialist.name} {specialist.surname}
        </button>
      );
    });
  }

  function fetchAvailableSpecialists() {
    Auth.availableSpecialist()
      .then(response => {
        const data = response.data as IAvailableSpecialist[];
        setAvailableSpecialist(data);
        loaderContext?.hideLoader();
      })
      .catch((err: AxiosError<Error>) => {
        console.log('error');
      });
  }

  function createTicket(userId: number) {
    Tickets.createTicket({ userId })
      .then(response => {
        const createdTicked = response.data as IViableReservation;
        console.log('Created ticket', createdTicked);
        setCookie('reservationCode', createdTicked.reservationCode);
        setCurrentReservation(createdTicked);
      })
      .catch((err: AxiosError<Error>) => {
        console.log('err');
      });
  }

  function getTicketOverview(reservationCode: string) {
    Tickets.getTicketOverview(reservationCode)
      .then(response => {
        const cTicket = response.data as IViableReservation;
        if (cTicket.status.isClosed) {
          deleteCookie('reservationCode');
          fetchAvailableSpecialists();
          return;
        }
        setCurrentReservation(cTicket);
      })
      .catch((err: AxiosError<Error>) => {
        deleteCookie('reservationCode');
        setCurrentReservation(null);
      })
      .finally(() => {
        loaderContext?.hideLoader();
      });
  }

  return (
    <div>
      <div className='issueTicketBody'>
        {currentReservation && currentReservation.reservationCode != '' && !loaderContext?.loading ? (
          <CurrentReservation payload={currentReservation} />
        ) : (
          <div>
            <div>Open a ticket with one of the available specialists</div>
            <AvailableSpecialists />
          </div>
        )}
      </div>
    </div>
  );
};
export default IssueTicketPage;
