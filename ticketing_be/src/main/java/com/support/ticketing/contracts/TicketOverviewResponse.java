package com.support.ticketing.contracts;

import com.support.ticketing.models.Ticket;
import com.support.ticketing.models.User;
import lombok.Data;

import java.util.Date;

@Data
public class TicketOverviewResponse {

    private String reservationCode;
    private Date issuedAt;
    private TicketStatusResponse status;
    private UserSpecialistResponse specialist;

    public TicketOverviewResponse(String reservationCode, Date issuedAt, TicketStatusResponse ticketStatus, UserSpecialistResponse specialist) {
        this.reservationCode = reservationCode;
        this.issuedAt = issuedAt;
        this.status = ticketStatus;
        this.specialist = specialist;
    }

    public static TicketOverviewResponse creationFrom(User user, Ticket ticket, int queNumber){
        return new TicketOverviewResponse(
                ticket.getReservationCode(),
                ticket.getIssuedAt(),
                TicketStatusResponse.fromTicketAndQue(ticket, queNumber),
                new UserSpecialistResponse(user.getSurname(), user.getName(), user.getId()));
    }

}
