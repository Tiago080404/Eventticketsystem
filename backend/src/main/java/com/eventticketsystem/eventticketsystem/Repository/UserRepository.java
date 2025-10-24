package com.eventticketsystem.eventticketsystem.Repository;

import com.eventticketsystem.eventticketsystem.Entity.User;
import com.eventticketsystem.eventticketsystem.dto.UserDataResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);

    @Query(value = "select users.email,events.* from users join tickets on users.email=tickets.user_email join events on tickets.user_email = users.email where users.email = ?1",nativeQuery = true)
    List<UserDataResponse> getUserData(String user);
}
