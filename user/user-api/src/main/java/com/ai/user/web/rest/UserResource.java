package com.ai.user.web.rest;

import com.ai.user.web.dto.UserDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/users")
public interface UserResource {

    @GetMapping("/{id:\\d+}")
    UserDTO findById(@PathVariable int id);

    @RequestMapping("")
    List<UserDTO> findAll();

    @RequestMapping(method = RequestMethod.POST)
    List<UserDTO> save(@RequestBody(required = false) List<UserDTO> users);

    @RequestMapping("/config")
    String config();

}
