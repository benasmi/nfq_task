package com.support.ticketing.controllers;

import com.support.ticketing.contracts.TicketOverviewResponse;
import com.support.ticketing.contracts.TicketRequest;
import com.support.ticketing.contracts.TicketResponse;
import com.support.ticketing.contracts.TicketStatusResponse;
import com.support.ticketing.services.TicketService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping("/")
    public TicketResponse insertTicket(@RequestBody TicketRequest ticketRequest){
        return ticketService.issueNewTicket(ticketRequest);
    }

    @GetMapping("/{id}")
    public TicketOverviewResponse getTicketOverview(@PathVariable(name = "id") String reservationCode){
        return ticketService.getTicketOverview(reservationCode);
    }

    @GetMapping("/{id}/que")
    public int getQueNumber(@PathVariable(name="id") String reservationCode){
        return ticketService.getQueNumber(reservationCode);
    }

    @GetMapping("/{id}/status")
    public TicketStatusResponse getTicketStatus(@PathVariable(name="id") String reservationCode){
        return ticketService.getTicketStatus(reservationCode);
    }

    @GetMapping("/{id}/cancel")
    public void cancelTicket(@PathVariable(name="id") String reservationCode,
                             @CookieValue(name="secretCode") String secretCode){
        ticketService.cancelTicket(reservationCode, secretCode);
    }

}
