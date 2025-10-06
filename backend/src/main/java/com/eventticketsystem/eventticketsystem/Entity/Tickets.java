package com.eventticketsystem.eventticketsystem.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="tickets")
public class Tickets {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)//ist serial
    private Long ticket_id;

    @ManyToOne
    @JoinColumn(name = "event_name",nullable = false)
    private Events events;

    @ManyToOne
    @JoinColumn(name = "user_email", nullable = false)
    private User user;

    @Column(nullable = false)
    private int quantity;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDateTime purchased_at;

    @Column(nullable = false)
    private String ticket_UUID;

    public Long getTicket_id(){
        return ticket_id;
    }
    public void setTicket_id(Long ticket_id){
        this.ticket_id = ticket_id;
    }
    public Events getEvents(){
        return events;
    }
    public void setEvents(Events events){
        this.events = events;
    }
    public User getUser(){
        return user;
    }
    public void setUser(User user){
        this.user = user;
    }
    public int getQuantity(){
        return quantity;
    }
    public void setQuantity(int quantity){
        this.quantity=quantity;
    }
    public LocalDateTime getPurchased_at(){
        return purchased_at;
    }
    public void setPurchased_at(LocalDateTime purchasedAt){
        this.purchased_at = purchasedAt;
    }
    public String getTicket_UUID(){
        return ticket_UUID;
    }
    public void setTicket_UUID(String ticket_UUID){
        this.ticket_UUID = ticket_UUID;
    }
}
