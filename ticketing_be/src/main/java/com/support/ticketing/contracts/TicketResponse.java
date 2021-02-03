package com.support.ticketing.contracts;

import lombok.Data;

@Data
public class TicketResponse {

    private String reservationCode;

    public TicketResponse(String reservationCode) {
        this.reservationCode = reservationCode;
    }
}
