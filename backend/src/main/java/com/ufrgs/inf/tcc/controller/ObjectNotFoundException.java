package com.ufrgs.inf.tcc.controller;

public class ObjectNotFoundException extends Exception {

    private static final long serialVersionUID = 457293438457771684L;
    private Class<?> objectType;
	private Object id;

	public ObjectNotFoundException(Class<?> objectType, Object id) {
		this.objectType = objectType;
		this.id = id;
	}

	@Override
	public String getMessage() {
		return String.format("Object of type %s with id %s not found", objectType.getCanonicalName(), id);
	}
}
