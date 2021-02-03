package com.support.ticketing.contracts;

import com.support.ticketing.models.User;
import lombok.Data;

@Data
public class UserRequest {
    private String name;
    private String surname;
    private String password;
    private String username;

    public static User fromUserRequest(UserRequest userRequest){
        return new User(null, userRequest.name, userRequest.surname, userRequest.username, userRequest.password);
    }
}
