package com.ai.user.web.rest;

import com.ai.user.web.dto.UserDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping("/users")
public interface UserResource {

    @GetMapping("/{id}")
    UserDTO findById(@PathVariable("id") Integer id);

    @RequestMapping("")
    List<UserDTO> findAll();

}
