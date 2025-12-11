package com.techelevator.controller;

import com.techelevator.model.AvailablePet;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;

import java.util.ArrayList;
import java.util.List;

public class ToBeAdded
{
    // Celebrate Adopted Pets
        //Interface Code
    // List<AvailablePet> getAllAdoptedPets();
        //Jdbc Code

//    List<AvailablePet> getAllAdoptedPets(){
//        List<AvailablePet> adoptedPets = new ArrayList<>();
//        String sql = "SELECT animal_id, animal_type, breed, color, age, " +
//                "name, image_url, image_url1, image_url2 FROM available_pets where adoption_status = 'approved'";
//        SqlRowSet result = jdbcTemplate.queryForRowSet(sql);
//        while(result.next()){
//            AvailablePet pet = mapRowToAvailablePet(result);
//            adoptedPets.add(pet);
//        }
//        return adoptedPets;
//    }

    // Add to a side nav?  Will eventually need to shift the grid to make it fit somehow.  Talk to Sarah
    // about the design choices. Limit the adopted pets shown to the last 3 pets? Food for thought.
    // Vertical side nav saying (Our Recent Fur-ever Home Finders) with the animal cards.


    // Multiple Photos Per Pet
    // This might change later depending on if we use the PetCard in React that Sarah built.
    // Assuming we use the same card then the steps are as follows:
    // 1) Display the PetCard normally as it is currently built.
    // 2) Check to see if there is more than one image attached to the Pet (img_url1)
    // 3) If there are, display the first and second images, otherwise just the one.
    // 4) If there's two images,Check to see if there are more than two images attached to the Pet (img_url2).
    // 5) If there are, display all images, otherwise just the two.

/*
React code for displaying multiple images
import React from 'react';

const ProfileGallery = ({ images }) => {
  return (
    <div className="profile-images-container">
      {images.map((imageUrl, index) => (
        <img
          key={index} // A unique ID is better, but index works if no stable ID exists
          src={imageUrl}
          alt={`Profile image ${index + 1}`}
          className="profile-thumbnail"
        />
      ))}
    </div>
  );
};

export default ProfileGallery;
 */
}
