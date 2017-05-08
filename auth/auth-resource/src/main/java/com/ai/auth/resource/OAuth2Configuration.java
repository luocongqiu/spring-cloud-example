package com.ai.auth.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler;
import org.springframework.security.oauth2.provider.error.OAuth2AuthenticationEntryPoint;
import org.springframework.security.oauth2.provider.token.store.redis.RedisTokenStore;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;

import java.util.UUID;

@Configuration
@EnableResourceServer
public class OAuth2Configuration extends ResourceServerConfigurerAdapter {

    @Bean
    public RedisTokenStore tokenStore(RedisConnectionFactory connectionFactory) {
        return new RedisTokenStore(connectionFactory);
    }

    @Configuration
    @EnableResourceServer
    @Profile("prod")
    protected static class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {

        private final RedisTokenStore tokenStore;
        private final AccessDeniedHandler accessDeniedHandler = new OAuth2AccessDeniedHandler();
        private final AuthenticationEntryPoint authenticationEntryPoint = new OAuth2AuthenticationEntryPoint();

        @Autowired
        public ResourceServerConfiguration(RedisTokenStore tokenStore) {
            this.tokenStore = tokenStore;
        }

        public void configure(HttpSecurity http) throws Exception {
            http.exceptionHandling()
                    .accessDeniedHandler(accessDeniedHandler)
                    .authenticationEntryPoint(authenticationEntryPoint)
                    .and()
                    .requestMatchers().antMatchers("/**")
                    .and()
                    .authorizeRequests()
                    .anyRequest().authenticated();
        }

        @Override
        public void configure(ResourceServerSecurityConfigurer resources) {
            resources.tokenStore(tokenStore);
        }
    }

    @Configuration
    @EnableResourceServer
    @Profile("dev")
    protected static class ResourceServerDevConfiguration extends ResourceServerConfigurerAdapter {

        private final RedisTokenStore tokenStore;

        @Autowired
        public ResourceServerDevConfiguration(RedisTokenStore tokenStore) {
            this.tokenStore = tokenStore;
        }

        public void configure(HttpSecurity http) throws Exception {
            http
                    .requestMatchers().antMatchers(UUID.randomUUID().toString())
                    .and()
                    .authorizeRequests()
                    .anyRequest().permitAll();
        }


        @Override
        public void configure(ResourceServerSecurityConfigurer resources) {
            resources.tokenStore(tokenStore);
        }
    }
}
