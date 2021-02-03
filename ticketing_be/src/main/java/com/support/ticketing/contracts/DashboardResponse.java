package com.support.ticketing.contracts;

import lombok.Data;

import java.util.List;

@Data
public class DashboardResponse {

    private Long userId;
    private String activeReservation;
    private List<String> reservationsInQue;

    public DashboardResponse(Long userId, String activeReservation, List<String> reservationsInQue) {
        this.userId = userId;
        this.activeReservation = activeReservation;
        this.reservationsInQue = reservationsInQue;
    }
}
