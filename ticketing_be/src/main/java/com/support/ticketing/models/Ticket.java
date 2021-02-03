package com.support.ticketing.models;

import lombok.Data;
import lombok.Generated;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
@Table(name="tickets")
public class Ticket {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String reservationCode;
    private Boolean is_active;
    private Boolean is_closed;

    @CreationTimestamp
    @Column(name="issued_at")
    private Timestamp issuedAt;

    public Ticket(Long id, Long userId, String reservationCode, Boolean is_active, Boolean is_closed) {
        this.id = id;
        this.userId = userId;
        this.reservationCode = reservationCode;
        this.is_active = is_active;
        this.is_closed = is_closed;
    }

    public Ticket(){

    }
}
