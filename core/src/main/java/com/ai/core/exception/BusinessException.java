package com.ai.core.exception;

import org.springframework.http.HttpStatus;

public class BusinessException extends RuntimeException {

    private String code;
    private String message;

    public BusinessException(String message) {
        super(message);
        setMessage(message);
        setCode(String.valueOf(HttpStatus.INTERNAL_SERVER_ERROR.value()));
    }

    public BusinessException(String code, String message) {
        this(message);
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
