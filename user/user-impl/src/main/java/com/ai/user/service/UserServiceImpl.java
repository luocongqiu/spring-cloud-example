package com.ai.user.service;

import com.ai.core.exception.BusinessException;
import com.ai.user.repository.UserRepository;
import com.ai.user.web.dto.UserDTO;
import com.ai.user.web.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDTO findById(int id) {
        if (id == 1) {
            throw new BusinessException("用户不存在");
        }
        return UserMapper.INSTANCE.toDTO(userRepository.findById(id));
    }

    @Override
    public List<UserDTO> findAll() {
        return UserMapper.INSTANCE.toDTOs(userRepository.findAll());
    }
}
