package com.eventticketsystem.eventticketsystem.Controller;

import com.eventticketsystem.eventticketsystem.Entity.Events;
import com.eventticketsystem.eventticketsystem.Service.EventsService;
import com.eventticketsystem.eventticketsystem.Service.TicketService;
import com.eventticketsystem.eventticketsystem.dto.BuyTicketRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventsController {

    private final EventsService eventsService;
    private final TicketService ticketService;

    public EventsController(EventsService eventsService, TicketService ticketService){
        this.eventsService = eventsService;
        this.ticketService = ticketService;
    }

    @GetMapping
    public List<Events> getAllEvents(){
        return eventsService.getAllEvents();
    }

    @PostMapping("/create")
    public Events createEvent(@RequestBody Events events){
        return eventsService.makeEvent(events);
    }

    @GetMapping("/{name}")
    public Events getEventByName(@PathVariable("name") String name){
        return eventsService.getEventByName(name);
    }

    @PostMapping("/{name}/buy")
    public Events buyTicket(@PathVariable("name") String name, @RequestBody BuyTicketRequest request){
        System.out.println("Controller"+request.getUser());
        Events doas=  ticketService.buyTicket(name,request);
        System.out.println("Hasjdfak");//er kommt hier nicht hin
        return  doas;
    }

    @GetMapping("/search/{input}")
    public List<Events> searchEventsByInput(@PathVariable("input") String input){
        System.out.println(input);
        return eventsService.getEventsBySearch(input);
    }
}
