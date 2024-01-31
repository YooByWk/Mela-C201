package com.ssafy.common.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

public class DateUtil {
    Date date; // your date
    static DateUtil dateUtil;
    Calendar cal;

    Date today;

    public DateUtil() {}

    public static DateUtil getInstance() {
        return new DateUtil();
    }

    public int getYear() {
        cal = Calendar.getInstance(TimeZone.getTimeZone("Asia/Seoul"));

        return cal.get(Calendar.YEAR);
    }

    public int getMonth() {
        cal = Calendar.getInstance(TimeZone.getTimeZone("Asia/Seoul"));

        //Beware, months start at 0, not 1.
        return cal.get(Calendar.MONTH) + 1;
    }

    public int getDay() {
        cal = Calendar.getInstance(TimeZone.getTimeZone("Asia/Seoul"));

        return cal.get(Calendar.DAY_OF_MONTH);
    }

    public String getDate() {
        // 현재 날짜를 가져오기
        today = new Date();

        // SimpleDateFormat을 사용하여 원하는 형식으로 날짜를 포맷
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        String formattedDate = dateFormat.format(today);

        return formattedDate;
    }
}
