package com.support.ticketing.services;

import com.auth0.jwt.JWT;
import com.support.ticketing.contracts.UserRequest;
import com.support.ticketing.contracts.UserResponse;
import com.support.ticketing.models.User;
import com.support.ticketing.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.nio.file.attribute.UserPrincipal;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

@Service
public class UserService {

    @Value("${jwt.auth.bearer.secret}")
    private String secretKey;

    @Value("${jwt.auth.bearer.expiration-time}")
    private String expirationTime;

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;

    public UserService(UserRepository userRepository, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
    }

    public void registerUser(UserRequest userRequest){
        userRepository.save(UserRequest.fromUserRequest(userRequest));
    }

    public String loginUser(UserRequest userRequest){
        Authentication auth = authenticate(userRequest.getUsername(), userRequest.getPassword());

        String token = JWT.create()
                .withSubject(((org.springframework.security.core.userdetails.User) auth.getPrincipal()).getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + Long.parseLong(expirationTime)))
                .sign(HMAC512(secretKey.getBytes()));

        return token;
    }

    public Authentication authenticate(String username, String password){
        try{
            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    username,
                    password,
                    new ArrayList<>()
            ));
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public UserResponse getCurrentUserProfile(){
        User user = getCurrentUser();
        return UserResponse.fromUser(user);
    }

    public User getCurrentUser(){
        String currentUsername = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(currentUsername);
        if(user == null){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User was not found!");
        }

        return user;
    }

    public List<User> getAvailableWorkers() {
        return userRepository.findAllWorkingUsers();
    }

}
