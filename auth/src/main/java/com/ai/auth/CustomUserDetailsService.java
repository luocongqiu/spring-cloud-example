package com.ai.auth;

import com.ai.auth.util.RequestUtil;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


@Component("customUserDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String login) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        String password = RequestUtil.getCurrentRequest().getParameter("password");
        return new User(login, password, authorities);
    }
}
