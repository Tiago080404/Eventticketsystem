package com.eventticketsystem.eventticketsystem.Controller;

import com.eventticketsystem.eventticketsystem.Entity.Tickets;
import com.eventticketsystem.eventticketsystem.Service.TicketService;
import com.eventticketsystem.eventticketsystem.dto.TicketTransferRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        System.out.println("getting tickets of user...");
        List<Tickets> ticketsss =ticketService.getTicketsByUserEmail(email);
        //System.out.println(ticketsss);
        System.out.println(ticketsss);
        return ticketsss;
    }
//neue route machen mit dto ohne user feldern für alle tickets bvon einem user bekommen
    @PostMapping("/transfer")
    public ResponseEntity<?> transferTickets(@RequestBody TicketTransferRequest ticketTransferRequest){
        return ticketService.ticketTransfer(ticketTransferRequest);
    }
}
