package com.ai.user.web.rest;

import com.ai.user.service.UserService;
import com.ai.user.web.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserResourceImpl implements UserResource {

    private final UserService userService;

    @Autowired
    public UserResourceImpl(UserService userService) {
        this.userService = userService;
    }

    public UserDTO findById(@PathVariable("id") int id) {
        return userService.findById(id);
    }

    public List<UserDTO> findAll() {
        return userService.findAll();
    }
}
