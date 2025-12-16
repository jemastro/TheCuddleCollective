package com.techelevator.controller;

import com.techelevator.dao.VolunteerDao;
import com.techelevator.model.ShelterVolunteer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@PreAuthorize("isAuthenticated()")
public class VolunteerController {

    private final VolunteerDao volunteerDao;

    @Autowired
    public VolunteerController(VolunteerDao volunteerDao){
        this.volunteerDao = volunteerDao;
    }

    @GetMapping("/volunteer/directory")
    @PreAuthorize("isAuthenticated()")
    public List<ShelterVolunteer> listAllVolunteers(){
        return volunteerDao.getAllVolunteers();
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/volunteers")
    public ShelterVolunteer addVolunteer(@RequestBody ShelterVolunteer v) {
        return volunteerDao.createVolunteer(v);
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/volunteers/{id}")
    public void deleteVolunteer(@PathVariable int id) {
        volunteerDao.deleteVolunteer(id);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/volunteers/{id}")
    public ShelterVolunteer updateVolunteer(@PathVariable String id, @RequestBody ShelterVolunteer volunteer) {
        volunteer.setVolunteerId(id);
        return volunteerDao.update(volunteer);
    }
}
