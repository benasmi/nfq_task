package com.support.ticketing.contracts;

import lombok.Data;

import java.util.List;

@Data
public class WorkerResponse {

    private String activeTicket;
    private List<String> queTickets;

    public WorkerResponse(String activeTicket, List<String> queTickets) {
        this.activeTicket = activeTicket;
        this.queTickets = queTickets;
    }

}
