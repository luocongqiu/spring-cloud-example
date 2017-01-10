package com.ai.user.client;

import com.ai.user.web.rest.UserResource;
import org.springframework.cloud.netflix.feign.FeignClient;

@FeignClient("user")
public interface UserClient extends UserResource {

}
