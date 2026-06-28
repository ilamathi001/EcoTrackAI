package com.ecotrack.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecotrack.entity.Activity;
import com.ecotrack.repository.ActivityRepository;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository repository;

    public Activity saveActivity(Activity activity) {

        if (activity == null) {
            throw new RuntimeException("Activity data is missing");
        }

        if (activity.getUserName() == null || activity.getUserName().trim().isEmpty()) {
            throw new RuntimeException("User Name is required");
        }

        activity.setUserName(activity.getUserName().trim());

        if (activity.getVehicleType() == null || activity.getVehicleType().trim().isEmpty()) {
            activity.setVehicleType("CAR");
        } else {
            activity.setVehicleType(activity.getVehicleType().trim().toUpperCase());
        }

        if (activity.getFoodType() == null || activity.getFoodType().trim().isEmpty()) {
            activity.setFoodType("VEG");
        } else {
            activity.setFoodType(activity.getFoodType().trim().toUpperCase());
        }

        if (activity.getElectricityUnits() == null || activity.getElectricityUnits() < 0) {
            activity.setElectricityUnits(0);
        }

        if (activity.getDistanceTravelled() == null || activity.getDistanceTravelled() < 0) {
            activity.setDistanceTravelled(0.0);
        }

        double electricityEmission = activity.getElectricityUnits() * 0.82;

        double transportFactor;

        switch (activity.getVehicleType()) {
            case "BUS":
                transportFactor = 0.04;
                break;

            case "BIKE":
                transportFactor = 0.02;
                break;

            case "TRAIN":
                transportFactor = 0.03;
                break;

            case "BICYCLE":
            case "WALK":
                transportFactor = 0.0;
                break;

            case "CAR":
            default:
                transportFactor = 0.12;
                break;
        }

        double transportEmission =
                activity.getDistanceTravelled() * transportFactor;

        double foodEmission;

        switch (activity.getFoodType()) {
            case "NONVEG":
                foodEmission = 50;
                break;

            case "VEGAN":
                foodEmission = 10;
                break;

            case "VEG":
            default:
                foodEmission = 20;
                break;
        }

        double totalEmission =
                electricityEmission + transportEmission + foodEmission;

        totalEmission = Math.round(totalEmission * 100.0) / 100.0;

        int score = (int) Math.max(0, Math.min(100, 100 - (totalEmission / 10)));

        activity.setCarbonEmission(totalEmission);
        activity.setCarbonScore(score);

        return repository.save(activity);
    }

    public List<Activity> getHistory(String userName) {

        if (userName == null || userName.trim().isEmpty()) {
            throw new RuntimeException("User Name is required");
        }

        return repository.findByUserName(userName.trim());
    }
}