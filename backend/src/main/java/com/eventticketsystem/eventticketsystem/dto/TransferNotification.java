package com.eventticketsystem.eventticketsystem.dto;

public class TransferNotification {
    private String toUser;
    private String fromUser;
    private int quantity;
    private int ticketId;
    //private String ticketUUID

    public TransferNotification(String toUser,String fromUser,int quantity,int ticketId){
        this.fromUser = fromUser;
        this.quantity=quantity;
        this.toUser = toUser;
        this.ticketId = ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    public void setFromUser(String fromUser) {
        this.fromUser = fromUser;
    }

    public void setToUser(String toUser) {
        this.toUser = toUser;
    }

    public int getQuantity() {
        return quantity;
    }

    public String getFromUser() {
        return fromUser;
    }

    public int getTicketId() {
        return ticketId;
    }

    public String getToUser() {
        return toUser;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
