package com.eventticketsystem.eventticketsystem.Controller;

import com.eventticketsystem.eventticketsystem.Entity.Tickets;
import com.eventticketsystem.eventticketsystem.Service.TicketService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketsController {

    private final TicketService ticketService;

    public TicketsController(TicketService ticketService){
        this.ticketService=ticketService;
    }

    @GetMapping("/user/{email}")
    public List<Tickets> getTicketsByUsername(@PathVariable String email){
        List<Tickets> ticketsss =ticketService.getTicketsByUserEmail(email);
        System.out.println(ticketsss);
        return ticketsss;
    }
}
