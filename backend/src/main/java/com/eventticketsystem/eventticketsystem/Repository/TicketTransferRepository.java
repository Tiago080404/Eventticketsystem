package com.eventticketsystem.eventticketsystem.Repository;


import com.eventticketsystem.eventticketsystem.Entity.TransferTicket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketTransferRepository extends JpaRepository<TransferTicket, Long> {
}
