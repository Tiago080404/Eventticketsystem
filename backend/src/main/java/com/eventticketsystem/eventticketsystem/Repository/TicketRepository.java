package com.eventticketsystem.eventticketsystem.Repository;


import com.eventticketsystem.eventticketsystem.Entity.Tickets;
import com.eventticketsystem.eventticketsystem.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Tickets,Long> {

    List<Tickets> findByUser(User user);

    List<Tickets> findByUserEmail(String email);
}
