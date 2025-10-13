package com.eventticketsystem.eventticketsystem.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="tickettransfer")
public class TransferTicket {

    @Id
    @Column(nullable = false,unique = true)
    private long transferId;

    @ManyToOne
    @JoinColumn(name = "fromUser", nullable = false)
    private User fromUser;

    @ManyToOne
    @JoinColumn(name = "toUser")
    private User toUser;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDateTime transferDate;

    @Column(nullable = false)
    private TransferStatus transferStatus;

    public long getTransferId() {
        return transferId;
    }
    public TransferStatus getTransferStatus() {
        return transferStatus;
    }
    public LocalDateTime getTransferDate() {
        return transferDate;
    }
    public User getFromUser() {
        return fromUser;
    }
    public User getToUser() {
        return toUser;
    }
    public void setFromUser(User fromUser) {
        this.fromUser = fromUser;
    }
    public void setTransferDate(LocalDateTime transferDate) {
        this.transferDate = transferDate;
    }
    public void setTransferId(int transferId) {
        this.transferId = transferId;
    }
    public void setTransferStatus(TransferStatus transferStatus) {
        this.transferStatus = transferStatus;
    }
    public void setToUser(User toUser) {
        this.toUser = toUser;
    }
}
