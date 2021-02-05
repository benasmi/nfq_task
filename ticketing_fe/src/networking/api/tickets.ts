import { AxiosPromise } from 'axios';
import RequestType from '../networkLayerCentral';

interface ITicketRequest {
  userId: number;
}

const createTicket = (ticketRequest: ITicketRequest): AxiosPromise<any> =>
  RequestType.postRequest(`/tickets/`, JSON.stringify(ticketRequest));

const getTicketOverview = (reservationCode: string): AxiosPromise<any> => RequestType.getRequest(`/tickets/${reservationCode}`);

export const Tickets = {
  createTicket,
  getTicketOverview,
};
