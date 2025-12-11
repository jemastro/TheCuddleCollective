package com.techelevator.dao;

import com.techelevator.Application;
import com.techelevator.model.ShelterApplication;

import java.util.List;

public interface ShelterApplicationDao {
    ShelterApplication findById(int applicationId);

    List<ShelterApplication> findAllPending();

    void delete(int applicationId);

    void save(ShelterApplication app);

}
