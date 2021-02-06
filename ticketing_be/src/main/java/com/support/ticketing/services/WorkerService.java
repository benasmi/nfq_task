package com.support.ticketing.services;

import com.support.ticketing.contracts.TicketStatusResponse;
import com.support.ticketing.contracts.WorkerResponse;
import com.support.ticketing.models.Ticket;
import com.support.ticketing.models.User;
import com.support.ticketing.repositories.TicketRepository;
import org.hibernate.jdbc.Work;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkerService {

    private final UserService userService;
    private final TicketRepository ticketRepository;

    public WorkerService(UserService userService, TicketRepository ticketRepository) {
        this.userService = userService;
        this.ticketRepository = ticketRepository;
    }

    public WorkerResponse getCurrentQue() {
        User user = userService.getCurrentUser();

        Ticket activeTicket = ticketRepository.findActiveTicketByUser(user.getId());
        List<Ticket> queTickets = ticketRepository.findTicketsInQueByUser(user.getId());

        String active = activeTicket == null ? null : activeTicket.getReservationCode();

        return new WorkerResponse(
                active,
                queTickets.stream().map(Ticket::getReservationCode).collect(Collectors.toList()));

    }
}
