package com.eventticketsystem.eventticketsystem.dto;

public class BuyTicketRequest {

    private String user;
    private int amount;
    private int moneypaid;

    public int getAmount(){
        return amount;
    }

    public void setAmount(int amount){
        this.amount = amount;
    }

    public String getUser(){
        return user;
    }

    public void setUser(String user){
        this.user=user;
    }

    public int getMoneypaid(){
        return moneypaid;
    }

    public void setMoneypaid(int moneypaid){
        this.moneypaid = moneypaid;
    }
}
