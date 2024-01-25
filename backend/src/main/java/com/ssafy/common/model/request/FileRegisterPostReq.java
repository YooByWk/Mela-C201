package com.ssafy.common.model.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
public class FileRegisterPostReq {
//    @ApiModelProperty(name = "", example = "")
//    String saveFolder;

    @ApiModelProperty(name = "원본 파일명", example = "")
    String originalFolder;

//    @ApiModelProperty(name = "", example = "")
//    String saveFile;

    @ApiModelProperty(name = "", example = "")
    String fileDescription;
}
