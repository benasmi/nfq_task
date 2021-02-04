package com.support.ticketing.controllers;

import com.support.ticketing.contracts.DashboardResponse;
import com.support.ticketing.services.DashboardService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.List;

@RequestMapping("/dashboard")
@RestController
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<List<DashboardResponse>> getResourceUsage(@CookieValue(name="jwt") String jwtToken) {
        return Flux.interval(Duration.ofSeconds(5))
                .map(it -> dashboardService.getCurrentDashboard(jwtToken));

    }

}
