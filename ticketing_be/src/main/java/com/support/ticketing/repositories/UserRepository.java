package com.support.ticketing.repositories;

import com.support.ticketing.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String name);

    @Query(value="select u from User u where u.isWorking=TRUE ")
    List<User> findAllWorkingUsers();
}
