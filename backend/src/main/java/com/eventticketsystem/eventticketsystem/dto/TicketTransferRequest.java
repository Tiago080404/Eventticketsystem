package com.eventticketsystem.eventticketsystem.dto;

public class TicketTransferRequest {

    private Long ticketId;
    private String newUserEmail;

    public Long getTicketId() {
        return ticketId;
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
