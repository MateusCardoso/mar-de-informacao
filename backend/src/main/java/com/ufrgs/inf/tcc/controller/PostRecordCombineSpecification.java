package com.ufrgs.inf.tcc.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.ufrgs.inf.tcc.model.PostRecord;

import org.springframework.data.jpa.domain.Specification;

public class PostRecordCombineSpecification {

    private final List<SearchCondition> conditions;

    public PostRecordCombineSpecification() {
        conditions = new ArrayList<SearchCondition>();
    }

    public PostRecordCombineSpecification with(String fieldName, String operator, Object fieldValue) {
        conditions.add(new SearchCondition(fieldName, operator, fieldValue));
        return this;
    }

    public Specification<PostRecord> combine() {
        if (conditions.size() == 0) {
            return null;
        }

        List<Specification<PostRecord>> specs = conditions.stream()
          .map(PostRecordSpecification::new)
          .collect(Collectors.toList());
        
        Specification<PostRecord> result = specs.get(0);

        for (int i = 1; i < conditions.size(); i++) {
            result = Specification.where(result)
                  .and(specs.get(i));
        }
        
        return result;
    } 
    
}
