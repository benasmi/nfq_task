package com.support.ticketing.services;

import com.support.ticketing.contracts.TicketOverviewResponse;
import com.support.ticketing.contracts.TicketRequest;
import com.support.ticketing.contracts.TicketStatusResponse;
import com.support.ticketing.models.Ticket;
import com.support.ticketing.models.User;
import com.support.ticketing.repositories.TicketRepository;
import com.support.ticketing.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    public TicketService(TicketRepository ticketRepository, UserRepository userRepository) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
    }

    public TicketOverviewResponse issueNewTicket(TicketRequest ticketRequest){
        String reservationCode = UUID.randomUUID().toString().substring(0,4);
        ticketRepository.save(TicketRequest.fromTicketRequest(ticketRequest, reservationCode));

        return getTicketOverview(reservationCode);
    }

    private Ticket getTicketByReservation(String reservationCode){
        Ticket ticket = ticketRepository.findByReservationCode(reservationCode);
        if(ticket == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket with this reservation code was not found!");
        }
        return ticket;
    }

    public int getQueNumber(String reservationCode){
        Ticket ticket = getTicketByReservation(reservationCode);
        return ticketRepository.findTicketQue(ticket.getReservationCode(), ticket.getUserId());
    }

    public int getQueNumber(Ticket ticket){
        return ticketRepository.findTicketQue(ticket.getReservationCode(), ticket.getUserId());
    }


    public TicketOverviewResponse getTicketOverview(String reservationCode){
        Ticket ticket = getTicketByReservation(reservationCode);
        User user = userRepository.findById(ticket.getUserId()).orElseThrow(()->{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User does not exist");
        });

        int que = getQueNumber(ticket);

        return TicketOverviewResponse.creationFrom(user, ticket, que);
    }

    public TicketStatusResponse getTicketStatus(String reservationCode) {
        Ticket ticket = getTicketByReservation(reservationCode);
        int que = getQueNumber(ticket);

        return TicketStatusResponse.fromTicketAndQue(ticket, que);
    }
}
