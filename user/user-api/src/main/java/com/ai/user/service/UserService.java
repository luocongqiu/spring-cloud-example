package com.ai.user.service;

import com.ai.user.web.dto.UserDTO;

import java.util.List;

public interface UserService {

    UserDTO findById(int id);

    List<UserDTO> findAll();
}
