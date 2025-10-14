package com.eventticketsystem.eventticketsystem.dto;

public class TicketTransferRequest {

    private Long ticketId;
    private String newUserEmail;
    private String oldUserEmail;

    public Long getTicketId() {
        return ticketId;
    }

    public String getOldUserEmail(){
        return oldUserEmail;
    }

    public void setOldUserEmail(String oldUserEmail){
        this.oldUserEmail = oldUserEmail;
    }

    public String getNewUserEmail() {
        return newUserEmail;
    }

    public void setTicketId(Long ticketId) {
        this.ticketId = ticketId;
    }

    public void setNewUserEmail(String newUserEmail) {
        this.newUserEmail = newUserEmail;
    }
}
