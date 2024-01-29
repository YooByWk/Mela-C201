package com.ssafy.common.util;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.TreeMap;


public class CSVParser {
    private TreeMap<Integer, String> words = new TreeMap<Integer, String>();
    public CSVParser(String filename) {
        loadData(filename);
    }

    private void loadData(String filename) {
        String filePath = "resources/" + filename + ".csv";
        String line;
        int i = 0;

        try(BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(filePath)))) {
            while((line = br.readLine()) != null) {
                words.put(i++, line);
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    public TreeMap<Integer, String> getAllWords() {
        return words;
    }

    public int getSize() {
        return words.size();
    }

    public String getWord(int randomIndex) {
        return words.get(randomIndex);
    }

}
