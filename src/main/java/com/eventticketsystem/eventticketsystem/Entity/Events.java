package com.eventticketsystem.eventticketsystem.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


import java.sql.Timestamp;

@Entity
@Table(name="events")
public class Events {

    @Id
    @Column(nullable = false,unique = true)
    private String name;

    @Column(nullable = false)
    private Timestamp date;

    @Column(nullable = false)
    private int availabletickets;

    @Column(nullable = false)
    private int price;

    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }
    public Timestamp getDate(){
        return date;
    }

    public void setDate(Timestamp date){
        this.date = date;
    }

    public int getAvailabletickets(){
        return availabletickets;
    }

    public void setAvailabletickets(int availabletickets){
        this.availabletickets = availabletickets;
    }

    public int getPrice(){
        return price;
    }

    public void setPrice(int price){
        this.price=price;
    }
}
