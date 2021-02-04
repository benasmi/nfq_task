package com.support.ticketing.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.support.ticketing.contracts.DashboardResponse;
import com.support.ticketing.models.Ticket;
import com.support.ticketing.models.User;
import com.support.ticketing.repositories.TicketRepository;
import com.support.ticketing.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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


    @Value("${jwt.auth.bearer.header}")
    private String authHeader;

    @Value("${jwt.auth.bearer.token.prefix}")
    private String tokenPrefix;

    @Value("${jwt.auth.bearer.secret}")
    private String secret;

    public DashboardService(UserRepository userRepository, UserService userService, TicketRepository ticketRepository) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.ticketRepository = ticketRepository;
    }

    public List<DashboardResponse> getCurrentDashboard(String jwtToken){
        validateDashboardToken(jwtToken);

        List<DashboardResponse> dashboardData = new ArrayList<>();
        List<User> activeUsers = userRepository.findAllWorkingUsers();

        activeUsers.forEach( workingUser ->{

            Ticket activeTicket = ticketRepository.findActiveTicketByUser(workingUser.getId());
            List<Ticket> ticketsInQue = ticketRepository.findTicketsInQueByUser(workingUser.getId());

            dashboardData.add(new DashboardResponse(
                    workingUser.getId(),
                    workingUser.getName(),
                    workingUser.getSurname(),
                    activeTicket == null ? null : activeTicket.getReservationCode(),
                    ticketsInQue.stream().map(Ticket::getReservationCode).collect(Collectors.toList())));
        });

        return dashboardData;
    }

    public void validateDashboardToken(String jwtToken){
            String username = JWT.require(Algorithm.HMAC512(secret.getBytes()))
                    .build()
                    .verify(jwtToken.replace(tokenPrefix, ""))
                    .getSubject();

            User user = userRepository.findByUsername(username);
            if(!user.isAdmin()){
                throw new ResponseStatusException(HttpStatus.I_AM_A_TEAPOT, "Permission to access dashboard is denied!");
            }
    }

}
