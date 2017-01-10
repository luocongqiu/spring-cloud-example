package com.ai.user.web.mapper;

import com.ai.user.domain.User;
import com.ai.user.web.dto.UserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper()
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mappings({
            @Mapping(source = "userName", target = "staffName"),
            @Mapping(source = "startTime", target = "startTime", dateFormat = "yyyy-MM-dd HH:mm:ss"),
            @Mapping(source = "expireTime", target = "expireTime", dateFormat = "yyyy-MM-dd HH:mm:ss")
    })
    UserDTO toDTO(User user);

    List<UserDTO> toDTOs(List<User> users);

}
