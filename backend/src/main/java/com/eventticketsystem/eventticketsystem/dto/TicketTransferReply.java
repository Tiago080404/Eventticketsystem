package com.eventticketsystem.eventticketsystem.dto;

import com.eventticketsystem.eventticketsystem.Entity.TransferStatus;

public class TicketTransferReply {
    private TransferStatus statusChange;
    private Long transferId;

    public void setTransferId(Long transferId) {
        this.transferId = transferId;
    }

    public Long getTransferId() {
        return transferId;
    }

    public TransferStatus getStatusChange() {
        return statusChange;
    }

    public void setStatusChange(TransferStatus statusChange) {
        this.statusChange = statusChange;
    }
}
