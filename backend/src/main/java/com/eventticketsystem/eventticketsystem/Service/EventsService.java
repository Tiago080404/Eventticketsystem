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

    public List<Events> getEventsBySearch(String input){
        System.out.println(input);

        return eventsRepository.getEventsBySearch(input);
    }

    public List<Events> getLastChanceEvents(){
        return eventsRepository.getLastChanceEvents();
    }

}
