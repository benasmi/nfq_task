package com.support.ticketing.services;

import com.auth0.jwt.JWT;
import com.support.ticketing.contracts.UserRequest;
import com.support.ticketing.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

@Service
public class UserService {
    public static final long EXPIRATION_TIME = 864_000_000; // 10 days
    public static final String SECRET = "SecretKeyToGenJWTs";

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
                .withSubject(((User) auth.getPrincipal()).getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(HMAC512(SECRET.getBytes()));

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
}
