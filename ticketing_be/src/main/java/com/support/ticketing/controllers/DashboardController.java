package com.support.ticketing.controllers;

import com.support.ticketing.contracts.DashboardResponse;
import com.support.ticketing.services.DashboardService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RequestMapping("/dashboard")
@RestController
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/")
    public List<DashboardResponse> getDashboard(Principal principal){
        return dashboardService.getCurrentDashboard();
    }
}
