package com.ufrgs.inf.tcc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeScreenController {

    @RequestMapping(value = "/")
    public String index(){
        return "index";
    }
    
}
