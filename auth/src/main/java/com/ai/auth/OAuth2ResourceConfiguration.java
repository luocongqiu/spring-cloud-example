package com.ai.auth;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler;
import org.springframework.security.oauth2.provider.error.OAuth2AuthenticationEntryPoint;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;

@Configuration
public class OAuth2ResourceConfiguration {

    @Configuration
    @EnableResourceServer
    @Profile("prod")
    protected static class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {

        private final TokenStore tokenStore;
        private final AccessDeniedHandler accessDeniedHandler = new OAuth2AccessDeniedHandler();
        private final AuthenticationEntryPoint authenticationEntryPoint = new OAuth2AuthenticationEntryPoint();

        public ResourceServerConfiguration(TokenStore tokenStore) {
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

        private final TokenStore tokenStore;

        public ResourceServerDevConfiguration(TokenStore tokenStore) {
            this.tokenStore = tokenStore;
        }

        public void configure(HttpSecurity http) throws Exception {
            http.authorizeRequests().antMatchers("/**").authenticated();
        }


        @Override
        public void configure(ResourceServerSecurityConfigurer resources) {
            resources.tokenStore(tokenStore);
        }
    }
}
