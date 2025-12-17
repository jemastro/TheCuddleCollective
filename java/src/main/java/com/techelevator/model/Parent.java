package com.techelevator.model;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;

public class Parent {

private long parentId;
    @NotBlank
    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    @NotBlank
    private String lastName;

    @NotBlank
    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "street_number")
    @NotBlank
    private int streetNumber;

    @NotBlank
    @Column(name = "street_name")
    private String streetName;

    @NotBlank
    @Column(name = "city_name")
    private String cityName;

    @Column(name = "state_abbreviation")
    @NotBlank
    private String stateAbbreviation;

    public Parent(){

    };

    public Parent(long parentId, String firstName, String lastName,
                  String phoneNumber, int streetNumber, String streetName,
                  String cityName, String stateAbbreviation) {
        this.parentId = parentId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.streetNumber = streetNumber;
        this.streetName = streetName;
        this.cityName = cityName;
        this.stateAbbreviation = stateAbbreviation;
    }

    public void setParentId(long parentId) {
        this.parentId = parentId;
    }

    public long getParentId() {
        return parentId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public int getStreetNumber() {
        return streetNumber;
    }

    public void setStreetNumber(int streetNumber) {
        this.streetNumber = streetNumber;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getStateAbbreviation() {
        return stateAbbreviation;
    }

    public void setStateAbbreviation(String stateAbbreviation) {
        this.stateAbbreviation = stateAbbreviation;
    }
}
