package com.ecotrack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecotrack.entity.Activity;
import com.ecotrack.repository.ActivityRepository;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository repository;

    public Activity saveActivity(Activity activity) {

        double electricityEmission =
                activity.getElectricityUnits() * 0.82;

        double transportEmission = 0;

        if ("CAR".equalsIgnoreCase(activity.getVehicleType())) {
            transportEmission =
                    activity.getDistanceTravelled() * 0.12;
        } else if ("BUS".equalsIgnoreCase(activity.getVehicleType())) {
            transportEmission =
                    activity.getDistanceTravelled() * 0.04;
        }

        double foodEmission =
                "NONVEG".equalsIgnoreCase(activity.getFoodType())
                ? 50
                : 20;

        double totalEmission =
                electricityEmission +
                transportEmission +
                foodEmission;

        int score = (int) Math.max(0, 100 - (totalEmission / 10));

        activity.setCarbonEmission(totalEmission);
        activity.setCarbonScore(score);

        return repository.save(activity);
    }
}