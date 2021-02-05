package com.support.ticketing.contracts;

import lombok.Data;

@Data
public class TicketResponse {

    private TicketOverviewResponse ticket;
    private String secretCode;

    public TicketResponse(TicketOverviewResponse ticketOverviewResponse, String secretCode) {
        this.ticket = ticketOverviewResponse;
        this.secretCode = secretCode;
    }
}
