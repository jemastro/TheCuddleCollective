package com.techelevator.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "parent")
@Data
public class PetParent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "parent_id")
    private Long parentId;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "street_number", nullable = false)
    private Integer streetNumber;

    @Column(name = "street_name", nullable = false)
    private String streetName;

    @Column(name = "city_name", nullable = false)
    private String cityName;

    @Column(name = "state_abbreviation", nullable = false, length = 2)
    private String stateAbbreviation;

    @Column(name= "pet_name", nullable = false)
    private String petName;

    @Column(name="image_url", nullable = false)
    private String imageUrl;
}
