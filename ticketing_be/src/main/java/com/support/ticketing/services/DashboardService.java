package com.support.ticketing.services;

import com.support.ticketing.contracts.DashboardResponse;
import com.support.ticketing.models.Ticket;
import com.support.ticketing.models.User;
import com.support.ticketing.repositories.TicketRepository;
import com.support.ticketing.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final UserService userService;
    private final TicketRepository ticketRepository;

    public DashboardService(UserRepository userRepository, UserService userService, TicketRepository ticketRepository) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.ticketRepository = ticketRepository;
    }

    public List<DashboardResponse> getCurrentDashboard(){
        User user = userService.getCurrentUser();
        if(!user.isAdmin()){
            throw new ResponseStatusException(HttpStatus.I_AM_A_TEAPOT, "Permission to access dashboard is denied!");
        }

        List<DashboardResponse> dashboardData = new ArrayList<>();
        List<User> activeUsers = userRepository.findAllWorkingUsers();

        activeUsers.forEach( workingUser ->{

            Ticket activeTicket = ticketRepository.findActiveTicketByUser(workingUser.getId());
            List<Ticket> ticketsInQue = ticketRepository.findTicketsInQueByUser(workingUser.getId());

            dashboardData.add(new DashboardResponse(
                    workingUser.getId(),
                    activeTicket == null ? null : activeTicket.getReservationCode(),
                    ticketsInQue.stream().map(Ticket::getReservationCode).collect(Collectors.toList())));
        });

        return dashboardData;
    }

}
