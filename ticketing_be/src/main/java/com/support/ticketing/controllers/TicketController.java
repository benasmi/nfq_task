package com.support.ticketing.controllers;

import com.support.ticketing.contracts.TicketRequest;
import com.support.ticketing.contracts.TicketResponse;
import com.support.ticketing.services.TicketService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping("/")
    public TicketResponse insertTicket(@RequestBody TicketRequest ticketRequest){
        String reservationCode = ticketService.issueNewTicket(ticketRequest);
        return new TicketResponse(reservationCode);
    }

}
