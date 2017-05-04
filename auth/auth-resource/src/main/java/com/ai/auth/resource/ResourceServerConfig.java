package com.ai.auth.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.store.redis.RedisTokenStore;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.util.StringUtils;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    private final RedisConnectionFactory connectionFactory;

    @Autowired
    public ResourceServerConfig(RedisConnectionFactory connectionFactory) {
        this.connectionFactory = connectionFactory;
    }

    public void configure(HttpSecurity http) throws Exception {
        http.exceptionHandling()
                .accessDeniedHandler(accessDeniedHandler())
                .authenticationEntryPoint(authenticationEntryPoint())
                .and()
                .requestMatchers().antMatchers("/**")
                .and()
                .authorizeRequests()
                .antMatchers("/demo/**").permitAll()
                .anyRequest().authenticated();
    }

    private AuthenticationEntryPoint authenticationEntryPoint() {
        return (request, response, e) -> {
            response.addHeader("Content-Type", MediaType.APPLICATION_JSON_UTF8_VALUE);
            response.getWriter().append(buildJson("401", "权限校验不通过!", "权限校验不通过!"));
            response.setStatus(401);
        };
    }

    private AccessDeniedHandler accessDeniedHandler() {
        return (request, response, e) -> {
            response.addHeader("Content-Type", MediaType.APPLICATION_JSON_UTF8_VALUE);
            response.getWriter().append(buildJson("403", "权限不够!", "权限不够!"));
            response.setStatus(403);
        };
    }

    private String buildJson(String code, String message, String detail) {
        StringBuilder builder = new StringBuilder();
        builder.append("{");
        if (!StringUtils.isEmpty(code)) {
            builder.append("\"code\"").append(":").append("\"").append(code).append("\"").append(",");
        }
        if (!StringUtils.isEmpty(message)) {
            builder.append("\"message\"").append(":").append("\"").append(message).append("\"").append(",");
        }
        if (!StringUtils.isEmpty(detail)) {
            builder.append("\"detail\"").append(":").append("\"").append(detail).append("\"").append(",");
        }
        builder.deleteCharAt(builder.length() - 1);
        builder.append("}");
        return builder.toString();
    }

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) {
        resources.tokenStore(tokenStore());
    }

    @Bean
    public RedisTokenStore tokenStore() {
        return new RedisTokenStore(this.connectionFactory);
    }

}
