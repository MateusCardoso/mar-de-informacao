package com.ufrgs.inf.tcc.controller;

import com.ufrgs.inf.tcc.model.PostRecord;

import org.springframework.data.jpa.domain.Specification;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import java.sql.Date;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;

public class PostRecordSpecification implements Specification<PostRecord>{

    private SearchCondition condition;

    public PostRecordSpecification(SearchCondition condition) {
        this.condition = condition;
    }

    @Override
    public Predicate toPredicate
      (Root<PostRecord> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
       
        if(condition.getFieldName() == "tagId"){
            return builder.equal(
                root.joinList("tags").get(condition.getFieldName()), condition.getFieldValue()
            );
        }
        else if (condition.getOperator().equalsIgnoreCase("GE")) {
            if(condition.getFieldName() == "publicationDate"){
                return builder.greaterThanOrEqualTo(
                  root.<Date>get(condition.getFieldName()), Date.valueOf(condition.getFieldValue().toString()));
            }else{
                return builder.greaterThanOrEqualTo(
                  root.get(condition.getFieldName()), condition.getFieldValue().toString());
            }
        } 
        else if (condition.getOperator().equalsIgnoreCase("LE")) {
            if(condition.getFieldName() == "publicationDate"){
                return builder.lessThanOrEqualTo(
                  root.<Date>get(condition.getFieldName()), Date.valueOf(condition.getFieldValue().toString()));
            }else{
                return builder.lessThanOrEqualTo(
                  root.get(condition.getFieldName()), condition.getFieldValue().toString());
            }
        } 
        else if (condition.getOperator().equalsIgnoreCase("EQ")) {
            return builder.equal(
                root.get(condition.getFieldName()), condition.getFieldValue());

        } else if (condition.getOperator().equalsIgnoreCase("LK")){
            return builder.like(
                  root.<String>get(condition.getFieldName()), "%" + condition.getFieldValue() + "%");
        }
        return null;
    }
    
}
