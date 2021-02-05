package com.support.ticketing.services;

import com.support.ticketing.contracts.TicketOverviewResponse;
import com.support.ticketing.contracts.TicketRequest;
import com.support.ticketing.contracts.TicketResponse;
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

    public TicketResponse issueNewTicket(TicketRequest ticketRequest){
        String reservationCode = UUID.randomUUID().toString().substring(0,4);
        String secretCode = UUID.randomUUID().toString();

        ticketRepository.save(TicketRequest.fromTicketRequest(ticketRequest, reservationCode, secretCode));

        TicketOverviewResponse ticketOverviewResponse = getTicketOverview(reservationCode);
        return new TicketResponse(ticketOverviewResponse, secretCode);
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
        if(ticket.getIs_closed()){
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Ticket is closed");
        }
        return ticketRepository.findTicketQue(ticket.getReservationCode(), ticket.getUserId());
    }

    public int getQueNumber(Ticket ticket){
        if(ticket.getIs_closed()){
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Ticket is closed");
        }
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

    public void cancelTicket(String reservationCode, String secretCode) {
        Ticket ticket = getTicketByReservation(reservationCode);
        if(!ticket.getSecret().equals(secretCode)){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Only owner can cancel ticket");
        }

        ticket.setIs_active(false);
        ticket.setIs_closed(true);
        ticketRepository.save(ticket);
    }
}
