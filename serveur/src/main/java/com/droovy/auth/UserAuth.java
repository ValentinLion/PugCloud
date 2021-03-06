package com.droovy.auth;


import java.io.File;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;

import com.droovy.DatabaseOp;


@Path("user")
public class UserAuth {


	@GET
	@Produces("text/plain")
	@Path("/create")
	public String userCreate(@Context UriInfo uriInfo,@QueryParam("password") String password,@QueryParam("name") String name) {

		boolean creationSuccess = true;

		DatabaseOp db = new DatabaseOp();

		if(password.length()<3 || name.length()<3){
			return "{\"reason\" : \"too short\","
					+ "\"success\" : \"false\"}";
		}
		
		
		if(db.checkIfUserExist(name)) {
			return "{\"reason\" : \"alreadyExist\","
					+ "\"success\" : \"false\"}";
		}

		int idClient = db.createUser(name, password);

		if(idClient == -1) {
			creationSuccess = false;
		}

		if(creationSuccess) {
			return "{\"id\" : \""+idClient+"\","
					+ "\"success\" : \"true\"}";
		}
		else {
			return "{\"id\" : \"-1\","
					+ "\"success\" : \"false\"}";
		}
	}



	@GET
	@Produces("text/plain")
	@Path("/auth")
	public String userAuth(@Context UriInfo uriInfo,@QueryParam("password") String password,@QueryParam("name") String name) {


		boolean connexionSuccess = true;

		DatabaseOp db = new DatabaseOp();

		int idClient = db.authUser(name, password);

		if(idClient == -1) {
			connexionSuccess = false;
		}

		if(connexionSuccess) {
			return "{\"id\" : \""+idClient+"\","
					+ "\"success\" : \"true\"}";
		}
		else {
			return "{\"id\" : \"-1\","
					+ "\"success\" : \"false\"}";
		}
	}


}
