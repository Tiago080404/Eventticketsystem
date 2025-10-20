package com.eventticketsystem.eventticketsystem.Controller;

import com.eventticketsystem.eventticketsystem.Entity.Tickets;
import com.eventticketsystem.eventticketsystem.Repository.TicketRepository;
import com.eventticketsystem.eventticketsystem.Service.TicketService;
import com.eventticketsystem.eventticketsystem.dto.TicketTransferReply;
import com.eventticketsystem.eventticketsystem.dto.TicketTransferRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketsController {

    private final TicketService ticketService;
    private final TicketRepository ticketRepository;

    public TicketsController(TicketService ticketService, TicketRepository ticketRepository){
        this.ticketService=ticketService;
        this.ticketRepository = ticketRepository;
    }

    @GetMapping("/user/{email}")
    public List<Tickets> getTicketsByUsername(@PathVariable String email){
        System.out.println("getting tickets of user...");
        List<Tickets> ticketsss =ticketService.getTicketsByUserEmail(email);
        //System.out.println(ticketsss);
        System.out.println(ticketsss);
        return ticketsss;
    }

    @PostMapping("/transfer")
    public ResponseEntity<?> transferTickets(@RequestBody TicketTransferRequest ticketTransferRequest){
        return ticketService.ticketTransfer(ticketTransferRequest);
    }

    @PostMapping("/transfer/response")
    public ResponseEntity<?>replyTransferTickets(@RequestBody TicketTransferReply ticketTransferReply){
        System.out.println(ticketTransferReply);
        return ticketService.replyTicketTransfer(ticketTransferReply);
    }

    @GetMapping("/transfer/notification/{email}")
    public ResponseEntity<?>getTransferNotification(@PathVariable String email){
        return ticketService.transferNotification(email);
    }
}
