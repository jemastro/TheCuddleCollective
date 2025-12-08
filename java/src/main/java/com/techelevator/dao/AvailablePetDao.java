package com.techelevator.dao;

import com.techelevator.model.AvailablePet;

import java.util.List;

public interface AvailablePetDao {

    List<AvailablePet> getAvailablePetsByBreed(String breed);

    List<AvailablePet> getAvailablePetsByColor(String Color);

    List<AvailablePet> getAvailablePetsByAge(Integer age);

    AvailablePet addPet(AvailablePet pet);

    void updatePet(AvailablePet pet);

    List<AvailablePet> getAllPets();

    List<AvailablePet> getAvailablePetByAdoptionStatus(String adoptionStatus);

    List<AvailablePet> getAvailablePetByType(String type);
}
