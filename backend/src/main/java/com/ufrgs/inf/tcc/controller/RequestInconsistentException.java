package com.ufrgs.inf.tcc.controller;

public class RequestInconsistentException extends Exception {

    private static final long serialVersionUID = -8799022868815320239L;

    public RequestInconsistentException(String message) {
		super(message);
	}
}
