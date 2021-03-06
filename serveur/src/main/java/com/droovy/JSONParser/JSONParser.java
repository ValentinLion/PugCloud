package com.droovy.JSONParser;

import java.io.IOException;
import java.text.ParseException;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import com.droovy.request.File;
import com.droovy.request.Permission;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;


public interface JSONParser {

	public List<File> parserFiles(String result) throws JsonProcessingException, IOException, ParseException;
	public File parserFile(JsonNode file) throws JsonProcessingException, IOException, ParseException;
	public List<File> parserFilesSearch(String output) throws JsonProcessingException, IOException, ParseException;
	public List<Permission> parserPermission(String string) throws JsonProcessingException, IOException, ParseException;
}
