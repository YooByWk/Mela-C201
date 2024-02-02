package com.ssafy.api.file.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class FilePostReq {
  private long fileIdx;
  String saveFolder;
  String originalFolder;
  String saveFile;
  String fileDescription;
}