package com.ufrgs.inf.tcc.controller;

public class SearchCondition {

    private String fieldName;
    private String operator;
    private Object fieldValue;
    
    public SearchCondition(String fieldName, String operator, Object fieldValue) {
        this.fieldName = fieldName;
        this.operator = operator;
        this.fieldValue = fieldValue;
    }
    
    public String getFieldName() {
        return fieldName;
    }
    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }
    public String getOperator() {
        return operator;
    }
    public void setOperator(String operator) {
        this.operator = operator;
    }
    public Object getFieldValue() {
        return fieldValue;
    }
    public void setFieldValue(Object fieldValue) {
        this.fieldValue = fieldValue;
    }
    
}
