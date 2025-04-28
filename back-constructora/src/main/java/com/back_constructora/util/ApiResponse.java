package com.back_constructora.util;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ApiResponse<T> 
{
    private String message;
    private T data;
}