package com.ssafy.common.util;

public class ExtensionUtil {
    public static String[] SUPPORTED_IMAGE_EXTENSIONS = {"png", "jpg", "jpeg"};
    public static String[] SUPPORTED_VIDEO_EXTENSIONS = {"mkv", "mp4", "avi"};
    public static String[] SUPPORTED_AUDIO_EXTENSIONS = {"mp3", "flac", "wav"};

    public static boolean isValidImageExtension(String extension) {
        for(String s : SUPPORTED_IMAGE_EXTENSIONS) {
            if(extension.equals(s.toUpperCase()) || extension.equals(s.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

    public static boolean isValidVideoExtension(String extension) {
        for(String s : SUPPORTED_VIDEO_EXTENSIONS) {
            if(extension.equals(s.toUpperCase()) || extension.equals(s.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

    public static boolean isValidAudioExtension(String extension) {
        for(String s : SUPPORTED_AUDIO_EXTENSIONS) {
            if(extension.equals(s.toUpperCase()) || extension.equals(s.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

}
