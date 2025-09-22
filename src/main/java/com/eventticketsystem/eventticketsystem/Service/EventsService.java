package com.eventticketsystem.eventticketsystem.Service;

import com.eventticketsystem.eventticketsystem.Entity.Events;
import com.eventticketsystem.eventticketsystem.Entity.Tickets;
import com.eventticketsystem.eventticketsystem.Entity.User;
import com.eventticketsystem.eventticketsystem.Repository.EventsRepository;
import com.eventticketsystem.eventticketsystem.Repository.TicketRepository;
import com.eventticketsystem.eventticketsystem.Repository.UserRepository;
import com.eventticketsystem.eventticketsystem.dto.BuyTicketRequest;
import net.glxn.qrgen.QRCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class EventsService {

    private final EventsRepository eventsRepository;
    private final EmailService emailService;
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    @Autowired
    public EventsService(EventsRepository eventsRepository, EmailService emailService,TicketRepository ticketRepository,UserRepository userRepository){
        this.eventsRepository = eventsRepository;
        this.emailService = emailService;
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
    }

    public List<Events> getAllEvents(){
    return eventsRepository.findAll();
    }

    public Events makeEvent(Events events){
        return eventsRepository.save(events);
    }

    public Events getEventByName(String name){
        return eventsRepository.findById(name)
                .orElseThrow(()->new RuntimeException("Event not found: " + name));
    }

    public Events buyTicket(String name, BuyTicketRequest request){//das vllt auslagern un TicketService
        Events boughtTicket =  eventsRepository.findById(name)
                .orElseThrow(()->new RuntimeException("Event not found:"+name));

        if(boughtTicket.getAvailabletickets()<request.getAmount()){
            throw new RuntimeException("Not enough Tickets to buy that amount for this event");
        }

        if(boughtTicket.getPrice()>request.getMoneypaid()){
            throw new RuntimeException("Not enough money for this event");
        }
        boughtTicket.setAvailabletickets( boughtTicket.getAvailabletickets() - request.getAmount());

        String uuid = UUID.randomUUID().toString();

        User userEntity = userRepository.findByEmail(request.getUser())
                .orElseThrow(() -> new RuntimeException("User not found"));


        //ticket in tickets hinzufügen
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
}
