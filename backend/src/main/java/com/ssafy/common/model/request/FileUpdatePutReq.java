package com.ssafy.common.model.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserUpdatePutRequest")
public class FileUpdatePutReq {
    @ApiModelProperty(name = "file description", example = "...")
    String fileDescription;
}
