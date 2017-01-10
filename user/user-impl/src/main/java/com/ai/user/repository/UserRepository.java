package com.ai.user.repository;

import com.ai.user.domain.User;

import java.util.List;

public interface UserRepository {

    User findById(int id);

    List<User> findAll();

}
