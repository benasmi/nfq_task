package com.support.ticketing.contracts;

import com.support.ticketing.models.User;
import lombok.Data;

@Data
public class UserResponse {
    private String name;
    private String surname;
    private boolean isAdmin;

    public UserResponse(String name, String surname, boolean isAdmin) {
        this.name = name;
        this.surname = surname;
        this.isAdmin = isAdmin;
    }

    public static UserResponse fromUser(User user){
        return new UserResponse(user.getName(), user.getSurname(), user.isAdmin());
    }
}
