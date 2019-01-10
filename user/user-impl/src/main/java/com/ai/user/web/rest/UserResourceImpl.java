package com.ai.user.web.rest;

import com.ai.user.service.UserService;
import com.ai.user.web.dto.UserDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RefreshScope
public class UserResourceImpl implements UserResource {

    @Value("${test.fresh:1}")
    private String config;

    private final UserService userService;

    @Autowired
    public UserResourceImpl(UserService userService) {
        this.userService = userService;
    }

    public UserDTO findById(@PathVariable("id") int id) {
        log.info("查询用户");
        return userService.findById(id);
    }

    public List<UserDTO> findAll() {
        return userService.findAll();
    }

    @Override
    public List<UserDTO> save(@RequestBody(required = false) List<UserDTO> users) {
        return users;
    }

    @Override
    public String config() {
        return this.config;
    }
}
