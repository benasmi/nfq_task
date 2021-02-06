import { AxiosPromise } from 'axios';
import RequestType from '../networkLayerCentral';

const getCurrentQue = (): AxiosPromise<any> => RequestType.getRequest(`/worker/`);
const closeTicket = (reservationCode: string): AxiosPromise<any> => RequestType.getRequest(`/tickets/${reservationCode}/close`);
const activateTicket = (reservationCode: string): AxiosPromise<any> => RequestType.getRequest(`/tickets/${reservationCode}/activate`);

export const Specialist = {
  getCurrentQue,
  closeTicket,
  activateTicket,
};
