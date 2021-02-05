package com.support.ticketing.contracts;

import com.support.ticketing.models.Ticket;
import lombok.Data;

@Data
public class TicketStatusResponse {
    private boolean active;
    private boolean close;
    private int que;

    public TicketStatusResponse(boolean isActive, boolean isClosed, int que) {
        this.active = isActive;
        this.close = isClosed;
        this.que = que;
    }

    public static TicketStatusResponse fromTicketAndQue(Ticket ticket, int que){
        return new TicketStatusResponse(ticket.getIs_active(), ticket.getIs_closed(), que);
    }
}
