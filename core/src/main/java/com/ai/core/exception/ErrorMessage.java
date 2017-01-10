package com.ai.core.exception;

import lombok.*;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class ErrorMessage {

    @NonNull
    private String code;

    @NonNull
    private String message;

    private String detail;


}
