package com.support.ticketing.services;

import com.support.ticketing.contracts.TicketRequest;
import com.support.ticketing.models.Ticket;
import com.support.ticketing.repositories.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }


    public String issueNewTicket(TicketRequest ticketRequest){
        String reservationCode = UUID.randomUUID().toString().substring(0,4);
        ticketRepository.save(TicketRequest.fromTicketRequest(ticketRequest, reservationCode));
        return reservationCode;
    }
}
