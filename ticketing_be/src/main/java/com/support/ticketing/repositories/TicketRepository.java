package com.support.ticketing.repositories;

import com.support.ticketing.models.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    @Query(nativeQuery = true, value="SELECT t.* from tickets t " +
            "where t.user_id=:userId and t.is_active= true " +
            " order by t.issued_at " +
            "limit 1")
    Ticket findActiveTicketByUser(Long userId);

    @Query(nativeQuery = true,
            value="" +
                    "SELECT t.* from tickets t" +
                    " where t.user_id=:userId and not t.is_active and not t.is_closed" +
                    " order by t.issued_at limit 5")
    List<Ticket> findTicketsInQueByUser(Long userId);

}
