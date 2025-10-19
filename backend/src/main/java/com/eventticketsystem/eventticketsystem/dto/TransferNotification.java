package com.eventticketsystem.eventticketsystem.dto;

public class TransferNotification {
    private String toUser;
    private String fromUser;
    private int quantity;
    private int transfer_id;
    //private String ticketUUID

    public TransferNotification(String toUser,String fromUser,int quantity,int transfer_id){
        this.fromUser = fromUser;
        this.quantity=quantity;
        this.toUser = toUser;
        this.transfer_id = transfer_id;
    }

    public void setTransfer_id(int transfer_id) {
        this.transfer_id = transfer_id;
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

    public int getTransfer_id() {
        return transfer_id;
    }

    public String getToUser() {
        return toUser;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
