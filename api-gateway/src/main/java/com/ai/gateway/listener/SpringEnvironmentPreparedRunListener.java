package com.ai.gateway.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringApplicationRunListener;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;

import java.util.Arrays;

public class SpringEnvironmentPreparedRunListener implements SpringApplicationRunListener {

    private static Logger log = LoggerFactory.getLogger(SpringEnvironmentPreparedRunListener.class);

    private final SpringApplication application;
    private final String[] args;

    public SpringEnvironmentPreparedRunListener(SpringApplication application, String[] args) {
        this.application = application;
        this.args = args;
    }

    public void starting() {
        log.info("start application[{}], start args[{}]", application.getMainApplicationClass() != null ? application.getMainApplicationClass().getName() : "", Arrays.toString(this.args));
    }

    public void environmentPrepared(ConfigurableEnvironment environment) {
        log.info("prepare environment");
        if (environment.getActiveProfiles().length == 0) {
            log.info("not set active profiles, set default active profiles to {}", "dev,swagger");
            environment.setActiveProfiles("dev", "swagger");
        } else {
            log.info("Running with Spring profile(s) : {}", Arrays.toString(environment.getActiveProfiles()));
        }
    }

    public void contextPrepared(ConfigurableApplicationContext context) {
        log.info("prepare context");
    }

    public void contextLoaded(ConfigurableApplicationContext context) {
        log.info("loaded context");
    }

    public void finished(ConfigurableApplicationContext context, Throwable exception) {
        log.info("context started");
    }
}
