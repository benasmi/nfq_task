package com.support.ticketing.controllers;

import com.support.ticketing.contracts.WorkerResponse;
import com.support.ticketing.services.WorkerService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/worker")
public class WorkerController {

    private final WorkerService workerService;

    public WorkerController(WorkerService workerService) {
        this.workerService = workerService;
    }

    @GetMapping("/")
    public WorkerResponse getCurrentQue(){
        return workerService.getCurrentQue();
    }

}
