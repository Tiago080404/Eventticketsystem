package com.eventticketsystem.eventticketsystem.Repository;


import com.eventticketsystem.eventticketsystem.Entity.TransferTicket;
import com.eventticketsystem.eventticketsystem.dto.TransferNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TicketTransferRepository extends JpaRepository<TransferTicket, Long> {
//query noch anpassen nur die ich brauche
    @Query(value = "select tickettransfer.touser,tickettransfer.fromuser,tickets.quantity,tickettransfer.transfer_id from tickets join tickettransfer on tickets.ticket_id = tickettransfer.ticketid where tickettransfer.touser = ?1 and tickettransfer.transferstatus='Pending'",nativeQuery = true)
    List<TransferNotification> getTransferNotifications(String email);
}
