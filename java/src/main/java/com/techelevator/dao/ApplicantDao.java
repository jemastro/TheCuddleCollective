package com.techelevator.dao;

import com.techelevator.model.Applicant;
import com.techelevator.model.ShelterApplication;

public interface ApplicantDao {

    ShelterApplication submitApplication(Applicant applicant);
}
