package com.eventticketsystem.eventticketsystem.Service;

import com.eventticketsystem.eventticketsystem.Entity.Events;
import com.eventticketsystem.eventticketsystem.Entity.Tickets;
import com.eventticketsystem.eventticketsystem.Entity.User;
import com.eventticketsystem.eventticketsystem.Repository.EventsRepository;
import com.eventticketsystem.eventticketsystem.Repository.TicketRepository;
import com.eventticketsystem.eventticketsystem.Repository.UserRepository;
import com.eventticketsystem.eventticketsystem.dto.BuyTicketRequest;
import com.eventticketsystem.eventticketsystem.dto.TicketTransferRequest;
import net.glxn.qrgen.QRCode;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class TicketService {
    private final TicketRepository ticketRepository;
    private final EventsRepository eventsRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    public TicketService(TicketRepository ticketRepository,EventsRepository eventsRepository,UserRepository userRepository,EmailService emailService) {
        this.ticketRepository = ticketRepository;
        this.eventsRepository = eventsRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    public List<Tickets> getTicketsByUserEmail(String email) {
        return ticketRepository.findByUserEmail(email);
    }

    public Events buyTicket(String name, BuyTicketRequest request){
        Events boughtTicket =  eventsRepository.findById(name)
                .orElseThrow(()->new RuntimeException("Event not found:"+name));

        if(boughtTicket.getAvailabletickets()<request.getAmount()){
            throw new RuntimeException("Not enough Tickets to buy that amount for this event");
        }

        if(boughtTicket.getPrice()*request.getAmount()>request.getMoneypaid()){
            throw new RuntimeException("Not enough money for this event");
        }
        boughtTicket.setAvailabletickets( boughtTicket.getAvailabletickets() - request.getAmount());

        String uuid = UUID.randomUUID().toString();

        User userEntity = userRepository.findByEmail(request.getUser())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Tickets tickets = new Tickets();
        tickets.setEvents(boughtTicket); // ist ja das event entity
        tickets.setUser(userEntity); // muss user repo anlegen um ganzen user zu bekommen
        tickets.setQuantity(request.getAmount());
        tickets.setPurchased_at(LocalDateTime.now());
        tickets.setTicket_UUID(uuid);
        ticketRepository.save(tickets);

        ByteArrayOutputStream stream = QRCode.from(uuid).withSize(255,255).stream();
        byte[] qrBytes = stream.toByteArray();
        ByteArrayResource qrAttachment = new ByteArrayResource(qrBytes);

        String subject = "Ticketkauf bestätigt für ";
        String text = "Hallo,\n\nDu hast " +
                " Ticket(s) für das Event '\n"+
                boughtTicket.getName()+"am:"+boughtTicket.getDate();


        try {
            emailService.sendMailWithAttachment(request.getUser(),subject,text,"ticket.png",qrAttachment);
        } catch (Exception e) {
            System.err.println("Email konnte nicht gesendet werden: " + e.getMessage());
        }
        eventsRepository.save(boughtTicket);
        return boughtTicket;
    }

    @Transactional
    public ResponseEntity<?> ticketTransfer(TicketTransferRequest ticketTransferRequest){

        try{
            Tickets tickets = ticketRepository.findById(ticketTransferRequest.getTicketId())
                    .orElseThrow(()->new RuntimeException("ticket not found"));
            User userEnity = userRepository.findByEmail(ticketTransferRequest.getNewUserEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            System.out.println(tickets);

            tickets.setUser(userEnity);
            ticketRepository.save(tickets);




            ByteArrayOutputStream stream = QRCode.from(tickets.getTicket_UUID()).withSize(255,255).stream();
            byte[] qrBytes = stream.toByteArray();
            ByteArrayResource qrAttachment = new ByteArrayResource(qrBytes);

            String subject = "Ticket Transferiert";
            String text = "Hallo sind Ihre Tickets:\n"+
                    tickets.getEvents();

            try{
                emailService.sendMailWithAttachment(ticketTransferRequest.getNewUserEmail(),subject,text,"ticket.png",qrAttachment);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }


            Map<String,Object> response = new HashMap<>();
            response.put("message","Ticket got transfered!");
            response.put("ticketId",tickets.getTicket_id());
            response.put("newOwner",userEnity.getEmail());

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            Map<String,String> errorResponse = new HashMap<>();
            errorResponse.put("error",e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}