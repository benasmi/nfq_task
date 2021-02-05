package com.support.ticketing.contracts;

import com.sun.istack.NotNull;
import com.support.ticketing.models.Ticket;
import lombok.Data;

@Data
public class TicketRequest {

    @NotNull
    private Long userId;

    public static Ticket fromTicketRequest(TicketRequest ticketRequest, String reservationCode, String secretCode){
        return new Ticket(null, ticketRequest.userId, reservationCode, false, false, secretCode);
    }
}
