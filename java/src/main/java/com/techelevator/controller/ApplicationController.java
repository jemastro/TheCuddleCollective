package com.techelevator.controller;

import com.techelevator.model.Applicant;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

public class ApplicationController {

    @PostMapping("/submit")
    public void submitApplication(@RequestParam String firstName, @RequestParam String lastName, @RequestParam String email){

        Applicant applicant = new Applicant(firstName, lastName, email);

    }

}
