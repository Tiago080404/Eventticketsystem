package com.eventticketsystem.eventticketsystem.dto;

import com.eventticketsystem.eventticketsystem.Entity.Events;

import java.time.LocalDateTime;
import java.util.List;

public class UserDataResponse {
    private String username;
    private String name;
    private  java.sql.Timestamp date;
    private int availableTickets;
    private int price;

//    public UserDataResponse(String username,String name,LocalDateTime date,int availableTickets,int price){
//        this.username = username;
//        this.name = name;
//
//    }
    public UserDataResponse(String username,String name, java.sql.Timestamp date, int availableTickets,int price){
        this.name=name;
        this.username=username;
        this.availableTickets=availableTickets;
        this.date=date;
        this.price=price;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAvailableTickets() {
        return availableTickets;
    }

    public int getPrice() {
        return price;
    }

    public  java.sql.Timestamp getDate() {
        return date;
    }

    public void setAvailableTickets(int availableTickets) {
        this.availableTickets = availableTickets;
    }

    public void setDate( java.sql.Timestamp date) {
        this.date = date;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}
