package com.support.ticketing.contracts;


import com.support.ticketing.models.User;
import lombok.Data;

@Data
public class UserSpecialistResponse {

    private String surname;
    private String name;
    private Long userId;

    public UserSpecialistResponse(String surname, String name, Long userId) {
        this.surname = surname;
        this.name = name;
        this.userId = userId;
    }

    public static UserSpecialistResponse fromUser(User user){
        return new UserSpecialistResponse(user.getSurname(), user.getName(), user.getId());
    }
}
