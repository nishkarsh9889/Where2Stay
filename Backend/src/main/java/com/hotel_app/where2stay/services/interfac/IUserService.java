package com.hotel_app.where2stay.services.interfac;

import com.hotel_app.where2stay.dto.LoginRequest;
import com.hotel_app.where2stay.dto.Response;
import com.hotel_app.where2stay.entity.User;

public interface IUserService {
    Response register(User user);

    Response login(LoginRequest loginRequest);

    Response getAllUsers();

    Response getUserBookingHistory(String userId);

    Response deleteUser(String userId);

    Response getUserById(String userId);

    Response getMyInfo(String email);
}
