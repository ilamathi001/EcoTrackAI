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

    double electricityEmission =
            activity.getElectricityUnits() * 0.82;

    double transportFactor;

    switch (activity.getVehicleType().toUpperCase()) {

        case "BUS":
            transportFactor = 0.04;
            break;

        case "BIKE":
            transportFactor = 0.02;
            break;

        case "TRAIN":
            transportFactor = 0.03;
            break;

        case "CAR":
        default:
            transportFactor = 0.12;
            break;
    }

    double transportEmission =
            activity.getDistanceTravelled()
                    * transportFactor;

    double foodEmission =
            "NONVEG".equalsIgnoreCase(
                    activity.getFoodType())
                    ? 50
                    : 20;

    double totalEmission =
            electricityEmission
                    + transportEmission
                    + foodEmission;

    int score =
            (int) Math.max(
                    0,
                    Math.min(
                            100,
                            100 - (totalEmission / 10)));

    activity.setCarbonEmission(
            Math.round(totalEmission * 100.0) / 100.0);

    activity.setCarbonScore(score);

    return repository.save(activity);
}

public List<Activity> getHistory() {
    return repository.findAll();
}


}
