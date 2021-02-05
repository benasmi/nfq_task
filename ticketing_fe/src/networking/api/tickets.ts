import { AxiosPromise } from 'axios';
import RequestType from '../networkLayerCentral';

interface ITicketRequest {
  userId: number;
}

const createTicket = (ticketRequest: ITicketRequest): AxiosPromise<any> =>
  RequestType.postRequest(`/tickets/`, JSON.stringify(ticketRequest));

const getTicketOverview = (reservationCode: string): AxiosPromise<any> => RequestType.getRequest(`/tickets/${reservationCode}`);

const getTicketStatus = (reservationCode: string): AxiosPromise<any> => RequestType.getRequest(`/tickets/${reservationCode}/status`);

const cancelTicket = (reservationCode: string): AxiosPromise<any> =>
  RequestType.getRequest(`/tickets/${reservationCode}/cancel`, '', false, true);

export const Tickets = {
  createTicket,
  getTicketOverview,
  getTicketStatus,
  cancelTicket,
};
