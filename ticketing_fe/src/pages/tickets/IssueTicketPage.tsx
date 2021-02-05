import React, { useContext, useEffect, useState } from 'react';
import './IssueTicketPage.css';
import { Auth } from '../../networking/api/auth';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookieService';
import { AxiosError, AxiosPromise } from 'axios';
import { LoaderContext } from '../../contexts/LoaderContext';
import { Tickets } from '../../networking/api/tickets';
import CurrentReservation from './CurrentReservation';

interface IAvailableSpecialist {
  name: string;
  surname: string;
  userId: number;
}

interface INewTicket {
  ticket: IViableReservation;
  secretCode: string;
}

export interface ITicketStatus {
  active: boolean;
  close: boolean;
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
        const createdTicked = response.data as INewTicket;
        console.log('Created ticket', createdTicked);
        setCookie('reservationCode', createdTicked.ticket.reservationCode);
        setCookie('secretCode', createdTicked.secretCode);
        setCurrentReservation(createdTicked.ticket);
      })
      .catch((err: AxiosError<Error>) => {
        console.log('err');
      });
  }

  function getTicketOverview(reservationCode: string) {
    Tickets.getTicketOverview(reservationCode)
      .then(response => {
        const cTicket = response.data as IViableReservation;
        if (cTicket.status.close) {
          deleteCookie('reservationCode');
          deleteCookie('secretCode');
          fetchAvailableSpecialists();
          return;
        }
        setCurrentReservation(cTicket);
      })
      .catch((err: AxiosError<Error>) => {
        console.log(err);
      })
      .finally(() => {
        loaderContext?.hideLoader();
      });
  }

  function getTicketStatus(reservationCode: string) {
    Tickets.getTicketStatus(reservationCode)
      .then(response => {
        const ticketStatus = response.data as ITicketStatus;
        if (currentReservation) {
          setCurrentReservation({
            status: ticketStatus,
            reservationCode: currentReservation.reservationCode,
            specialist: currentReservation.specialist,
            issuedAt: currentReservation.issuedAt,
          });
        }
      })
      .catch((err: AxiosPromise<Error>) => {
        console.log(err);
      });
  }

  function onRefreshTicket(): void {
    if (currentReservation) {
      getTicketStatus(currentReservation?.reservationCode);
    }
  }

  function onCancelTicket(): void {
    if (currentReservation) {
      Tickets.cancelTicket(currentReservation?.reservationCode)
        .then(() => {
          console.log('deleted ticket');
          deleteCookie('reservationCode');
          deleteCookie('secretCode');
          fetchAvailableSpecialists();
          setCurrentReservation(null);
        })
        .catch((err: AxiosError<Error>) => {
          console.log(err);
        });
    }
  }

  return (
    <div>
      <div className='issueTicketBody'>
        {currentReservation && !loaderContext?.loading ? (
          <CurrentReservation onRefresh={onRefreshTicket} onCancel={onCancelTicket} payload={currentReservation} />
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
