package com.eventticketsystem.eventticketsystem.Repository;

import com.eventticketsystem.eventticketsystem.Entity.Events;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventsRepository extends JpaRepository<Events,String> {
}
