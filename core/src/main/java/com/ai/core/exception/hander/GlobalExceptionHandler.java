package com.ai.core.exception.hander;

import com.ai.core.exception.BusinessException;
import com.ai.core.exception.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@ControllerAdvice(annotations = RestController.class)
@RestController
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(BusinessException.class)
    public ErrorMessage handleBusinessValidationException(BusinessException e) {
        return new ErrorMessage(e.getCode(), e.getMessage(), e.toString());
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Throwable.class)
    public ErrorMessage handleException(Throwable t) {
        return new ErrorMessage(String.valueOf(HttpStatus.INTERNAL_SERVER_ERROR.value()), t.getMessage(), t.toString());
    }

}