package com.eventticketsystem.eventticketsystem.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;

@Entity
@Table(name="tickettransfer")
public class TransferTicket {

    @Id
    @Column(nullable = false,unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long transferId;

    @ManyToOne
    @JoinColumn(name = "fromuser", nullable = false)
    private User fromUser;

    @ManyToOne
    @JoinColumn(name = "touser")
    private User toUser;

    @Column(name = "transferdate",columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDateTime transferDate;


    @Column(name = "ticketid",nullable = false)
    private Long ticketId;

    //with columndefinition it works should be a enum
    @Column(name = "transferstatus", nullable = false, columnDefinition = "transferstatus")
    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM) // to map to the native PG enum type
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

    public void setTicketId(Long ticketId) {
        this.ticketId = ticketId;
    }

    public Long getTicketId() {
        return ticketId;
    }
}
