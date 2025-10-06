package com.eventticketsystem.eventticketsystem.Repository;

import com.eventticketsystem.eventticketsystem.Entity.Events;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventsRepository extends JpaRepository<Events,String> {
    @Query(value="select * from events where events.name like %?1%",nativeQuery = true)
    List<Events> getEventsBySearch(String input);

    @Query(value = "select * from events where events.availabletickets<100",nativeQuery = true)
    List<Events> getLastChanceEvents();
}
