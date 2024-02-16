package com.ssafy.api.user.controller;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Bean;

@Getter
@Setter
@ApiModel("TestPostRequest")
public class Test {
    @ApiModelProperty(name = "Test", example = "Mela!")
    String a;
    @ApiModelProperty(name = "Test", example = "Mela!")
    String b;
}
