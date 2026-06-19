package com.ecotrack.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "activity")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName;
    private Integer electricityUnits;
    private String vehicleType;
    private Double distanceTravelled;
    private String foodType;
    private Double carbonEmission;
    private Integer carbonScore;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getElectricityUnits() {
        return electricityUnits;
    }

    public void setElectricityUnits(Integer electricityUnits) {
        this.electricityUnits = electricityUnits;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public Double getDistanceTravelled() {
        return distanceTravelled;
    }

    public void setDistanceTravelled(Double distanceTravelled) {
        this.distanceTravelled = distanceTravelled;
    }

    public String getFoodType() {
        return foodType;
    }

    public void setFoodType(String foodType) {
        this.foodType = foodType;
    }

    public Double getCarbonEmission() {
        return carbonEmission;
    }

    public void setCarbonEmission(Double carbonEmission) {
        this.carbonEmission = carbonEmission;
    }

    public Integer getCarbonScore() {
        return carbonScore;
    }

    public void setCarbonScore(Integer carbonScore) {
        this.carbonScore = carbonScore;
    }
}